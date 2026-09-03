import {
  FaLeaf,
  FaGithub,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      <div className="max-w-6xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">

        {/* Logo */}

        <div>

          <div className="flex items-center gap-2 mb-4">

            <FaLeaf className="text-green-500 text-2xl"/>

            <h2 className="text-2xl font-bold text-white">
              EcoTrack
            </h2>

          </div>

          <p className="leading-7">

            Track your carbon footprint,
            analyze your environmental impact,
            and build a greener future.

          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-white font-bold mb-4">

            Quick Links

          </h3>

          <div className="flex flex-col gap-3">

            <Link to="/">Home</Link>

            <Link to="/calculator">
              Calculator
            </Link>

            <Link to="/about">
              About
            </Link>

            <Link to="/help">
              Help
            </Link>

          </div>

        </div>

        {/* Technologies */}

        <div>

          <h3 className="text-white font-bold mb-4">

            Built With

          </h3>

          <div className="space-y-2">

            <p>⚛ React</p>

            <p>🎨 Tailwind CSS</p>

            <p>🟢 Node.js</p>

            <p>🚀 Express</p>

            <p>🐬 MySQL</p>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700">

        <div className="max-w-6xl mx-auto px-8 py-5 flex flex-col md:flex-row justify-between items-center">

          <p>

            © 2026 EcoTrack

            <span className="mx-2">•</span>

            Made with

            <FaHeart className="inline text-red-500 mx-2"/>

            for a greener planet.

          </p>

          <div className="flex gap-6 mt-4 md:mt-0">

            <a href="https://github.com/TreesandPlants">

              <FaGithub
                className="
                text-2xl
                hover:text-white
                transition"
              />

            </a>

            <a href="https://www.linkedin.com/in/parthiban-duraisamy-b73641341/">

              <FaLinkedin
                className="
                text-2xl
                hover:text-blue-400
                transition"
              />

            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;