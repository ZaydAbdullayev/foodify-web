import React from "react";
import "./components/assets/global.css";
import "./components/assets/root.css";
import "./components/assets/media.css";
import "animate.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./pages/layout/layout";
import { Home } from "./pages/home/home";
import { Catalog } from "./pages/catalog/catalog";
import { Login, Signin } from "./pages/login/login";
import { MyProfil } from "./pages/myProfil/profil";
import { MyFavorite } from "./pages/myFavorite/favorite.jsx";
import { Payment } from "./payment/payment";
import { MyOrders } from "./pages/myOrders/myOrders";
import { Foods } from "./pages/foods/foods";
import { MyFavFood } from "./pages/myFavoriteFood/myFavoriteFood";
import { NotAllowed, NotFound } from "./components/notFound/notFound";
import { LocationMap } from "./components/mapbox/mapbox";
import { ProfilFile } from "./pages/myProfil/profil";

export const Router = () => {
  const span = document.createElement("span");
  span.classList.add("stm-animate");
  document.body.appendChild(span);

  document.addEventListener("click", function (event) {
    const x = event.clientX;
    const y = event.clientY;
    span.style.top = `${y - 30}px`;
    span.style.left = `${x - 30}px`;
    span?.classList?.add("active");
  });

  span.addEventListener("animationend", function () {
    span?.classList?.remove("active");
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/catalog/:id" element={<Catalog />} />
          <Route path="/all/foods" element={<Foods />} />
          <Route path="/my/profile" element={<ProfilFile />}>
            <Route index element={<MyProfil />} />
            {/* <Route path="send/gift" element={<h1>Sovga yuborish</h1>} />
            <Route path="delivery" element={<h1>Yetkazib ebrish</h1>} />
            <Route path="my/family" element={<h1>Oilaviy</h1>} />
            <Route path="work" element={<h1>Ishxonalarim</h1>} />
            <Route path="help" element={<h1>Help</h1>} /> */}
          </Route>
          <Route path="/my/fav/res" element={<MyFavorite />} />
          <Route path="/my/fav/food" element={<MyFavFood />} />
          <Route path="/my/orders" element={<MyOrders />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<LocationMap />} />
          <Route path="/not/allowed" element={<NotAllowed />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
