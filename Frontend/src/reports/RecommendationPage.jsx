import { Page, Text, View } from "@react-pdf/renderer";

import Watermark from "./components/Watermark";
import ReportHeader from "./components/ReportHeader";
import ReportFooter from "./components/ReportFooter";

function RecommendationPage({ stats }) {

  const recommendations = [];

  if (stats.average >= 100) {
    recommendations.push("Reduce personal vehicle usage.");
    recommendations.push("Switch to renewable electricity.");
    recommendations.push("Reduce household waste.");
    recommendations.push("Increase recycling habits.");
  }

  if (stats.average >= 50 && stats.average < 100) {
    recommendations.push("Use public transport more often.");
    recommendations.push("Turn off unused appliances.");
    recommendations.push("Reduce food waste.");
    recommendations.push("Plant trees whenever possible.");
  }

  if (stats.average < 50) {
    recommendations.push("Excellent work!");
    recommendations.push("Maintain your eco-friendly lifestyle.");
    recommendations.push("Encourage others to reduce emissions.");
    recommendations.push("Keep tracking your footprint.");
  }

  return (

    <Page
      size="A4"
      style={{
        padding:40,
        backgroundColor:"#fff"
      }}
    >

      <Watermark />

      <ReportHeader title="Recommendations" />

      <Text
        style={{
          fontSize:24,
          color:"#166534",
          marginBottom:20
        }}
      >

        Personalized Recommendations

      </Text>

      {
        recommendations.map((tip,index)=>(

          <View

            key={index}

            style={{
              backgroundColor:"#f0fdf4",
              padding:18,
              marginBottom:15,
              borderLeft:"5 solid #16a34a",
              borderRadius:8
            }}

          >

            <Text
              style={{
                fontSize:13
              }}
            >

              ✓ {tip}

            </Text>

          </View>

        ))
      }

      <View
        style={{
          marginTop:35,
          backgroundColor:"#ecfeff",
          padding:20,
          borderRadius:8
        }}
      >

        <Text
          style={{
            fontSize:16,
            color:"#0f766e",
            marginBottom:10
          }}
        >

          Estimated Improvement

        </Text>

        <Text>

          Following these recommendations could reduce your monthly carbon emissions by approximately 20–35%.

        </Text>

      </View>

      <ReportFooter page={6}/>

    </Page>

  );

}

export default RecommendationPage;