import {
  FaLeaf,
  FaChartBar,
  FaUser,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiExpress } from "react-icons/si";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function About() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 text-center mt-20">

          <motion.h1

initial={{
opacity:0,
y:-40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.7
}}

className="text-5xl font-bold mb-10"

>

{t("about.title")}

</motion.h1>

          <p className="mt-6 text-xl">
            {t("about.subtitle")}
          </p>

        </div>

      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* Mission */}
        <section className="mb-14">

          <h2 className="text-3xl font-bold mb-4">
            🌍 {t("about.mission")}
          </h2>

          <p className="text-gray-700 dark:text-gray-400 leading-8 text-lg">
            {t("about.description")}
          </p>

        </section>

        {/* Features */}
        <section className="mb-14">

          <h2 className="text-3xl font-bold mb-8">
            🚀 {t("about.features")}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
        

            <FeatureCard
              icon={<FaLeaf size={30} />}
              title={t("about.carbon")}
              text={t("about.carbondescription")}

            />

            <FeatureCard
              icon={<FaChartBar size={30} />}
              title={t("about.dashboard")}
              text={t("about.dashboarddescription")}
            />

            <FeatureCard
              icon={<FaUser size={30} />}
              title={t("about.profile")}
              text={t("about.profiledescription")}
            />

          </div>

        </section>

        {/* Technologies */}
        <section className="mb-14">

          <h2 className="text-3xl font-bold mb-8">
            🛠 {t("about.built")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">

            <TechCard icon={<FaReact />} name="React" />
            <TechCard icon={<SiTailwindcss />} name="Tailwind" />
            <TechCard icon={<FaNodeJs />} name="Node.js" />
            <TechCard icon={<SiExpress />} name="Express" />
            <TechCard icon={<SiMysql />} name="MySQL" />
            <TechCard icon={<FaChartBar />} name="Recharts" />

          </div>

        </section>

        {/* Future */}
        <section className="mb-14">

          <h2 className="text-3xl font-bold mb-4">
            🌱 {t("about.future")}
          </h2>

          <ul className="space-y-3 text-lg">

            <li>✅ {t("about.ai")}</li>
            <li>✅ {t("about.system")}</li>
            <li>✅ {t("about.report")}</li>
            <li>✅ {t("about.news")}</li>
            <li>✅ {t("about.challenge")}</li>

          </ul>

        </section>

        {/* Developer */}
        <section className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-4 dark:text-gray-800">
            👨‍💻 {t("about.developer")}
          </h2>

          <p className="text-lg text-gray-700 leading-8">
            {t("about.developerdescription")}
          </p>

        </section>

      </div>

    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">

      <div className="text-green-600 mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-2 dark:text-gray-800">
        {title}
      </h3>

      <p className="text-gray-600">
        {text}
      </p>

    </div>
  );
}

function TechCard({ icon, name }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:scale-105 transition">

      <div className="text-4xl text-green-600 mb-3">
        {icon}
      </div>

      <p className="font-semibold dark:text-gray-800">
        {name}
      </p>

    </div>
  );
}

export default About;