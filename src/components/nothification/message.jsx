import React, { useState } from "react";
import "./message.css";
import io from "socket.io-client";
// import { useSwipeable } from "react-swipeable";

const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");

export const Message = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const user = JSON?.parse(localStorage?.getItem("localUser")) || [];
  const id = user?.id;

  socket.on(`/get/message/${id}`, (data) => {
    console.log(data);
    setOpen(data.status);
    setMessage(data.variant);
    socket.off(`/get/message/${id}`);
  });

  setTimeout(() => {
    setOpen(false);
  }, 10000);

  return (
    <div
      className={open ? "message_body open" : "message_body"}
      style={message === 6 ? { background: "#ffa62b" } : {}}
      onClick={() => setOpen(false)}
    >
      <div className="message_content">
        {message === 1 ? (
          <p>Buyurtmangiz qabul qilindi !</p>
        ) : message === 6 ? (
          <p>
            Buyurtmangiz bekor qilindi. Noqulayliklar uchun uzur so'raymiz !
          </p>
        ) : message === 3 ? (
          <p>Xurmatli mijoy buyurtmangiz tayyor va sizga yetkazilmoqda !</p>
        ) : (
          <p>
            Buyurtma yetib keldi iltimos qabul qilib oling. Foodify jamoasi
            nomidan Yoqimli ishtaha !
          </p>
        )}
      </div>
    </div>
  );
};

// export const App = () => {
//   const [notifications, setNotifications] = useState([]);

//   const addNotification = (message) => {
//     const newNotification = {
//       id: Date.now(),
//       message: message,
//     };

//     setNotifications((prevNotifications) => [
//       ...prevNotifications,
//       newNotification,
//     ]);

//     setTimeout(() => {
//       removeNotification(newNotification.id);
//     }, 10000);
//   };

//   const removeNotification = (id) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.filter((n) => n.id !== id)
//     );
//   };

//   return (
//     <div className="app">
//       <button onClick={() => addNotification("Bir bildirim metni")}>
//         Bildirim Ekle
//       </button>
//       <div className="notification-container">
//         {notifications.map((notification) => (
//           <Notification
//             key={notification.id}
//             message={notification.message}
//             onRemove={() => removeNotification(notification.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export const Notification = ({ message, onRemove }) => {
//   const handlers = useSwipeable({
//     onSwiped: (eventData) => {
//       if (eventData.dir === "Right" || eventData.dir === "Left") {
//         onRemove();
//       }
//     },
//   });

//   return (
//     <div
//       className="notification"
//       {...handlers}
//       onClick={onRemove}
//     >
//       {message}
//     </div>
//   );
// };

// function notifyMe() {
//   if (!("Notification" in window)) {
//     // Check if the browser supports notifications
//     alert("This browser does not support desktop notification");
//   } else if (Notification.permission === "granted") {
//     // Check whether notification permissions have already been granted;
//     // if so, create a notification
//     const notification = new Notification("Hi there!");
//     // …
//   } else if (Notification.permission !== "denied") {
//     // We need to ask the user for permission
//     Notification.requestPermission().then((permission) => {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         const notification = new Notification("Hi there!");
//         // …
//       }
//     });
//   }

// At last, if the user has denied notifications, and you
// want to be respectful there is no need to bother them anymore.

// <button onclick="notifyMe()">Notify me!</button>;
