import { useEffect, useState } from "react";
import api from "../services/api";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import EcoRankCard from "../components/EcoRankCard";
import { useTranslation } from "react-i18next";
import PageTransition from "../components/PageTransition";
import { getStorage } from "../utils/authStorage";
function Dashboard() {

const storage = getStorage();

const userId = storage.getItem("userId");

const { t } = useTranslation();

  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    highest: 0,
    lowest: 0,
  });

  const progress = Math.min((stats.total / 50) * 100, 100);

const ecoTips = [
  "🌱 Plant at least one tree every year.",
  "🚶 Walk or cycle for short distances.",
  "💡 Turn off lights when leaving a room.",
  "🚰 Save water by fixing leaking taps.",
  "♻️ Separate recyclable waste.",
  "🛍️ Carry reusable shopping bags.",
  "🥗 Eat more plant-based meals.",
  "🚿 Take shorter showers.",
  "🔌 Unplug chargers when not in use.",
  "🌍 Small actions create a greener future."
];
const [tipIndex, setTipIndex] = useState(0);
const [fade, setFade] = useState(true);

  const allBadges = [
  { title: "First Step", icon: "🌱", required: 1 },
  { title: "Eco Explorer", icon: "🍃", required: 10 },
  { title: "Climate Warrior", icon: "🌍", required: 25 },
  { title: "Green Hero", icon: "🏆", required: 50 },
];

const nextGoal = allBadges.find(
  (badge) => stats.total < badge.required
);

    const [chartData, setChartData] = useState([]); 
    
  useEffect(() => {

    loadStats();

  }, []);

  useEffect(() => {

  const interval = setInterval(() => {

    // Fade out
    setFade(false);

    setTimeout(() => {

      let random;

      do {
        random = Math.floor(Math.random() * ecoTips.length);
      } while (random === tipIndex);

      setTipIndex(random);

      // Fade in
      setFade(true);

    }, 500);

  }, 10000);

  return () => clearInterval(interval);

}, [tipIndex]);

  const pieData = [
{
name:"Carbon",
value:stats.average
},
{
name:"Remaining",
value:150-stats.average
}
];

   const getScore = () => {

  if (stats.average <= 50){
    return {
      score: "🌱 Excellent",
      message: "Your carbon footprint is relatively low."
    };
  }
  if (stats.average <= 100){
    return {
      score: "⚠ Moderate",
      message: "There is room for improvement."
    };
  }
  return {
    score: "🔴 High Emissions",
    message: "Consider adopting greener habits."
  };
};


  const loadStats = async () => {

    try {

const response = await api.get(
            `/calculations/user/${userId}`
        );

        console.log("User ID:", userId);

console.log("Calculations:", response.data);

      const data = response.data;

      setChartData(
  data.map((item, index) => ({
    name: `Calc ${index + 1}`,
    carbon: Number(item.total_carbon),
  }))
);

if (data.length === 0) {

    setStats({
        total: 0,
        average: 0,
        highest: 0,
        lowest: 0,
    });

    return;

}


      if (data.length > 0) {

        const totals =
          data.map(
            item => Number(item.total_carbon)
          );

        const sum =
          totals.reduce(
            (a, b) => a + b,
            0
          );

        setStats({
          total: data.length,
          average:
            (sum / data.length).toFixed(2),
          highest: Math.max(...totals),
          lowest: Math.min(...totals),
        });

      }

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <PageTransition>

    <div className="
  px-4
  sm:px-6
  lg:px-8
  py-6
  sm:py-8
">

      <>
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

className="
  text-3xl
  sm:text-4xl
  font-bold
  mt-10
  sm:mt-15
  mb-10
  sm:mb-15
"

>

{t("dashboard.title")}

</motion.h1>

<EcoRankCard/>

  {stats.total === 0 && (
    <div className="
  bg-yellow-100
  dark:bg-yellow-900/30
  text-gray-900
  dark:text-yellow-100
  p-4
  rounded
  mb-6
  my-5
">
  {t("dashboard.noCalculations")}
</div>
  )}
</>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-5">
        <motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.6
}}

whileHover={{
y:-8,
scale:1.02
}}


>
  <div className="bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition">

    <div className="text-4xl">🌿</div>

    <h3 className="mt-3 text-lg">
      {t("dashboard.totalCalculations")}
    </h3>

    <p className="text-4xl font-bold mt-2">
      {stats.total}
    </p>

  </div>
</motion.div>


<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.6
}}

whileHover={{
y:-8,
scale:1.02
}}


>
  <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition">

    <div className="text-4xl">📈</div>

    <h3 className="mt-3 text-lg">
      {t("dashboard.averageCO2")}
    </h3>

    <p className="text-4xl font-bold mt-2">
      {stats.average}
    </p>

  </div>

</motion.div>

<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.6
}}

whileHover={{
y:-8,
scale:1.02
}}


>
   <div className="bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition">

    <div className="text-4xl">🔥</div>

    <h3 className="mt-3 text-lg">
      {t("dashboard.highest")}
    </h3>

    <p className="text-4xl font-bold mt-2">
      {stats.highest}
    </p>

  </div>
</motion.div>

<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.6
}}

