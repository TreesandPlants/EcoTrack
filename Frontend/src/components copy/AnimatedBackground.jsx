import { motion } from "framer-motion";

function AnimatedBackground() {

  const leaves = Array.from({ length: 15 });

  return (

    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Animated Gradient */}

      <motion.div
        animate={{
          background: [
            "linear-gradient(135deg,#ecfdf5,#d1fae5)",
            "linear-gradient(135deg,#dcfce7,#bfdbfe)",
            "linear-gradient(135deg,#bbf7d0,#ecfeff)",
            "linear-gradient(135deg,#ecfdf5,#d1fae5)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
      />

      <motion.div

animate={{

x:[0,250,-100,0],

y:[0,-150,120,0]

}}

transition={{

duration:25,

repeat:Infinity,

ease:"linear"

}}

className="

absolute

w-96

h-96

bg-green-300/30

blur-[150px]

rounded-full

"

/>

      {/* Floating Leaves */}

      {leaves.map((_, i) => (

        <motion.div

          key={i}

          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 0,
            opacity: 0.2,
          }}

          animate={{
            y: -150,
            x:
              Math.random() * window.innerWidth,
            rotate: 360,
            opacity: [0.2, 0.5, 0.2],
          }}

          transition={{
            duration: 18 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}

          className="absolute text-3xl"

        >

          🍃

        </motion.div>

      ))}

    </div>

  );

}

export default AnimatedBackground;