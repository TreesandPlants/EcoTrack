import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationIcon() {

  const [open, setOpen] = useState(false);

  const notifications = [

    {
      title: "Welcome to EcoTrack 🌱",
      time: "Just now",
    },

    {
      title: "Complete today's eco challenge!",
      time: "Today",
    }

  ];

  return (

    <div className="relative">

      <button

        onClick={() => setOpen(!open)}

        className="
        relative
        text-xl
        text-gray-700
        hover:text-green-600
        dark:text-gray-800
        transition
        "

      >

        <FaBell />

        <span
          className="
          absolute
          -top-1
          -right-1
          w-3
          h-3
          bg-red-500
          rounded-full
          "
        />

      </button>

      <AnimatePresence>

      {open && (

        <motion.div

          initial={{
            opacity:0,
            y:-10
          }}

          animate={{
            opacity:1,
            y:0
          }}

          exit={{
            opacity:0,
            y:-10
          }}

          className="
          absolute
          right-0
          mt-4
          w-80
          bg-white
          dark:text-gray-800
          rounded-2xl
          shadow-2xl
          border
          overflow-hidden
          z-50
          "

        >

          <div className="p-4 border-b">

            <h2 className="font-bold">

              Notifications

            </h2>

          </div>

          {notifications.map((item,index)=>(

            <div

              key={index}

              className="
              px-4
              py-3
              hover:bg-gray-50
              dark:hover:bg-green-100
              border-b
              "

            >

              <p className="font-medium">

                {item.title}

              </p>

              <p className="text-xs text-gray-500">

                {item.time}

              </p>

            </div>

          ))}

        </motion.div>

      )}

      </AnimatePresence>

    </div>

  );

}