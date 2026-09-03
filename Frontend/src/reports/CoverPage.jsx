import {
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";

import logo from "../assets/logo.png";

import Watermark from "./components/Watermark";
import ReportFooter from "./components/ReportFooter";

function CoverPage({ profile, stats }) {

  const score =
    stats.average <= 50
      ? "A+"
      : stats.average <= 100
      ? "B"
      : "C";

  return (

    <Page
      size="A4"
      style={{
        padding:40,
        backgroundColor:"#ffffff"
      }}
    >

      <Watermark />

      {/* Top Banner */}

      <View
        style={{
          backgroundColor:"#15803d",
          padding:25,
          borderRadius:10,
          alignItems:"center"
        }}
      >

        <Image
          src={logo}
          style={{
            width:90,
            height:90
          }}
        />

        <Text
          style={{
            fontSize:34,
            color:"white",
            marginTop:15,
            fontWeight:"bold"
          }}
        >

          EcoTrack

        </Text>

        <Text
          style={{
            color:"#dcfce7",
            fontSize:15,
            marginTop:8
          }}
        >

          Sustainability Assessment Report

        </Text>

      </View>

      {/* User Card */}

      <View
        style={{
          marginTop:45,
          padding:25,
          backgroundColor:"#f0fdf4",
          borderRadius:12,
          border:"2 solid #16a34a"
        }}
      >

        <Text
          style={{
            fontSize:14,
            color:"#666"
          }}
        >

          Prepared For

        </Text>

        <Text
          style={{
            fontSize:28,
            color:"#166534",
            marginTop:8
          }}
        >

          {profile.full_name}

        </Text>

        <Text
          style={{
            marginTop:12,
            color:"#555"
          }}
        >

          Generated on

        </Text>

        <Text>

          {new Date().toDateString()}

        </Text>

      </View>

      {/* Score Cards */}

      <View
        style={{
          flexDirection:"row",
          justifyContent:"space-between",
          marginTop:45
        }}
      >

        <View
          style={{
            width:"31%",
            backgroundColor:"#ecfdf5",
            padding:18,
            borderRadius:8,
            alignItems:"center"
          }}
        >

          <Text
            style={{
              fontSize:14
            }}
          >

            Eco Rank

          </Text>

          <Text
            style={{
              marginTop:10,
              fontSize:20,
              color:"#15803d"
            }}
          >

            {stats.rank}

          </Text>

        </View>

        <View
          style={{
            width:"31%",
            backgroundColor:"#eff6ff",
            padding:18,
            borderRadius:8,
            alignItems:"center"
          }}
        >

          <Text>

            Average

          </Text>

          <Text
            style={{
              fontSize:20,
              marginTop:10,
              color:"#2563eb"
            }}
          >

            {stats.average} kg

          </Text>

        </View>

        <View
          style={{
            width:"31%",
            backgroundColor:"#fefce8",
            padding:18,
            borderRadius:8,
            alignItems:"center"
          }}
        >

          <Text>

            Eco Score

          </Text>

          <Text
            style={{
              marginTop:10,
              fontSize:30,
              color:"#ca8a04"
            }}
          >

            {score}

          </Text>

        </View>

      </View>

      {/* Quote */}

      <View

style={{

marginTop:40,

padding:25,

backgroundColor:"#fefce8",

borderLeft:"5 solid #ca8a04"

}}

>

<Text

style={{

fontSize:15,

lineHeight:1.7,

color:"#92400e"

}}

>

"The greatest threat to our planet is the belief that someone else will save it."

</Text>

</View>

      <ReportFooter page={1}/>

    </Page>

  );

}

export default CoverPage;