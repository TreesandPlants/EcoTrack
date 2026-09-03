import {
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import ProfileMenu from "./ProfileMenu";
import NotificationIcon from "./NotificationIcon";
import { useTranslation } from "react-i18next";

import { applyTheme } from "../utils/theme";
import i18n from "../i18n/i18n";

import { getStorage } from "../utils/authStorage";


function Navbar() {

  const navigate = useNavigate();

  const { t } = useTranslation();

  const storage = getStorage();

  const [scrolled, setScrolled] =
    useState(false);


  // =====================================================
  // USER DATA
  // =====================================================

  const token =
    storage.getItem("token");

  const fullName =
    storage.getItem("full_name") ||
    "User";

  const userInitial =
    fullName
      .charAt(0)
      .toUpperCase();

  const isLoggedIn =
    !!token;


  // =====================================================
  // SCROLL EFFECT
  // =====================================================

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 20
      );

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);


  // =====================================================
  // GREETING
  // =====================================================

  const hour =
    new Date().getHours();

  let greeting = "";

  if (hour < 12) {

    greeting =
      "Good Morning";

  }
  else if (hour < 18) {

    greeting =
      "Good Afternoon";

  }
  else {

    greeting =
      "Good Evening";

  }


  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = async () => {

  storage.removeItem("token");
  storage.removeItem("userId");
  storage.removeItem("full_name");
  storage.removeItem("email");
  storage.removeItem("picture");

  // Remove previous user's preferences
  localStorage.removeItem("theme");
  localStorage.removeItem("language");

  // Reset application UI
  applyTheme("light");
  await i18n.changeLanguage("en");

  toast.success("Logged out successfully");

  setTimeout(() => {

    window.location.href = "/login";

  }, 1000);

};

  // =====================================================
  // NAVLINK CLASS
  // =====================================================

  const navLinkClass = ({
    isActive
  }) => {

    return `
      relative
      px-2
      py-2
      font-medium
      transition-all
      duration-200

      ${
        isActive
          ? "text-green-600"
          : "text-gray-700 hover:text-green-600"
      }
    `;

  };


  // =====================================================
  // RETURN
  // =====================================================

  return (

    <nav
      className={`
        sticky
        top-0
        z-50
        w-full
        bg-white/95
        backdrop-blur-md
        border-b
        border-green-100

        ${
          scrolled
            ? "shadow-md"
            : "shadow-sm"
        }

        transition-all
        duration-300
      `}
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8

          h-16

          flex
          items-center
          justify-between
        "
      >

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          className="{navLinkClass}
            flex
            items-center
            gap-2
            shrink-0
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              x: -30
            }}

            animate={{
              opacity: 1,
              x: 0
            }}

            transition={{
              duration: 0.6
            }}

            className="
              flex
              items-center
              gap-2
            "
          >

            <span className="text-xl">
              🌍
            </span>

            <span
              className="
                font-bold
                text-green-700
                text-lg
                sm:text-xl
              "
            >
              EcoTrack V1
            </span>

          </motion.div>

        </Link>


        {/* =================================================
            DESKTOP NAVBAR
            >= 1280px
        ================================================= */}

        <div
          className="
            hidden
            min-[1024px]:flex
            items-center
            gap-5
          "
        >

          <NavLink
            to="/"
            className={navLinkClass}
          >
            {({ isActive }) => (

              <>
                {t("navbar.home")}

                {isActive && (

                  <motion.div
                    layoutId="navbarUnderline"
                    className="
                      absolute
                      left-0
                      right-0
                      -bottom-1
                      h-1
                      bg-green-600
                      rounded-full
                    "
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />

                )}

              </>

            )}

          </NavLink>


          <NavLink
            to="/calculator"
            className={navLinkClass}
          >
            {({ isActive }) => (

              <>
                {t("navbar.calculator")}

                {isActive && (

                  <motion.div
                    layoutId="navbarUnderline"
                    className="
                      absolute
                      left-0
                      right-0
                      -bottom-1
                      h-1
                      bg-green-600
                      rounded-full
                    "
                  />

                )}

              </>

            )}

          </NavLink>


          <NavLink
            to="/dashboard"
            className={navLinkClass}
          >
            {({ isActive }) => (

              <>
               {t("navbar.dashboard")}

                {isActive && (

                  <motion.div
                    layoutId="navbarUnderline"
                    className="
                      absolute
                      left-0
                      right-0
                      -bottom-1
                      h-1
                      bg-green-600
                      rounded-full
                    "
                  />

                )}

              </>

            )}

          </NavLink>


          <NavLink
            to="/history"
            className={navLinkClass}
          >
            {({ isActive }) => (

              <>
               {t("navbar.history")}

                {isActive && (

                  <motion.div
                    layoutId="navbarUnderline"
                    className="
                      absolute
                      left-0
                      right-0
                      -bottom-1
                      h-1
                      bg-green-600
                      rounded-full
                    "
                  />

                )}

              </>

            )}

          </NavLink>


          <NavLink
            to="/report"
            className={navLinkClass}
          >
            {({ isActive }) => (

              <>
                📄 {t("navbar.report")}

                {isActive && (

                  <motion.div
                    layoutId="navbarUnderline"
                    className="
                      absolute
                      left-0
                      right-0
                      -bottom-1
                      h-1
                      bg-green-600
                      rounded-full
                    "
                  />

                )}

              </>

            )}

          </NavLink>


          {/* Desktop Notification */}

          {isLoggedIn && (

            <NotificationIcon />

          )}


          {/* Desktop Profile */}

          {isLoggedIn ? (

            <ProfileMenu />

          ) : (

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <Link
                to="/login"
                className="
                  px-4
                  py-2
                  text-green-700
                  font-medium
                  hover:text-green-800
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  px-4
                  py-2
                  bg-green-600
                  text-white
                  rounded-lg
                  font-medium
                  hover:bg-green-700
                  transition
                "
              >
                Register
              </Link>

            </div>

          )}


          {/* Greeting */}

          {isLoggedIn && (

            <p
              className="
                font-medium
                text-gray-700
                whitespace-nowrap
              "
            >

              {greeting},{" "}

              <span className="text-green-700">
                {fullName}
              </span>

              {" "}👋

            </p>

          )}

        </div>


        {/* =================================================
            MOBILE + TABLET NAVBAR
            < 1280px
        ================================================= */}

        <div
          className="
            flex
            min-[1280px]:hidden
            items-center
            gap-3
          "
        >

          {isLoggedIn ? (

            <>

              {/* Notification */}

              <NotificationIcon />


              {/* Profile */}

              <ProfileMenu />

            </>

          ) : (

            <Link
              to="/login"
              className="
                px-5
                py-2
                bg-green-600
                text-white
                rounded-lg
                font-medium
                hover:bg-green-700
                transition
              "
            >
              Login
            </Link>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;