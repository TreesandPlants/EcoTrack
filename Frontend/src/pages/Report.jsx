import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import api from "../services/api";
import { useTranslation } from "react-i18next";
import EcoTrack from "../reports/EcoTrackReport";
import i18n from "../i18n/i18n";

function Report() {

  const [profile, setProfile] = useState(null);

  const { t, i18n } = useTranslation(); 

  const [stats, setStats] = useState(null);

  useEffect(() => {

  loadReport();

}, []);

const loadReport = async () => {

  try {

  const storage =
localStorage.getItem("token")
? localStorage
: sessionStorage;

    const userId = storage.getItem("userId");

    // Fetch profile
    const profileResponse =
      await api.get(`/users/${userId}`);

    setProfile(profileResponse.data);

    // Fetch calculations
    const calcResponse =
      await api.get(`/calculations/user/${userId}`);

    const data = calcResponse.data;

    const totals = data.map(item =>
      Number(item.total_carbon)
    );

    const average =
      totals.length > 0
        ? totals.reduce((a, b) => a + b, 0) / totals.length
        : 0;

    setStats({

      total: data.length,

      average: average.toFixed(1),

      highest:
        totals.length > 0
          ? Math.max(...totals)
          : 0,

      lowest:
        totals.length > 0
          ? Math.min(...totals)
          : 0,

      rank:
        average < 50
          ? "Eco Champion"
          : average < 100
          ? "Eco Explorer"
          : "Eco Beginner"

    });

  }

  catch(err){

    console.log(err);

  }

};

  if(!profile || !stats){

    return <h2>Loading...</h2>;

  }

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">

       {t("report.title")}

      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 dark:bg-gray-800">

        <h2 className="text-2xl mb-5 ">

          {t("report.download")}

        </h2>

        <PDFDownloadLink

          document={
            <EcoTrack
              profile={profile}
              stats={stats}
            />
          }

          fileName="EcoTrack_Report.pdf"

        >

          {({ loading }) =>

            loading

            ?

            "Preparing..."

            :

            <button className="bg-green-600 text-white px-8 py-3 rounded-lg cursor-pointer">

              {t("report.report")}

            </button>

          }

        </PDFDownloadLink>

      </div>

    </div>

  );

}

export default Report;