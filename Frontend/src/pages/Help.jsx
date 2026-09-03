import {
  FaQuestionCircle,
  FaBug,
  FaLightbulb,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";
import GlassCard from "../components/GlassCard";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function Help() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">

      {/* Header */}
        <div className="max-w-5xl mx-auto px-6 text-center mt-20">

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

{t("help.title")}

</motion.h1>


          <p className="mt-4 text-xl">
            {t("help.subtitle")}
          </p>

        </div>


      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* FAQ */}

        <SectionTitle
          icon={<FaQuestionCircle />}
          title={t("help.faq")}
        />
        
        <FAQ
          question={t("help.how")}
          answer={t("help.howanswer")}
        />

        <FAQ
          question={t("help.edit")}
          answer={t("help.open")}
        />

        <FAQ
          question={t("help.delete")}
          answer={t("help.history")}
        />

        <FAQ
          question={t("help.secure")}
          answer={t("help.information")}
        />

        {/* Report Bug */}

        <SectionTitle
          icon={<FaBug />}
          title={t("help.bug")}
        />

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <p className="text-gray-700">
            {t("help.found")}
          </p>

        </div>

        {/* Suggestion */}

        <SectionTitle
          icon={<FaLightbulb />}
          title={t("help.suggest")}
        />

        <div className="bg-white rounded-xl shadow p-6 mb-8 dark:text-gray-700">

          <p>
            {t("help.idea")}
          </p>

        </div>

        {/* Contact */}

        <SectionTitle
          icon={<FaEnvelope />}
          title={t("help.contact")}
        />

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <p className="text-green-700 font-semibold">
            {t("help.support")}
          </p>

        </div>

        {/* Privacy */}

        <SectionTitle
          icon={<FaShieldAlt />}
          title={t("help.privacy")}
        />

        <div className="bg-white rounded-xl shadow p-6 dark:text-gray-700">

          <p>
            {t("help.description")}
          </p>

        </div>

      </div>

    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-10">

      <div className="text-green-600 text-2xl">
        {icon}
      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

    </div>
  );
}

function FAQ({ question, answer }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 mb-4">

      <h3 className="font-bold text-lg dark:text-gray-700">
        {question}
      </h3>

      <p className="text-gray-600 mt-2">
        {answer}
      </p>

    </div>
  );
}

export default Help;