whileHover={{
y:-8,
scale:1.02
}}


>
  <div className="bg-linear-to-r from-yellow-400 to-yellow-500 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition">

    <div className="text-4xl">❄️</div>

    <h3 className="mt-3 text-lg">
      {t("dashboard.lowest")}
    </h3>

    <p className="text-4xl font-bold mt-2">
      {stats.lowest}
    </p>

  </div>
</motion.div>

</div>
      <div className="
  mt-10
  bg-white
  dark:bg-gray-800
  p-6
  rounded
  shadow
">

  <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">
    {t("dashboard.carbonTrend")}
  </h2>
  <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={pieData}
      dataKey="value"
      outerRadius={90}
    >
      <Cell fill="#16a34a" />
      <Cell fill="#e5e7eb" />
    </Pie>
    <Legend />
  </PieChart>
</ResponsiveContainer>

    <ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="carbon"
      stroke="#16a34a"
      strokeWidth={3}
    />
  </LineChart>
</ResponsiveContainer>
<div className="mt-8">

  <div className="
  flex
  flex-col
  sm:flex-row
  sm:items-center
  sm:justify-between
  gap-2
  mb-2
">

    <h3 className="font-bold dark:text-gray-300 text-gray-800">
      🌱 {t("dashboard.ecoProgress")}
    </h3>

    <span className="dark:text-gray-300">
      {progress.toFixed(0)}%
    </span>

  </div>

  <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">

    <div
      className="bg-green-600 h-5 transition-all duration-700"
      style={{
        width: `${progress}%`,
      }}
    />

  </div>

  <p className="mt-3 dark:text-gray-300">

    {stats.total} / 50 {t("dashboard.calculationsCompleted")}

  </p>

</div>

<p className="mt-2 text-sm dark:text-gray-300">
  {progress.toFixed(0)}% Complete
</p>
</div>

<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.6
}}

whileHover={{
y:-8,
scale:1.02
}}


>
  <div className="
bg-green-50
dark:bg-gray-800
rounded-xl
p-6
shadow-lg
hover:shadow-xl
transition-all
duration-300
my-5
">

  <h2 className="text-2xl font-bold mb-2">
    {t("dashboard.sustainabilityScore")}
  </h2>

  <p className="text-3xl">
    {getScore().score}
  </p>

 <p className="mt-2 text-gray-700 dark:text-gray-300">
  {getScore().message}
</p>

</div>
</motion.div>

<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.6
}}

whileHover={{
y:-8,
scale:1.02
}}


>
  <div className="bg-green-50 dark:bg-gray-800 rounded-xl mt-8 p-6 shadow-lg border border-green-200">

  <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">

    💡 {t("dashboard.dailyEcoTip")}

  </h2>

  <motion.div

key={tipIndex}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
y:-20
}}

transition={{
duration:0.5
}}

>
   <p
    className={`
      text-lg
      transition-all
      duration-500
      ${
        fade
          ? "opacity-100"
          : "opacity-0"
      }
    `}
  >

{ecoTips[tipIndex]}
</p>
<p className="mt-5 text-sm text-gray-500 dark:text-gray-400">

    {t("dashboard.ecoTipFooter")}


  </p>

</motion.div>

</div>
</motion.div>

<div className="mt-10">

<h2 className="text-2xl font-bold mb-6">
🏆 {t("dashboard.achievements")}
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-5">

  {allBadges.map((badge, index) => {

    const unlocked = stats.total >= badge.required;

    return (

      <div
        key={index}
        className={`
          rounded-xl
          p-6
          text-center
          shadow-md
          transition
          duration-300
          hover:scale-105
          whileHover={{
rotate:-5,
scale:1.1
}}

whileTap={{
scale:0.9
}}
          ${unlocked ? "bg-green-100" : "bg-gray-200 opacity-60"}
        `}
      >

        <div className="text-5xl">
          {unlocked ? badge.icon : "🔒"}
        </div>

        <h3 className="font-bold mt-3 dark:text-gray-800">
          {badge.title}
        </h3>

        <p className="mt-2 text-sm dark:text-gray-600">

  {unlocked
  ? `✅ ${t("dashboard.unlocked")}`
  : `🔒 ${badge.required} ${t("dashboard.calculations")}`
}
</p>
      </div>

    );

  })}

</div>

<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.6
}}

whileHover={{
y:-8,
scale:1.02
}}


>
  <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

  <h2 className="text-2xl font-bold mb-4">
    🎯 {t("dashboard.nextGoal")}
  </h2>

  {nextGoal ? (

    <>
      <p className="text-lg">
        {t("dashboard.unlock")} <strong>{nextGoal.title}</strong>
      </p>

      <p className="mt-2 dark:text-gray-300">
        {t("dashboard.need")}{" "}
        <strong>
          {nextGoal.required - stats.total}
        </strong>{" "}
        {t("dashboard.moreCalculations")}
      </p>
    </>

  ) : (

    <p className="text-green-600 font-bold">
      🎉 {t("dashboard.congratulations")}
      <br />
      You have unlocked every badge.
    </p>

  )}

</div>
</motion.div>

</div>

    </div>
    </PageTransition>
  );

}

export default Dashboard;