import { motion } from "framer-motion";

function Card({
  children,
  className = "",
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: .25,
      }}
      className={`eco-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default Card;