import React, { useState, useEffect, useLayoutEffect } from "react";
import "./layout.css";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Cart } from "../cart/cart";
import { menu } from "./menu";
import { QuecklyFilter } from "../../components/navbar/navbar";
import { useGetCartCountQuery } from "../../services/cart.service";
import { Message } from "../../components/nothification/message";
import { ApiService } from "../../services/api.service";

import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import active from "./active_11.png";

export const Layout = () => {
  const location = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("localUser")) || null;
  const id = user?.id;
  const { data: count = null } = useGetCartCountQuery(id);
  const lp = useLocation()?.search?.split("=")?.pop()?.split("&");
  const navigate = useNavigate();
  const lc = useLocation()?.search;

  const clearStorage = () => {
    localStorage.removeItem("localUser");
  };

  useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      // Her bir zaman aralığında Local Storage'i temizle
      clearStorage();
    }, 1800000);

    if (user?.username) {
      const loginUser = async () => {
        const data = {
          id: lp[2],
          username: lp[0],
          password: lp[1],
        };

        await ApiService.fetching("register/token", { url: lc })
          .then((res) => {
            localStorage.setItem("localUser", JSON.stringify(data));
            navigate("/");
          })
          .catch((err) => console.log("xatolik"));
      };
      loginUser();
    } else {
      localStorage.setItem(
        "localUser",
        JSON.stringify({ username: "Hisob yo'q" })
      );
    }

    // Component unmount olduğunda interval'i temizle
    return () => {
      clearInterval(intervalId);
    };
  }, [lc, lp, navigate, user]);

  useEffect(() => setOpen(false), [location]);

  let startY = 0;
  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    if (startY - endY < 100 + "px") {
      setOpen(false);
    }
  };

  return (
    <div className="layout">
      {/* =========== show all section what place =============== */}
      <main>
        <Outlet />
      </main>
      {/* =========== navigation panel for user ============= */}
      <aside
        className={
          location === "/all/foods"
            ? "navigator food"
            : location.startsWith("/my/fav/")
            ? "navigator like"
            : location.startsWith("/my/profile")
            ? "navigator profil"
            : location === "/my/orders"
            ? "navigator profil"
            : location === `/payment/${location.split("/").pop()}`
            ? "navigator card"
            : "navigator"
        }
      >
        {menu?.map((menu, index) => {
          return (
            <Link
              to={menu?.ticket ? location : menu?.path}
              key={menu?.id}
              className="label"
            >
              <span
                style={{ position: "relative" }}
                onClick={menu?.ticket && (() => setOpen(!open))}
              >
                {menu?.icon}
                {menu?.ticket && (
                  <span style={count?.innerData ? {} : { display: "none" }}>
                    {count?.innerData}
                  </span>
                )}
              </span>
              <p>{menu?.name}</p>
              <img
                src={active}
                alt=""
                className={
                  location === menu?.path ||
                  (location === `/catalog/${location.split("/").pop()}` &&
                    index === 0) ||
                  (location.startsWith("/map") && index === 0) ||
                  (location.startsWith("/my/fav") && index === 3) ||
                  (location.startsWith("/my/profile") && index === 4) ||
                  (location === "/my/orders" && index === 4) ||
                  (location === `/payment/${location.split("/").pop()}` &&
                    index === 2)
                    ? "navigator_item active_menu"
                    : "navigator_item"
                }
              />
            </Link>
          );
        })}
      </aside>

      {/* ================ cart section ============== */}
      <div className={open ? "cart open_cart" : "cart"}>
        <b>
          {open ? (
            <BsChevronCompactDown
              onClick={() => setOpen(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          ) : (
            <BsChevronCompactUp />
          )}
        </b>
        <Cart setOpen={setOpen} />
      </div>

      {/* =============== filter product and restaurant section ============ */}
      <QuecklyFilter />

      {/* =============== message section ============ */}
      <Message />
    </div>
  );
};
