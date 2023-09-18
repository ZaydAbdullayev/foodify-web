import React, { useMemo } from "react";
import "./payment.css";
import "./pyment.media.css";
import { enqueueSnackbar as es } from "notistack";
import { CalculateTotalPrice } from "../services/calc.service";
import { NumericFormat } from "react-number-format";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  useGetCartProductQuery,
  useDeleteCartByIdMutation,
  useUpdateCartByIdMutation,
} from "../services/cart.service";
import { useGetFavDataQuery } from "../services/fav.service";
import { MdDelete } from "react-icons/md";
import { ImArrowLeft2 } from "react-icons/im";

const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");

export const Payment = () => {
  const user = useMemo(
    () => JSON?.parse(localStorage?.getItem("localUser")) || [],
    []
  );
  const user_id = user?.id;
  const id = useParams()?.id;
  const navigate = useNavigate();
  const { data: shop = null } = useGetFavDataQuery(id);
  const { data: cart = [] } = useGetCartProductQuery(user_id);
  const total = CalculateTotalPrice(cart?.cartItems);
  const [deleteCartById] = useDeleteCartByIdMutation();
  const [updateCartById] = useUpdateCartByIdMutation();
  const endpoint = `empty/cart/${user_id}`;

  const payment_data = {
    address: user.username?.split("_").join(" ") || "",
    description: "",
    padyezd: "",
    qavat: "",
    product_data: JSON.stringify(cart?.cartItems),
    payment: "token",
    price: total || 0,
    user_id: user_id || 0,
    restaurant_id: id,
    latitude: "",
    longitude: "",
  };

  const updateCart = async (item) => {
    const endpoint = `/remove/cartItem/${user_id}/${item?.id}`;

    const Udata = {
      item,
      user_id,
    };

    if (item?.quantity > 0) {
      const { error, data } = await updateCartById(Udata);
      if (error) return es("Qandaydir muammo yuz berdi", { variant: "error" });
      if (data)
        es("Mahsulot savatga muvoffaqiyatli qo'shildi!", {
          variant: "success",
        });
    } else {
      const { error, data } = await deleteCartById(endpoint);
      if (error) return es("Qandaydir muammo yuz berdi", { variant: "error" });
      if (data) es("Mahsulot savatdan o'chirildi!", { variant: "warning" });
      if (cart?.cartItems?.length === 1 && cart?.cartItems[0]?.quantity === 1) {
        navigate(`/catalog/${id}`);
        window.location.reload();
      }
    }
  };

  const clearCart = async () => {
    const confirm = window.confirm("Cart tozalansinmi");

    if (confirm) {
      const { error, data } = await deleteCartById(endpoint);
      if (error) return es("Qandaydir muammo yuz berdi", { variant: "error" });
      if (data) es("Mahsulot savatdan o'chirildi!", { variant: "warning" });
      window.location.reload();
      navigate("/all/foods");
    }
  };

  const resieveOrderS = async () => {
    socket.emit("/order", payment_data);
    const { error, data } = await deleteCartById(endpoint);
    if (error) return es("Qandaydir muammo yuz berdi", { variant: "error" });
    if (data) console.log("Mahsulot savatdan o'chirildi!");
    navigate("/my/orders");
    window.location.reload();
  };

  return (
    <div className="payment_box">
      <pre>
        <span onClick={() => navigate(-1)}>
          <ImArrowLeft2 />
        </span>
        <h1>{shop?.innerData?.username?.split("_")?.join(" ")}</h1>
      </pre>
      <div className="left_section">
        <p>
          Buyurtmangiz:{" "}
          <span onClick={clearCart}>
            <MdDelete />
          </span>
        </p>
        <div>
          {cart?.cartItems?.map((item) => {
            return (
              <div className="cart_body__item payment_body" key={item?.id}>
                <div className="payment_info_box">
                  <img src={item?.img} alt="product_photo" />
                  <label>
                    <p
                      style={{
                        lineHeight: "1.5",
                        textTransform: "capitalize",
                      }}
                    >
                      {item?.name}
                    </p>
                    <span>{item?.description}</span>
                  </label>
                </div>
                <div className="payment_count_box">
                  <button
                    onClick={() =>
                      updateCart({
                        quantity: item?.quantity - 1,
                        id: item?.id,
                      })
                    }
                  >
                    –
                  </button>
                  <span>{item?.quantity}</span>
                  <button
                    onClick={() =>
                      updateCart({
                        quantity: item?.quantity + 1,
                        id: item?.id,
                      })
                    }
                  >
                    +
                  </button>
                  <p>{item?.price} so'm</p>
                </div>
              </div>
            );
          })}
          <p className="total_price">
            Jami to'lov:{" "}
            <NumericFormat
              displayType="text"
              value={total || 0}
              suffix=" so'm"
              thousandSeparator=" "
            />
          </p>
        </div>
      </div>

      <button onClick={resieveOrderS} className="payment_btn">
        Buyurtma berish
      </button>
    </div>
  );
};
