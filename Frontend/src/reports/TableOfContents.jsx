import { Page, Text, View } from "@react-pdf/renderer";

import Watermark from "./components/Watermark";
import ReportHeader from "./components/ReportHeader";
import ReportFooter from "./components/ReportFooter";

function TableOfContents() {

  const items = [
    ["1", "Cover"],
    ["2", "Table of Contents"],
    ["3", "User Profile"],
    ["4", "Carbon Analytics"],
    ["5", "Environmental Insights"],
    ["6", "Achievements"],
    ["7", "Recommendations"],
    ["8", "Certificate"],
  ];

  return (

    <Page
      size="A4"
      style={{
        padding:40,
        backgroundColor:"#fff",
      }}
    >

      <Watermark />

      <ReportHeader
        title="Table of Contents"
      />

      <Text
        style={{
          fontSize:28,
          color:"#166534",
          marginBottom:30,
        }}
      >

        Contents

      </Text>

      {

        items.map((item,index)=>(

          <View

            key={index}

            style={{

              flexDirection:"row",

              justifyContent:"space-between",

              borderBottom:"1 solid #d1d5db",

              paddingVertical:14,

            }}

          >

            <Text
              style={{
                fontSize:14,
              }}
            >

              {item[1]}

            </Text>

            <Text
              style={{
                color:"#15803d",
                fontWeight:"bold",
              }}
            >

              {item[0]}

            </Text>

          </View>

        ))

      }

      <View
        style={{
          marginTop:60,
          padding:20,
          backgroundColor:"#f0fdf4",
          borderLeft:"5 solid #16a34a",
        }}
      >

        <Text
          style={{
            fontSize:13,
            lineHeight:1.8,
          }}
        >

          This report summarizes your carbon footprint,
          sustainability achievements and personalized
          recommendations based on your activity in EcoTrack.

        </Text>

      </View>

      <ReportFooter page={2}/>

    </Page>

  );

}

export default TableOfContents;