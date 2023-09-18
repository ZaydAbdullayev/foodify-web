import { GoHomeFill } from "react-icons/go";
import { ImSpoonKnife } from "react-icons/im";
// import { MdOutlineFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { LuClipboardCheck } from "react-icons/lu";

// const { token } = JSON?.parse(localStorage?.getItem("customer")) || false;
export const menu = [
  {
    id: 2345,
    name: "Home",
    path: "/",
    icon: <GoHomeFill />,
  },
  {
    id: 6453,
    name: "Food",
    path: "/all/foods",
    icon: <ImSpoonKnife />,
  },
  {
    id: 2225,
    name: "Savat",
    path: "",
    icon: <TiShoppingCart />,
    ticket: true,
  },
  {
    id: 6535,
    name: "Buyurtmalar",
    path: "/my/orders",
    icon: <LuClipboardCheck />,
  },
  {
    id: 9876,
    name: "Profil",
    path: "/my/profile",
    icon: <FaUser />,
    check: true,
  },
];
