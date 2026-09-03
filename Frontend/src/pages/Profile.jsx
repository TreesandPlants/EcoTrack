import { useEffect, useState } from "react";
import api from "../services/api";
import { getStorage } from "../utils/authStorage";
import { FaCamera, FaEnvelope, FaGlobe, FaLeaf, FaCloud, FaTrophy, FaFire } from "react-icons/fa";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";
import toast from "react-hot-toast";
import GlassCard from "../components/GlassCard";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useTranslation } from "react-i18next";
import SectionTitle from "../components/ui/SectionTitle";

const API_ORIGIN = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");

function Profile() {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    country: "",
    profile_image: "",
    created_at: ""
  });

  const { t } = useTranslation();

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);


  const [editing, setEditing] = useState(false);

const [formData, setFormData] = useState({
  full_name: "",
  country: "",
});

const [stats, setStats] = useState({
  total: 0,
  average: 0,
  highest: 0,
  lowest: 0,
  rank: "Beginner",
});

const loadProfile = async () => {

    try{

        const storage =
        localStorage.getItem("token")
        ? localStorage
        : sessionStorage;

        const userId = storage.getItem("userId");

        // Load profile
        const userResponse =
        await api.get(`/users/${userId}`);

        setProfile(userResponse.data);

        setFormData({

            full_name:
            userResponse.data.full_name || "",

            country:
            userResponse.data.country || ""

        });

        // Load calculations

        const calculationResponse =
        await api.get(`/calculations/user/${userId}`);

        const calculations =
        calculationResponse.data;

        const total = calculations.length;

        const average =
        total > 0
        ?
        (
        calculations.reduce(

        (sum,item)=>

        sum+Number(item.total_carbon),

        0

        )/total

        ).toFixed(2)

        :

        0;

        const highest=
        total>0
        ?
        Math.max(

        ...calculations.map(

        c=>Number(c.total_carbon)

        )

        )
        :
        0;

        const lowest=
        total>0
        ?
        Math.min(

        ...calculations.map(

        c=>Number(c.total_carbon)

        )

        )
        :
        0;

        let rank="";

        if(average<=20)

        rank="Eco Master";

        else if(average<=40)

        rank="Eco Hero";

        else if(average<=60)

        rank="Green Explorer";

        else if(average<=80)

        rank="Beginner";

        else

        rank="Needs Improvement";

        setStats({

            total,

            average,

            highest,

            lowest,

            rank

        });

    }

    catch(error){

        console.log(error);

    }

}
  
  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]: e.target.value
    });

  setFormData({

    ...formData,

    [e.target.name]: e.target.value,

  });

};

const saveProfile = async () => {

  try {

    const storage = getStorage();
const userId =
storage.getItem("userId");

    await api.put(

      `/users/${userId}`,

      formData

    );

    toast.success("Profile Updated Successfully");

    setEditing(false);

    loadProfile();

  } catch (error) {

    console.log(error);

    toast.error("Failed to update profile");

  }

};

