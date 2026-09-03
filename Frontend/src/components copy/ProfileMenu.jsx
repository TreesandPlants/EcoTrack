import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaUser,
  FaCog,
  FaTrophy,
  FaInfoCircle,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";

import { getStorage } from "../utils/authStorage";

function ProfileMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const [remember,setRemember]=useState(false);

  const timeoutRef = useRef(null);

  const [user, setUser] = useState({
    token: null,
    id: "",
    name: "",
    email: "",
    picture: "",
  });

  useEffect(() => {

    const storage = remember

? localStorage

: sessionStorage;


    setUser({
      token: storage.getItem("token"),
      id: storage.getItem("userId"),
      name: storage.getItem("full_name"),
      email: storage.getItem("email"),
      picture: storage.getItem("picture"),
    });
  }, [location.pathname]);

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 250);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();

    setOpen(false);

    navigate("/login");
  };

  const MenuItem = ({
    icon,
    title,
    to,
    danger = false,
    onClick,
  }) => (
    <div
      onClick={() => {
        setOpen(false);

        if (onClick) {
          onClick();
        } else {
          navigate(to);
        }
      }}
      className={`

flex
items-center
justify-between

px-5
py-3

cursor-pointer

transition-all
duration-200

hover:bg-green-50
hover:pl-7

${danger ? "text-red-600" : ""}

`}
    >
      <div className="flex items-center gap-4">
        <div className="text-lg">{icon}</div>

        <span>{title}</span>
      </div>

      <FaChevronRight className="text-gray-400 text-sm" />
    </div>
  );

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Avatar */}

      {user.picture ? (
        <img
          src={user.picture}
          alt="Profile"
          className="

w-12
h-12

rounded-full

border-2
border-green-600

cursor-pointer

object-cover

transition-all
duration-300

hover:scale-110
hover:ring-4
hover:ring-green-200
hover:shadow-xl

"
        />
      ) : (
        <div
          className="

w-12
h-12

rounded-full

bg-green-600

text-white

flex
items-center
justify-center

font-bold

cursor-pointer

transition-all
duration-300

hover:scale-110
hover:ring-4
hover:ring-green-200

"
        >
          {user.name?.charAt(0)}
        </div>
      )}

      {/* Dropdown */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -15,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="

absolute
right-0
mt-3

w-80

bg-white

rounded-2xl

shadow-2xl

border

overflow-hidden

z-50

"
          >
            {/* Header */}

            <div className="px-6 py-5">

              <div className="flex gap-4 items-center">

                {user.picture ? (
                  <img
                    src={user.picture}
                    className="

w-16
h-16

rounded-full

border-2
border-green-600

object-cover

"
                  />
                ) : (
                  <div
                    className="

w-16
h-16

rounded-full

bg-green-600

text-white

flex
items-center
justify-center

text-2xl
font-bold

"
                  >
                    {user.name?.charAt(0)}
                  </div>
                )}

                <div>

                  <h2 className="font-bold text-lg">

                    {user.name}

                  </h2>

                  <p className="text-gray-500 text-sm">

                    {user.email}

                  </p>

                  <span className="text-green-600 text-xs">

                    ✓ Logged In

                  </span>

                </div>

              </div>

            </div>

            <hr />

            <MenuItem
              icon={<FaUser />}
              title="My Profile"
              to="/profile"
            />

            <MenuItem
              icon={<FaTrophy />}
              title="Achievements"
              to="/achievements"
            />

            <hr />

            <MenuItem
              icon={<FaCog />}
              title="Settings"
              to="/settings"
            />

            <hr />

            <MenuItem
              icon={<FaInfoCircle />}
              title="About"
              to="/about"
            />

            <MenuItem
              icon={<FaQuestionCircle />}
              title="Help"
              to="/help"
            />

            <hr />

            <MenuItem
              icon={<FaSignOutAlt />}
              title="Logout"
              danger
              onClick={logout}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileMenu;