import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import GlassCard from "../components/GlassCard";
import AnimatedButton from "../components/AnimatedButton";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function Calculator() {
  const { t } = useTranslation();
  const [transportType, setTransportType] = useState("car");
  const [distance, setDistance] = useState("");
  const [electricity, setElectricity] = useState("");
  const [food, setFood] = useState("");
  const [waste, setWaste] = useState("");

  const [result, setResult] = useState(null);

  const [showSuccess, setShowSuccess] =
useState(false);

const resetCalculator = () => {

setDistance("");

setElectricity("");

setFood("");

setWaste("");

setTransportType("car");

setResult(null);

};

useEffect(()=>{

  const storage =
localStorage.getItem("token")
? localStorage
: sessionStorage;

storage.setItem(

"calculatorDraft",

JSON.stringify({

transportType,
distance,
electricity,
food,
waste

})

);

},[
transportType,
distance,
electricity,
food,
waste
]);

useEffect(()=>{

  const storage =
localStorage.getItem("token")
? localStorage
: sessionStorage;

const draft =
storage.getItem("calculatorDraft");

if(draft){

const data =
JSON.parse(draft);

setTransportType(data.transportType);

setDistance(data.distance);

setElectricity(data.electricity);

setFood(data.food);

setWaste(data.waste);

}

},[]);

  const transportRate =
  transportType === "car"
    ? 0.21
    : transportType === "bus"
    ? 0.08
    : 0.05;

const estimatedCarbon = (
  Number(distance || 0) * transportRate +
  Number(electricity || 0) * 0.82 +
  Number(food || 0) * 2 +
  Number(waste || 0) * 0.57
).toFixed(2);

const treesNeeded = Math.ceil(estimatedCarbon / 22);

const carDistance = Math.round(estimatedCarbon / 0.21);

const electricityDays = Math.round(
  estimatedCarbon / 8
);

 const ecoFacts = [
  `🌳 ${t("calculator.mature")}`,
  `💡 ${t("calculator.bulbs")}`,
  `🚲 ${t("calculator.cycling")}`,
  `♻ ${t("calculator.recycling")}`,
  `🚿 ${t("calculator.showers")}`
];

const [randomFact, setRandomFact] = useState(
  ecoFacts[Math.floor(Math.random() * ecoFacts.length)]
);


  const calculateFootprint = () => {

    let transportEmission = 0;

    if (transportType === "car") {
      transportEmission = distance * 0.21;
    }

    if (transportType === "bus") {
      transportEmission = distance * 0.08;
    }

    if (transportType === "bike") {
      transportEmission = distance * 0.05;
    }

    const electricityEmission =
      electricity * 0.82;

    const wasteEmission =
      waste * 0.57;

    const foodEmission =
      food * 2

    const total =
      transportEmission +
      electricityEmission +
      foodEmission +
      wasteEmission;

    setResult({
      transportEmission,
      electricityEmission,
      foodEmission,
      wasteEmission,
      total,
    });

    setRandomFact(
  ecoFacts[Math.floor(Math.random() * ecoFacts.length)]
);
  };

  const saveCalculation = async () => {

    const storage =
localStorage.getItem("token")
? localStorage
: sessionStorage;

const userId = storage.getItem("userId");

  try {

    console.log({
  user_id: storage.getItem("userId"),
  transport_type: transportType,
  travel_distance: distance,
  electricity_usage: electricity,
  food_wasted: food,
  waste_generated: waste,
  total_carbon: result.total,
});

    await api.post(
      "/calculations",
      {
        user_id: storage.getItem("userId"),
        transport_type: transportType,
        travel_distance: distance,
        electricity_usage: electricity,
        food_wasted : food,
        waste_generated: waste,
        total_carbon: result.total,
      }
    );

   setShowSuccess(true);

   storage.removeItem(
"calculatorDraft"
);

setTimeout(() => {
setShowSuccess(false);
},3000);

  } catch (error) {

    console.log(error);

    alert("Failed to Save");

  }

};

  return (
    <div className="p-8">

      <div className="max-w-6xl mx-auto p-6">

{showSuccess && (

<div
className="
fixed
top-6
right-6
bg-green-600
text-white
px-6
py-4
rounded-xl
shadow-2xl
animate-bounce
z-50
"
>

✅ Calculation Saved Successfully!

</div>

)}
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

className="text-4xl font-bold text-center mb-8 text-green-700 mt-10"

>

🌍 {t("calculator.title")}

</motion.h1>
  <div className="grid lg:grid-cols-2 gap-8">

    {/* Left Side */}

    <div className="space-y-6">

      {/* Transportation */}
      <GlassCard>

        <h2 className="text-2xl font-bold text-green-700 mb-4">
          🚗 {t("calculator.transportation")}
        </h2>

        <select
  value={transportType}
  onChange={(e) => setTransportType(e.target.value)}
  className="w-full
    bg-white
    dark:bg-gray-700
    text-gray-900
    dark:text-white
    border
    border-gray-300
    dark:border-gray-600
    rounded-xl
    px-4
    py-3"
>
  <option value="car">Car</option>
  <option value="bus">Bus</option>
  <option value="bike">Bike</option>
</select>

<input
  type="number"
  placeholder={t("calculator.enterValue")}
  value={distance}
  onChange={(e) => setDistance(e.target.value)}
  className="w-full
    bg-white
    dark:bg-gray-700
    text-gray-900
    dark:text-white
    border
    border-gray-300
    dark:border-gray-600
    rounded-xl
    px-4
    py-3
    my-3"
/>

      </GlassCard>

      {/* Home */}
      <GlassCard>

        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          🏠 {t("calculator.home")}
        </h2>

        <input
  type="number"
  placeholder={t("calculator.enterValue")}
  value={electricity}
  onChange={(e) => setElectricity(e.target.value)}
  className="w-full
    bg-white
    dark:bg-gray-700
    text-gray-900
    dark:text-white
    border
    border-gray-300
    dark:border-gray-600
    rounded-xl
    px-4
    py-3"
/>

      </GlassCard>

      {/* Food */}
      <GlassCard>

        <h2 className="text-2xl font-bold text-orange-700 mb-4">
          🍽 {t("calculator.food")}
        </h2>

        <input
  type="number"
  placeholder={t("calculator.enterValue")}
  value={food}
  onChange={(e) => setFood(e.target.value)}
  className="w-full
    bg-white
    dark:bg-gray-700
    text-gray-900
    dark:text-white
    border
    border-gray-300
    dark:border-gray-600
    rounded-xl
    px-4
    py-3"
/>

      </GlassCard>

      {/* Waste */}
      <GlassCard>

        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          ♻ {t("calculator.waste")}
        </h2>

        <input
  type="number"
  placeholder={t("calculator.enterValue")}
  value={waste}
  onChange={(e) => setWaste(e.target.value)}
  className="w-full
    bg-white
    dark:bg-gray-700
    text-gray-900
    dark:text-white
    border
    border-gray-300
    dark:border-gray-600
    rounded-xl
    px-4
    py-3"
/>

      </GlassCard>
      <div className="flex gap-4">

<AnimatedButton
  onClick={calculateFootprint}
  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
>
  {t("calculator.calculate")}
</AnimatedButton>



<AnimatedButton
  onClick={saveCalculation}
  disabled={!result}
  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
>
  {t("calculator.result")}

</AnimatedButton>

<AnimatedButton

onClick={resetCalculator}

className="
flex-1
bg-gray-500
hover:bg-gray-600
text-white
py-3
rounded-xl
"

>

{t("calculator.reset")}

</AnimatedButton>

</div>

    </div>

    {/* Right Side */}
    <div>
    <div className="sticky top-6">

  <GlassCard>

    <h2 className="text-3xl font-bold text-center dark:text-gray-300">

      📊 {t("calculator.estimate")}

    </h2>

    <p className="text-center text-6xl mt-8">

      🌍

    </p>

    <h1 className="text-center text-5xl font-bold text-green-600 mt-4">

      {estimatedCarbon}

    </h1>

    <p className="text-center dark:text-gray-300">

      kg CO₂

    </p>

  </GlassCard>

<div className="mt-8">

<h3 className="font-bold mb-2">

{t("calculator.level")}

</h3>

<div className="w-full bg-gray-300 rounded-full h-5">

<div

style={{
width: `${Math.min((estimatedCarbon/150)*100,100)}%`
}}

className={`

h-5

rounded-full

transition-all

duration-500

${
estimatedCarbon<50
?"bg-green-500"
:estimatedCarbon<100
?"bg-yellow-500"
:"bg-red-500"
}

`}

/>

</div>

</div>

</div>
      {/* Live Estimate */}

    </div>
    <div className="mt-8 bg-green-50 dark:bg-gray-800 rounded-xl p-5">

<h2 className="font-bold text-xl mb-3">

💡 {t("calculator.recommendation")}

</h2>

{
estimatedCarbon<50 && (

<p>

{t("calculator.excellent")}

</p>

)

}

{
estimatedCarbon>=50 &&
estimatedCarbon<100 && (

<p>

{t("calculator.try")}

</p>

)

}

{
estimatedCarbon>=100 && (

<p>

{t("calculator.emission")}

</p>

)

}

</div>

<GlassCard>

<h2 className="text-2xl font-bold mb-5">
🌎 {t("calculator.environment")}
</h2>

<div className="grid md:grid-cols-3 gap-5">

<div className="bg-green-100 dark:bg-gray-800 rounded-xl p-5 text-center">

<div className="text-5xl">
🌳
</div>

<h3 className="font-bold mt-3">
{t("calculator.trees")}
</h3>

<p className="text-3xl font-bold text-green-700 mt-2">
{treesNeeded}
</p>

<p className="text-gray-600 dark:text-gray-200">
{t("calculator.year")}
</p>

</div>

<div className="bg-blue-100 dark:bg-gray-800 rounded-xl p-5 text-center">

<div className="text-5xl">
🚗
</div>

<h3 className="font-bold mt-3">
{t("calculator.car")}
</h3>

<p className="text-3xl font-bold text-blue-700 mt-2">
{carDistance}
</p>

<p className="text-gray-600 dark:text-gray-200">
{t("calculator.km")}
</p>

</div>

<div className="bg-yellow-100 dark:bg-gray-800 rounded-xl p-5 text-center">

<div className="text-5xl">
⚡
</div>

<h3 className="font-bold mt-3">
{t("calculator.electricity")}
</h3>

<p className="text-3xl font-bold text-yellow-700 mt-2">
{electricityDays}
</p>

<p className="text-gray-600  dark:text-gray-200">
{t("calculator.days")}
</p>

</div>

</div>

</GlassCard>

<div className="mt-8 bg-blue-50 dark:bg-gray-800 rounded-xl p-5">

<h2 className="font-bold text-xl">

🌍 {t("calculator.did")}

</h2>

<p className="mt-3">

{randomFact}

</p>

</div>

{result && (

<div
className="
mt-8
bg-white
rounded-2xl
shadow-xl
p-8
animate-pulse
"
>

<h2 className="text-3xl font-bold mb-6">

📊 {t("calculator.calculation")}

</h2>

<div className="grid md:grid-cols-2 gap-6">

<div>

<p>
🚗 {t("calculator.transportation")}
</p>

<h3 className="text-2xl font-bold">
{result.transportEmission.toFixed(2)} kg
</h3>

</div>

<div>

<p>
⚡ {t("calculator.electricity")}
</p>

<h3 className="text-2xl font-bold">
{result.electricityEmission.toFixed(2)} kg
</h3>

</div>

<div>

<p>
🍽 {t("calculator.food")}
</p>

<h3 className="text-2xl font-bold">
{result.foodEmission.toFixed(2)} kg
</h3>

</div>

<div>

<p>
♻ {t("calculator.waste")}
</p>

<h3 className="text-2xl font-bold">
{result.wasteEmission.toFixed(2)} kg
</h3>

</div>

</div>

<hr className="my-6"/>

<div className="text-center">

<p className="text-lg">
{t("history.total")}
</p>

<h1 className="text-5xl font-bold text-green-600">

{result.total.toFixed(2)} kg CO₂

</h1>

</div>

</div>

)}

  </div>

</div>
    </div>
  );
}

export default Calculator;