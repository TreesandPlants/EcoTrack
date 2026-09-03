import { useEffect, useState } from "react";
import { FaLock, FaTrophy } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getAchievements } from "../services/achievementService";
import GlassCard from "../components/GlassCard";

function Achievements() {

  const [achievements, setAchievements] = useState([]);

  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadAchievements();

  }, []);

  const loadAchievements = async () => {

    try {

      setLoading(true);

      const data = await getAchievements();

      setAchievements(data);

    } catch (error) {

      console.error(
        "Achievement loading error:",
        error
      );

      toast.error(
        "Unable to load achievements"
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="
            w-12
            h-12
            border-4
            border-green-200
            border-t-green-600
            rounded-full
            animate-spin
            mx-auto
            mb-4
          " />

          <p className="text-gray-500">
            Loading achievements...
          </p>

        </div>

      </div>
    );

  }

  return (

    <main className="
      min-h-screen
      px-4
      sm:px-6
      lg:px-10
      py-28
    ">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <motion.p

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

className=" uppercase
            tracking-[4px]
            text-sm
            text-green-600
            font-semibold
            mb-2
          ">
            {t("achievements.game")}
          </motion.p>

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

className="text-4xl
            sm:text-5xl
            font-bold
            text-gray-900
            dark:text-gray-100
          ">
            {t("achievements.title")}
          </motion.h1>


          <p className="
            mt-4
            text-gray-500
            dark:text-gray-400
            max-w-2xl
            text-lg
          ">
            {t("achievements.subtitle")}
          </p>

        </div>


        {/* ACHIEVEMENT GRID */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">

          {achievements.map((achievement) => {

            const unlocked =
              achievement.unlocked_at !== null;

            return (

              <GlassCard>

              <div
                key={achievement.id}
                className={`
                  relative
                  rounded-3xl
                  p-6
                  border
                  transition-all
                  duration-300
                  ${
                    unlocked
                      ? `
                        bg-white
                        border-green-200
                        shadow-lg
                        hover:-translate-y-1
                        hover:shadow-xl
                      `
                      : `
                        bg-gray-50
                        border-gray-200
                        opacity-75
                      `
                  }
                `}
              >

                {/* ICON */}

                <div className={`
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-2xl
                  mb-5
                  ${
                    unlocked
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-400"
                  }
                `}>

                  {unlocked
                    ? <FaTrophy />
                    : <FaLock />
                  }

                </div>


                {/* TITLE */}

                <h2 className="
                  text-xl
                  font-bold
                  text-gray-900
                  mb-2
                ">
                  {t(
              `achievements.${achievement.id}.name`,
              {
                defaultValue: achievement.name
              }
            )}
                </h2>


                {/* DESCRIPTION */}

                <p className="
                  text-gray-500
                  leading-relaxed
                  mb-5
                ">
                  {t(
              `achievements.${achievement.id}.description`,
              {
                defaultValue: achievement.description
              }
            )}
                </p>


                {/* XP */}

                <div className="
                  flex
                  items-center
                  justify-between
                  text-sm
                ">

                  <span className="
                    font-semibold
                    text-green-600
                  ">
                    +{achievement.xp_reward} {t("achievements.xp")}
                  </span>

                  <span className="
                    text-gray-400
                  ">
                    {unlocked
                      ? t("achievements.unlocked")
                      : t("achievements.locked")
                    }
                  </span>

                </div>


                {/* UNLOCK DATE */}

                {unlocked && (

                  <p className="
                    text-xs
                    text-gray-400
                    mt-3
                  ">
                    {t("achievements.unlockedOn")}{" "}
                    {new Date(
                      achievement.unlocked_at
                    ).toLocaleDateString()}
                  </p>

                )}

              </div>
              </GlassCard>

            );

          })}

        </div>

      </div>

    </main>

  );

}

export default Achievements;