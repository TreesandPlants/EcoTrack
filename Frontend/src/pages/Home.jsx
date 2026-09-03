import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import GlassCard from "../components/GlassCard";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Home() {

  const navigate = useNavigate();

  const { t } = useTranslation();

const handleLogout = () => {
  localStorage.removeItem("token");
localStorage.removeItem("userId");
localStorage.removeItem("full_name");
localStorage.removeItem("email");
localStorage.removeItem("picture");


toast.success(

"Logged out successfully"

);

setTimeout(()=>{

localStorage.clear();

sessionStorage.clear();

navigate("/login");

},1200);
  navigate("/");
};
const features = [
  {
    icon:"🌍",
    title:t("home.carbon"),
    desc:t("home.carbondescription")
  },
  {
    icon:"📈",
    title:t("home.dashboard"),
    desc:t("home.progress")
  },
  {
    icon:"🏆",
    title:t("home.achievements"),
    desc:t("home.badges")
  },
  {
    icon:"📚",
    title:t("home.history"),
    desc:t("home.calculation")
  }
];

  return (

    <PageTransition>
    <>

      <div className="py-24">

  <div className="max-w-6xl mx-auto px-8">

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

{t("home.title")}

</motion.h1>

    <p className="mt-6 text-xl max-w-2xl">
      {t("home.subtitle")}
    </p>

    <Link
      to="/calculator"
      className="inline-block mt-8 bg-white text-green-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
    >
      {t("home.button")} →
    </Link>

  </div>

</div>

      {/* Features Section */}
    <div className="grid md:grid-cols-4 gap-6 mt-16">
    {features.map((item=>(

<GlassCard>

<div key={item.id} className="text-5xl">
{item.icon}
</div>

<h2 className="font-bold text-2xl mt-4">
{item.title}
</h2>

<p className="mt-3 text-gray-400">
{item.desc}
</p>

</GlassCard>

)))}
</div>

<div className="grid grid-cols-3 gap-6 mt-16 text-center">

<div>

<h1 className="text-5xl font-bold text-green-600">
100%
</h1>

<p>{t("home.awareness")}</p>

</div>

<div>

<h1 className="text-5xl font-bold text-green-600">
24/7
</h1>

<p>{t("home.track")}</p>

</div>

<div>

<h1 className="text-5xl font-bold text-green-600">
∞
</h1>

<p>{t("home.future")}</p>

</div>

</div>

{/* How It Works */}

<GlassCard>
  <h2 className="text-4xl font-bold text-center mb-12 mt-5">
    {t("home.how")}
  </h2>

  <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">

    <div>
      <div className="text-5xl mb-4">1️⃣</div>

      <h3 className="font-bold text-xl mb-2">
        {t("home.data")}
      </h3>

      <p>
        {t("home.fill")}
      </p>
    </div>

    <div>
      <div className="text-5xl mb-4">2️⃣</div>

      <h3 className="font-bold text-xl mb-2">
        {t("home.calculate")}
      </h3>

      <p>
        {t("home.estimate")}
      </p>
    </div>

    <div>
      <div className="text-5xl mb-4">3️⃣</div>

      <h3 className="font-bold text-xl mb-2">
        {t("home.improve")}
      </h3>

      <p>
        {t("home.insights")}
      </p>
    </div>

  </div>
</GlassCard>

<GlassCard>
<div className="bg-green-700 text-white rounded-xl p-10 mt-16 text-center">

<h2 className="text-3xl font-bold">

"{t("home.quote")}"

</h2>

<p className="mt-4 text-green-100">
{t("home.protect")}
</p>

</div>
</GlassCard>
<div className="text-center mt-20">

<h2 className="text-4xl font-bold">
{t("home.ready")}
</h2>

<Link
to="/calculator"
className="inline-block mt-6 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition"
>

{t("home.now")}

</Link>

</div>
    </>
    </PageTransition>
  );
}

export default Home;