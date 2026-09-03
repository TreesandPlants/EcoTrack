import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="
      fixed
      inset-0
      z-9999
      flex
      items-center
      justify-center
      overflow-hidden
      bg-linear-to-br
      from-green-50
      via-white
      to-green-100
      "
    >
      {/* Animated Glow */}

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="
        absolute
        w-96
        h-96
        rounded-full
        bg-green-300
        blur-[120px]
        "
      />

      <div className="relative flex flex-col items-center">

        {/* Earth */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-8xl"
        >
          🌍
        </motion.div>

        {/* Leaves */}

        <motion.div
          animate={{
            y: [-15, 15, -15],
            rotate: [-15, 15, -15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute -left-12 top-8 text-3xl"
        >
          🍃
        </motion.div>

        <motion.div
          animate={{
            y: [15, -15, 15],
            rotate: [15, -15, 15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute -right-12.5 top-14 text-3xl"
        >
          🌱
        </motion.div>

        {/* Title */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          className="mt-10 text-5xl font-bold text-green-700"
        >
          EcoTrack
        </motion.h1>

        <motion.p
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-3 text-gray-600"
        >
          Tracking a Greener Tomorrow...
        </motion.p>

        {/* Progress */}

        <div className="w-72 h-2 bg-green-100 rounded-full mt-10 overflow-hidden">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: "100%",
            }}
            transition={{
              duration: 2.5,
            }}
            className="h-full bg-green-600 rounded-full"
          />

        </div>

      </div>
    </motion.div>
  );
}

export default LoadingScreen;