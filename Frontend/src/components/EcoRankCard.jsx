import { useEffect, useState } from "react";
import { FaLeaf, FaStar } from "react-icons/fa";
import api from "../services/api";

function EcoRankCard() {

  const [ecoRank, setEcoRank] = useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    loadEcoRank();

  }, []);


  const loadEcoRank = async () => {

    try {

      const userId =
        localStorage.getItem("userId");

      if (!userId) {

        setLoading(false);

        return;

      }


      const response =
        await api.get(
          `/users/ecorank/${userId}`
        );


      setEcoRank(response.data);

    }

    catch (error) {

      console.error(
        "EcoRank Error:",
        error
      );

    }

    finally {

      setLoading(false);

    }

  };


  if (loading) {

    return (

      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <p className="text-gray-400">
          Loading EcoRank...
        </p>

      </div>

    );

  }


  if (!ecoRank) {

    return null;

  }


  const xp =
    Number(ecoRank.xp || 0);

  const level =
    Number(ecoRank.level || 1);


  const xpInLevel =
    xp % 100;

  const progress =
    xpInLevel;


  return (

    <div
  className="
    bg-white
    rounded-2xl
    shadow-lg
    border
    border-green-100
    p-4
    sm:p-6
    w-full
  "
>

      {/* Header */}

      <div className="
  flex
  items-start
  justify-between
  gap-4
">

        <div>

          <p className="text-sm text-gray-400 dark:text-gray-500">
            Your EcoRank
          </p>

          <h2
            className="
  text-xl
  sm:text-2xl
  font-bold
  text-green-700
"
          >

            {ecoRank.rank}

          </h2>

        </div>


        <div
          className="
            w-14
            h-14
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
            text-green-600
            text-xl
          "
        >

          <FaLeaf />

        </div>

      </div>


      {/* Level */}

      <div className="mt-6 flex items-center gap-3">

        <FaStar className="text-yellow-500" />

        <span className="font-semibold dark:text-gray-500">
          Level {level}
        </span>

        <span className="text-gray-400">
          •
        </span>

        <span className="text-gray-500">
          {xp} XP
        </span>

      </div>


      {/* XP Progress */}

      <div className="mt-4">

        <div
          className="
            flex
            justify-between
            text-sm
            mb-2
          "
        >

          <span className="text-gray-500">
            Progress
          </span>

          <span className="font-medium dark:text-gray-500">
            {progress}/100 XP
          </span>

        </div>


        <div
          className="
            h-3
            bg-gray-100
            rounded-full
            overflow-hidden
          "
        >

          <div
            className="
              h-full
              bg-green-500
              rounded-full
              transition-all
              duration-700
            "
            style={{
              width: `${progress}%`
            }}
          />

        </div>

      </div>


      {/* Motivation */}

      <p className="mt-5 text-sm text-gray-500">

        Complete more sustainability
        activities to increase your EcoRank.

      </p>

    </div>

  );

}

export default EcoRankCard;