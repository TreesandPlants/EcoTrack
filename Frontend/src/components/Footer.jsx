import {
  FaLeaf,
  FaGithub,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-950 text-white mt-16">

  <div className="
    max-w-7xl
    mx-auto
    px-4
    sm:px-6
    lg:px-8
    py-12
  ">

    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-10
    ">

      {/* Brand */}
      <div>

        <div className="flex items-center gap-2">

          <span className="text-3xl">
            🌿
          </span>

          <h2 className="text-2xl font-bold">
            EcoTrack V1
          </h2>

        </div>

        <p className="
          mt-4
          text-gray-400
          leading-7
          max-w-md
        ">
          {t("footer.description")}
        </p>

      </div>


      {/* Quick Links */}
      <div>

        <h3 className="font-bold text-lg mb-4">
          {t("footer.links")}
        </h3>

        <div className="space-y-3">

          <Link
            to="/"
            className="block text-gray-400 hover:text-green-400 transition"
          >
            {t("navbar.home")}
          </Link>

          <Link
            to="/calculator"
            className="block text-gray-400 hover:text-green-400 transition"
          >
            {t("navbar.calculator")}
          </Link>

          <Link
            to="/dashboard"
            className="block text-gray-400 hover:text-green-400 transition"
          >
            {t("navbar.dashboard")}
          </Link>

          <Link
            to="/history"
            className="block text-gray-400 hover:text-green-400 transition"
          >
            {t("navbar.history")}
          </Link>

          <Link
            to="/about"
            className="block text-gray-400 hover:text-green-400 transition"
          >
            {t("navbar.about")}
          </Link>

        </div>

      </div>


      {/* EcoTrack */}
      <div>

        <h3 className="font-bold text-lg mb-4">
          {t("footer.why")}
        </h3>

        <div className="space-y-3 text-gray-400">

          <p>🌱 {t("footer.track")}</p>

          <p>📊 {t("footer.impact")}</p>

          <p>💡 {t("footer.insights")}</p>

          <p>🏆 {t("footer.habits")}</p>

        </div>

      </div>

    </div>

  </div>


  {/* Bottom bar */}
  <div className="
    border-t
    border-white/10
  ">

    <div className="
      max-w-7xl
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      py-5
      flex
      flex-col
      sm:flex-row
      items-center
      justify-between
      gap-4
      text-sm
      text-gray-400
    ">

      <p>
        © 2026 EcoTrack V1
      </p>

      <p>
        Made with ❤️ for a greener planet.
      </p>

      <div className="flex gap-4">

        <a
          href="https://github.com/TreesandPlants"
          className="hover:text-green-400 transition"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/parthiban-duraisamy-b73641341/"
          className="hover:text-green-400 transition"
        >
          LinkedIn
        </a>

      </div>

    </div>

  </div>

</footer>
  );
}

export default Footer;