import { motion } from "framer-motion";

function AnimatedButton({

  children,

  className = "",

  ...props

}) {

  return (

    <motion.button

      whileHover={{
        scale: 1.05,
      }}

      whileTap={{
        scale: 0.95,
      }}

      transition={{
        type: "spring",
        stiffness: 400,
      }}

      className={`
        bg-green-600
        hover:bg-green-700
        text-white
        px-5
        py-3
        rounded-xl
        shadow-lg
        ${className}
      `}

      {...props}

    >

      {children}

    </motion.button>

  );

}

export default AnimatedButton;