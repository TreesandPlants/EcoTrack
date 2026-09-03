import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";
import { useState, useEffect } from "react";

function CinematicLoader() {

  const particles = Array.from({ length: 18 });

  const [pulse,setPulse]=useState(false);

useEffect(()=>{

setTimeout(()=>{

setPulse(true);

},2800);

},[]);

  return (

    <motion.div

      initial={{ opacity: 1 }}

      exit={{ opacity: 0 }}

      transition={{ duration: 1 }}

      className="
      fixed
      inset-0
      z-9999
      overflow-hidden
      flex
      justify-center
      items-center
      bg-linear-to-br
      from-green-100
      via-white
      to-emerald-100
      "

    >

      {/* Background Glow */}

      <motion.div

        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
        }}

        transition={{
          duration: 6,
          repeat: Infinity,
        }}

        className="
        absolute
        w-162.5
        h-162.5
        rounded-full
        bg-green-300
        blur-[180px]
        "

      />

      {/* Floating Particles */}

      {particles.map((particle,index)=>(

<motion.div

key={index}

className="
absolute
w-2
h-2
bg-green-400
rounded-full
z-50
"

style={{
left:`${Math.random()*100}%`,
top:`${Math.random()*100}%`
}}

animate={{
y:[0,-100],
opacity:[0,1,0],
scale:[0.5,1.5]
}}

transition={{
duration:3+Math.random()*3,
repeat:Infinity,
delay:Math.random()*4
}}

/>

))}
      {/* Floating Leaves */}

      <motion.div

className="
absolute
w-72
h-72
z-50
"

animate={{
rotate:360
}}

transition={{
repeat:Infinity,
duration:18,
ease:"linear"
}}

>

<div className="absolute top-0 left-1/2 -translate-x-1/2 text-3xl">

🍃

</div>

<div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl">

🌿

</div>

<div className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl">

🍀

</div>

<div className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl">

🌱

</div>

</motion.div>

      <div className="flex flex-col items-center">

  {/* Logo Animation Area */}

  <div
    className="
    relative
    w-72
    h-72
    flex
    items-center
    justify-center
    "
  >

    {/* ================= Pulse ================= */}

    <motion.div
      className="
      absolute
      inset-0
      rounded-full
      bg-green-300
      z-0
      "

      animate={
        pulse
          ? {
              scale: 4,
              opacity: 0,
            }
          : {
              scale: 0.9,
              opacity: 0.2,
            }
      }

      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    />



    {/* ================= Outer Ring ================= */}

    <motion.div
      className="
      absolute
      inset-0
      rounded-full
      border
      border-green-300
      z-10
      "

      animate={{
        scale: [0.8, 1.5],
        opacity: [0.5, 0],
      }}

      transition={{
        repeat: Infinity,
        duration: 3,
      }}
    />



    {/* ================= Inner Ring ================= */}

    <motion.div
      className="
      absolute
      inset-8
      rounded-full
      border-4
      border-green-500
      z-20
      "

      animate={{
        scale: [1, 1.12, 1],
        opacity: [0.8, 0.3, 0.8],
      }}

      transition={{
        repeat: Infinity,
        duration: 2,
      }}
    />



    {/* ================= Orbit Leaves ================= */}

    <motion.div
      className="
      absolute
      inset-0
      z-30
      "

      animate={{
        rotate: 360,
      }}

      transition={{
        repeat: Infinity,
        duration: 18,
        ease: "linear",
      }}
    >

      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-3xl">
        🍃
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl">
        🌿
      </div>

      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl">
        🍀
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl">
        🌱
      </div>

    </motion.div>



    {/* ================= Logo ================= */}

    <motion.div

      className="
      absolute
      z-40
      w-44
      h-44
      rounded-full
      overflow-hidden
      border-4
      border-green-500
      bg-white
      shadow-2xl
      flex
      justify-center
      items-center
      "

      animate={
        pulse
          ? {
              scale: 8,
              opacity: 0,
            }
          : {
              scale: [1, 1.03, 1],
            }
      }

      transition={{
        duration: 0.8,
      }}
    >

      <motion.img

        src="/logo.png"

        alt="EcoTrack"

        className="
        w-36
        h-36
        object-contain
        "

        animate={{
          rotate: 360,
        }}

        transition={{
          rotate: {
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          },
        }}

      />

    </motion.div>

  </div>

  {/* ================= Title ================= */}

  <motion.h1

    initial={{
      opacity: 0,
      y: 40,
    }}

    animate={{
      opacity: 1,
      y: 0,
    }}

    transition={{
      delay: 0.4,
      duration: 0.8,
    }}

    className="
    mt-10
    text-6xl
    font-extrabold
    bg-linear-to-r
    from-green-700
    via-green-500
    to-lime-500
    bg-clip-text
    text-transparent
    "
  >

    EcoTrack

  </motion.h1>

  <motion.p

    animate={{
      opacity: [0.4, 1, 0.4],
    }}

    transition={{
      repeat: Infinity,
      duration: 2,
    }}

    className="mt-3 text-gray-700 text-lg"

  >

    Track Today, Save Tomorrow

  </motion.p>



  {/* ================= Progress ================= */}

  <div className="w-80 h-3 bg-green-200 rounded-full mt-10 overflow-hidden">

    <motion.div

      initial={{ width: 0 }}

      animate={{ width: "100%" }}

      transition={{ duration: 3 }}

      className="
      h-full
      rounded-full
      bg-linear-to-r
      from-green-500
      via-lime-400
      to-green-600
      "

    />

  </div>

  <motion.p

    animate={{
      opacity: [0.4, 1, 0.4],
    }}

    transition={{
      repeat: Infinity,
      duration: 1.8,
    }}

    className="mt-5 text-gray-600"

  >

    Initializing a greener future...

  </motion.p>

</div>
</motion.div>

  );

}

export default CinematicLoader;