import { Page, Text, View, Image } from "@react-pdf/renderer";

import logo from "../assets/logo.png";

import Watermark from "./components/Watermark";
import ReportFooter from "./components/ReportFooter";

function CertificatePage({ profile, stats }) {

  return (

    <Page
      size="A4"
      style={{
        padding:50,
        backgroundColor:"#ffffff"
      }}
    >

      <Watermark />

      <View
        style={{
          border:"4 solid #16a34a",
          padding:35,
          height:"100%",
          justifyContent:"space-between"
        }}
      >

        <View
          style={{
            alignItems:"center"
          }}
        >

          <Image
            src={logo}
            style={{
              width:100,
              height:100
            }}
          />

          <Text
            style={{
              fontSize:34,
              color:"#15803d",
              marginTop:20
            }}
          >

            Certificate

          </Text>

          <Text
            style={{
              fontSize:18,
              marginTop:10
            }}
          >

            of Environmental Awareness

          </Text>

        </View>

        <View
          style={{
            alignItems:"center"
          }}
        >

          <Text>

            Presented To

          </Text>

          <Text
            style={{
              fontSize:30,
              color:"#166534",
              marginTop:15
            }}
          >

            {profile.full_name}

          </Text>

          <Text
            style={{
              marginTop:20,
              textAlign:"center",
              lineHeight:1.8
            }}
          >

            For actively monitoring and improving environmental sustainability using EcoTrack.

          </Text>

          <Text
            style={{
              fontSize:22,
              color:"#15803d",
              marginTop:25
            }}
          >

            {stats.rank}

          </Text>

        </View>

        <View
          style={{
            flexDirection:"row",
            justifyContent:"space-between"
          }}
        >

          <View>

            <Text>

              Date

            </Text>

            <Text>

              {new Date().toDateString()}

            </Text>

          </View>

          <View>

            <Text>

              Authorized By

            </Text>

            <Text>

              EcoTrack

            </Text>

          </View>

        </View>

      </View>

      <ReportFooter page={7}/>

    </Page>

  );

}

export default CertificatePage;