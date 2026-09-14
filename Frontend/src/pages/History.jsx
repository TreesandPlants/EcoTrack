import { useEffect, useState } from "react";
import api from "../services/api";
import AnimatedNumber from "../components/AnimatedNumber";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";
import PageTransition from "../components/PageTransition";
import { getStorage } from "../utils/authStorage";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
function History() {

  const [search, setSearch] = useState("");

  const { t } = useTranslation();

  const storage = getStorage();

const userId = storage.getItem("userId");

  const [history, setHistory] = useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const totals = history.map(item =>
  Number(item.total_carbon)
);

const averageCarbon =
  totals.length > 0
    ? (
        totals.reduce((a, b) => a + b, 0) /
        totals.length
      ).toFixed(1)
    : 0;

const highestCarbon =
  totals.length > 0
    ? Math.max(...totals)
    : 0;

  const fetchHistory = async () => {

    try {

      const storage =
localStorage.getItem("token")
? localStorage
: sessionStorage;

const response =
await api.get(`/calculations/user/${userId}`);

      setHistory(response.data);

    } catch (error) {

      console.log(error);

    }

  };

 const deleteCalculation = async (id) => {

  const confirmDelete = window.confirm(
    "Delete this calculation?"
  );

  if (!confirmDelete) return;

  try {

    const response = await api.delete(
      `/calculations/${id}`
    );

    console.log(
      "Delete Response:",
      response.data
    );

    await fetchHistory();

    toast.success(
      "Calculation deleted successfully"
    );

  } catch (err) {

    console.error(
      "Delete Error:",
      err
    );

    toast.error(
      err.response?.data?.message ||
      "Failed to delete calculation"
    );

  }

};

const getCarbonLevel = (carbon) => {

  if (carbon < 50)
    return {
      text: "Low",
      color: "bg-green-100 text-green-700",
    };

  if (carbon < 100)
    return {
      text: "Medium",
      color: "bg-yellow-100 text-yellow-700",
    };

  return {
    text: "High",
    color: "bg-red-100 text-red-700",
  };

};

 const filteredCalculations = history.filter((item) => {

  return (
    item.transport_type
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    String(item.total_carbon)
      .includes(search)
  );

});

  return (
    <PageTransition>

    <div className="
  px-4
  sm:px-6
  lg:px-8
  py-6
  sm:py-8
">
      
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

className="text-5xl font-bold mb-10 mt-10"

>

{t("history.title")}

</motion.h1>

    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

  <input
    type="text"
    placeholder={t("history.placeholder")}
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg p-3 w-full md:w-96"
  />

</div>

<div className="grid grid-cols-3 gap-4 mb-8">

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
  <div className="bg-green-100 dark:bg-gray-800 rounded-lg p-4">

<h3>{t("history.total")}</h3>

<p className="text-2xl font-bold">

<AnimatedNumber value={history.length} />

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
  <div className="bg-blue-100 dark:bg-gray-800 rounded-lg p-4">

<h3>{t("history.average")}</h3>

<p className="text-2xl font-bold">

<AnimatedNumber
  value={Number(averageCarbon)}
  decimals={1}
/>

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
  <div className="bg-yellow-100 dark:bg-gray-800 rounded-lg p-4">

<h3>{t("history.highest")}</h3>

<p className="text-2xl font-bold">

<AnimatedNumber
  value={highestCarbon}
  decimals={1}
/>
</p>

</div>

</motion.div>

</div>

      {filteredCalculations.length === 0 ? (

  <div className="text-center py-16">

    <div className="text-6xl mb-4">
      📭
    </div>

    <h2 className="text-2xl font-bold dark:text-green-400">
      {t("history.noHistory")}
    </h2>

    <p className="text-gray-500 mt-3 dark:text-gray-200">
      {t("history.start")}
    </p>

  </div>

) : (

    <table className="w-full border-collapse">

<thead>

<tr className="bg-green-600 text-white">

<th className="p-3 flex">
{t("history.date")}
</th>

<th className="p-3">
{t("history.carbon")}
</th>

<th className="p-3">
{t("history.action")}
</th>

</tr>

</thead>

<tbody>

{filteredCalculations.map((item)=>(

<tr
key={item.id}
className="
border-b
hover:bg-green-50
dark:hover:bg-gray-600
hover:shadow-md
hover:scale-[1.01]
transition-all
duration-300
"
>

<td className="p-3">
{new Date(item.created_at).toLocaleDateString(
"en-IN",
{
day:"numeric",
month:"short",
year:"numeric",
hour:"2-digit",
minute:"2-digit"
}
)}
</td>

<td className="p-3">
<div>🌍 {item.total_carbon} kg</div>


<div
className={`
inline-block
mt-2
px-3
py-1
rounded-full
text-sm
font-semibold
${getCarbonLevel(item.total_carbon).color}
`}
>

{getCarbonLevel(item.total_carbon).text}

</div>

</td>

<td className="p-3">

<motion.button

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

transition={{
type:"spring",
stiffness:400
}}

>
  <AnimatedButton
  onClick={() => deleteCalculation(item.id)}
className="
bg-red-500
hover:bg-red-600
text-white
px-4
py-2
rounded-lg
transition
"
>
🗑 {t("history.delete")}
</AnimatedButton>
</motion.button>
</td>

</tr>

))}

</tbody>

</table>
  )
}

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
  <div className="mt-10 bg-green-50 dark:bg-gray-800 p-6 rounded-xl">

<h2 className="text-xl font-bold mb-3">

🌱 {t("history.go")}

</h2>

<p>

{t("history.description")}

</p>

</div>

</motion.div>
      <div className="mt-8">

<div className="flex justify-between mb-2">

<span>
{t("history.progress")}
</span>

<span>

{history.length}/50 {t("history.record")}

</span>

</div>

<div className="w-full bg-gray-300 rounded-full h-4">

<div

style={{
width:`${Math.min(history.length*2,100)}%`
}}

className="
bg-green-600
h-4
rounded-full
transition-all
duration-700
"

/>

</div>

</div>

    </div>

    </PageTransition>

  );

}

export default History;