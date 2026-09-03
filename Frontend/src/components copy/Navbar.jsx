import { Link, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { useRef } from "react";
import { AnimatePresence} from "framer-motion";
import {
FaUser,
FaCog,
FaTrophy,
FaInfoCircle,
FaQuestionCircle,
FaSignOutAlt,
FaChevronRight,
FaHome,
FaCalculator,
FaHistory,
FaChartBar
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";


function Navbar() {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

useEffect(()=>{

const handleScroll=()=>{

setScrolled(window.scrollY>20);

};

window.addEventListener(
"scroll",
handleScroll
);

return ()=>window.removeEventListener(
"scroll",
handleScroll
);

},[]);

const picture = localStorage.getItem("picture");

const name = localStorage.getItem("full_name");

const container={

hidden:{opacity:0},

show:{

opacity:1,

transition:{

staggerChildren:0.15

}

}

};

const item={

hidden:{

opacity:0,

y:-20

},

show:{

opacity:1,

y:0

}

};

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
localStorage.removeItem("userId");
localStorage.removeItem("full_name");
localStorage.removeItem("email");
localStorage.removeItem("picture");

toast.success(

"Logged out successfully"

);

setTimeout(()=>{

localStorage.clear();

sessionStorage.clear();

window.location.href="/login";

},1200);

  };

  const hour=

new Date().getHours();

let greeting="";

if(hour<12)

greeting="Good Morning";

else if(hour<18)

greeting="Good Afternoon";

else

greeting="Good Evening";

  return (
    <nav
  className={`
    fixed
    top-0
    left-0
    right-0
    z-50
    backdrop-blur-xl
    transition-all
    duration-300
    ${
      scrolled
        ? "bg-white/85 shadow-xl border-b border-green-200"
        : "bg-white/50"
    }
  `}
>
      <div className="max-w-6xl mx-auto px-8 h-20 flex justify-between items-center">

        <Link
  to="/"
  className="text-2xl font-bold"
>
  <motion.div
initial={{ opacity: 0, x: -30 }}
animate={{ opacity: 1, x: 0 }}
transition={{
duration: 0.8
}}
className="flex items-center gap-2"
>

🌍

<h1 className="text-2xl font-bold text-green-700">

EcoTrack

</h1>

</motion.div>

</Link>

        <div className="flex gap-6">

          <motion.div
whileHover={{
y: -3,
scale: 1.05
}}
whileTap={{
scale:0.95
}}
>

<NavLink
to="/"
className={({ isActive })=>

`relative px-2 py-1
${
isActive
?
"text-green-600"
:
"text-gray-700"
}`

}
>

{({ isActive })=>(

<>

Home

{isActive && (

<motion.div

layoutId="underline"

className="absolute left-0 right-0 -bottom-1 h-1 bg-green-600 rounded-full"

transition={{
type:"spring",
stiffness:500,
damping:30
}}

/>

)}

</>

)}

</NavLink>

</motion.div>

          <motion.div
whileHover={{
y: -3,
scale: 1.05
}}
whileTap={{
scale:0.95
}}
>

<NavLink
to="/calculator"
className={({ isActive })=>

`relative px-2 py-1
${
isActive
?
"text-green-600"
:
"text-gray-700"
}`

}
>

{({ isActive })=>(

<>

Calculator

{isActive && (

<motion.div

layoutId="underline"

className="absolute left-0 right-0 -bottom-1 h-1 bg-green-600 rounded-full"

transition={{
type:"spring",
stiffness:500,
damping:30
}}

/>

)}

</>

)}

</NavLink>

</motion.div>
 <motion.div
whileHover={{
y: -3,
scale: 1.05
}}
whileTap={{
scale:0.95
}}
>

<NavLink
to="/dashboard"
className={({ isActive })=>

`relative px-2 py-1
${
isActive
?
"text-green-600"
:
"text-gray-700"
}`

}
>

{({ isActive })=>(

<>

Dashboard

{isActive && (

<motion.div

layoutId="underline"

className="absolute left-0 right-0 -bottom-1 h-1 bg-green-600 rounded-full"

transition={{
type:"spring",
stiffness:500,
damping:30
}}

/>

)}

</>

)}

</NavLink>

</motion.div>

             <motion.div
whileHover={{
y: -3,
scale: 1.05
}}
whileTap={{
scale:0.95
}}
>

<NavLink
to="/history"
className={({ isActive })=>

`relative px-2 py-1
${
isActive
?
"text-green-600"
:
"text-gray-700"
}`

}
>

{({ isActive })=>(

<>

History

{isActive && (

<motion.div

layoutId="underline"

className="absolute left-0 right-0 -bottom-1 h-1 bg-green-600 rounded-full"

transition={{
type:"spring",
stiffness:500,
damping:30
}}

/>

)}

</>

)}

</NavLink>

</motion.div>

<motion.div
whileHover={{
y: -3,
scale: 1.05
}}
whileTap={{
scale:0.95
}}
>

<NavLink
to="/report"
className={({ isActive })=>

`relative px-2 py-1
${
isActive
?
"text-green-600"
:
"text-gray-700"
}`

}
>

{({ isActive })=>(

<>

📄 Report

{isActive && (

<motion.div

layoutId="underline"

className="absolute left-0 right-0 -bottom-1 h-1 bg-green-600 rounded-full"

transition={{
type:"spring",
stiffness:500,
damping:30
}}

/>

)}

</>

)}

</NavLink>

</motion.div>

          <ProfileMenu />
        </div>
        <p className="font-normal">

{greeting},

{localStorage.getItem("full_name")}

👋

</p>
      </div>
    </nav>
  );
}

export default Navbar;