const uploadProfileImage = async () => {

  console.log(selectedFile);

  if (!selectedFile) {

    alert("Please select an image.");

    return;

  }

  const formData = new FormData();

  formData.append("profile", selectedFile);

const storage = getStorage();

const userId =
storage.getItem("userId");

  try {

    const response = await api.post(

      `/users/upload/${userId}`,

      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

    );

    alert(response.data.message);

    loadProfile();

  } catch (error) {

    console.log(error);

    alert("Upload failed.");

  }

};

  if (!profile) {
    return (
      <div className="p-8 text-center text-xl">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">

      <Card>

        <div

className="

h-64

rounded-3xl

relative

overflow-hidden

shadow-xl

"

>

<img

src="https://static.vecteezy.com/system/resources/thumbnails/006/907/817/small/panorama-banner-background-of-tropical-forest-landscape-scene-for-using-in-concept-of-environmental-ecology-and-sustainable-energy-or-earth-day-wild-wood-scenic-using-for-wallpaper-of-spa-and-tourism-free-photo.jpg"

className="

absolute

w-full

h-full

object-cover

"

/>

<div

className="

absolute

inset-0

bg-green-900/30

"

/>

</div>

  <div className="relative px-8 pb-8">
        <div className="relative w-44 h-44 -mt-24 mx-auto">
          <motion.div
initial={{ opacity:0,y:30 }}
animate={{ opacity:1,y:0 }}
transition={{ duration:0.6 }}
>

  <img
    src={
      selectedFile
        ? URL.createObjectURL(selectedFile)
        : profile?.profile_image
        ? `${API_ORIGIN}${profile.profile_image}`
        : "https://ui-avatars.com/api/?name=User&background=16a34a&color=ffffff"+ profile.full_name
    }

    alt="Profile"

    className="
      w-44
      h-44
      rounded-full
      object-cover
      border-4
      border-green-600
      shadow-xl
      transition
      duration-300
      hover:scale-105
    "
  />

  <label
    htmlFor="profileImage"
    className="
      absolute
      bottom-2
      right-2
      bg-green-600
      text-white
      p-3
      rounded-full
      cursor-pointer
      hover:bg-green-700
    "
  >
    <FaCamera />
  </label>
  </motion.div>
</div>
        {editing ? (

  <div className="mt-8 w-full max-w-md">
    <motion.div
initial={{ opacity:0,y:30 }}
animate={{ opacity:1,y:0 }}
transition={{ duration:0.6 }}
>
    <label className="font-semibold">
      {t("profile.fullName")}
    </label>

    <input

      type="text"

      name="full_name"

      value={formData.full_name}

      onChange={handleChange}

      className="w-full border rounded p-3 mb-4"

    />

    <label className="font-semibold">
      {t("profile.country")}
    </label>

    <input

      type="text"

      name="country"

      value={formData.country}

      onChange={handleChange}

      className="w-full border rounded p-3"

    />

    <div className="flex gap-4 mt-6">

      <AnimatedButton

        onClick={saveProfile}

        className="bg-green-600 text-white px-5 py-2 rounded"

      >
        {t("profile.save")}
      </AnimatedButton>

      <button

        onClick={() => setEditing(false)}

        className="bg-gray-500 text-white px-5 py-2 rounded"

      >
        {t("profile.cancel")}
      </button>

    </div>
          </motion.div>
  </div>

) : (

  <div className="mt-6 text-center">

<motion.div
initial={{ opacity:0,y:30 }}
animate={{ opacity:1,y:0 }}
transition={{ duration:0.6 }}
>
    <h1 className="text-4xl font-bold">
        {profile.full_name}
    </h1>

    <div className="mt-4 flex justify-center items-center gap-2 dark:text-gray-300">

        <FaEnvelope />

        <span>{profile.email}</span>

    </div>

    <div className="mt-2 flex justify-center items-center gap-2 dark:text-gray-300">

        <FaGlobe />

        <span>{profile.country || "Unknown Country"}</span>
      </div>

      <div className="mt-4">

  <span
    className="
      inline-block
      bg-green-100
      text-green-700
      px-4
      py-2
      rounded-full
      font-semibold
    "
  >
    🌿 {stats.rank}
  </span>

</div>

    <Button

      onClick={() => setEditing(true)}>
      ✏ {t("profile.edit")}
    </Button>
  </motion.div>
  </div>

)}

<div className="mt-6">

  <input
  id="profileImage"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e)=>{
    setSelectedFile(e.target.files[0]);
  }}
/>

  {selectedFile && (

<Button
  onClick={uploadProfileImage}>

Upload Photo

</Button>

)}

</div>
      </div>
      <div className="grid md:grid-cols-4 gap-6 mt-4">

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
bg-green-200
dark:bg-gray-800
rounded-2xl
p-6
shadow
hover:scale-105
transition
h-44
flex
flex-col
justify-between
">
    <FaLeaf className="text-3xl text-green-600 mb-3" />

    <p className="text-3xl font-bold">
      {stats.total}
    </p>

    <p>{t("profile.total")}</p>

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
  <div className="
bg-blue-100
dark:bg-gray-800
rounded-2xl
p-6
shadow
hover:scale-105
transition
h-44
flex
flex-col
justify-between
">

  <FaCloud className="text-3xl text-green-600 mb-3" />

    <p className="text-3xl font-bold">
      {stats.average}
    </p>

    <p>{t("profile.average")}</p>

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
  <div className="
bg-yellow-100
dark:bg-gray-800
rounded-2xl
p-6
shadow
hover:scale-105
transition
h-44
flex
flex-col
justify-between
">

  <FaCloud className="text-3xl text-blue-600 mb-3"/>

<p className="text-3xl font-bold">
    {stats.lowest}
</p>

<p>{t("profile.lowest")}</p>

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
  <div className="
bg-red-100
dark:bg-gray-800
rounded-2xl
p-6
shadow
hover:scale-105
transition
h-44
flex
flex-col
justify-between
">

  <FaFire className="text-3xl text-green-600 mb-3" />

    <p className="text-3xl font-bold">
      {stats.highest}
    </p>

    <p>{t("profile.highest")}</p>

  </div>
</motion.div>

</div>
    </Card>

  <Card>

<SectionTitle

title={t("profile.about")}

subtitle={t("profile.information")}

/>

<div className="space-y-4 mx-5 mb-3 my-4">

<p>

👤

<strong>

{t("profile.fullName")}:

</strong>

{profile.full_name}

</p>

<p>

📧

<strong>

{t("profile.email")}:

</strong>

{profile.email}

</p>

<p>

🌍

<strong>

{t("profile.country")}:

</strong>

{profile.country}

</p>

<p>

📅

<strong>

{t("profile.joined")}:

</strong>

{

new Date(

profile.created_at

).toLocaleDateString()

}

</p>

</div>

</Card>

    </div>
    

    
  );
}

export default Profile;