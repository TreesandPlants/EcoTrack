import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLeaf, FaHome } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >

        {/* Icon */}

        <motion.div
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          className="
            mx-auto
            w-24
            h-24
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
            text-green-600
            text-4xl
            mb-8
          "
        >
          <FaLeaf />
        </motion.div>


        {/* 404 */}

        <h1
          className="
            text-8xl
            font-extrabold
            text-green-600
          "
        >
          404
        </h1>


        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>


        <p className="text-gray-600 mt-4 text-lg">
          Looks like this page wandered off the
          sustainability path.
        </p>


        <p className="text-gray-500 mt-2">
          Don't worry, let's get you back to EcoTrack.
        </p>


        {/* Home Button */}

        <Link
          to="/dashboard"
          className="
            inline-flex
            items-center
            gap-3
            mt-8
            px-7
            py-3
            rounded-xl
            bg-green-600
            hover:bg-green-700
            text-white
            font-semibold
            transition
            shadow-lg
          "
        >

          <FaHome />

          Back to Dashboard

        </Link>

      </motion.div>

    </div>
  );
}

export default NotFound;