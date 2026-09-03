import {
  Page,
  View,
  Text,
  Image
} from "@react-pdf/renderer";

import styles from "./styles";
import logo from "../assets/logo.png";

function ThankYouPage() {

  return (

    <Page
      size="A4"
      style={styles.page}
    >

      {/* Watermark */}

      <Image
        src={logo}
        style={styles.watermark}
      />

      {/* Center Content */}

      <View

        style={{

          flex:1,

          justifyContent:"center",

          alignItems:"center",

          textAlign:"center"

        }}

      >

        <Image

          src={logo}

          style={{

            width:140,

            height:140,

            marginBottom:25

          }}

        />

        <Text

          style={{

            fontSize:34,

            color:"#166534",

            marginBottom:15,

            fontWeight:"bold"

          }}

        >

          Thank You!

        </Text>

        <Text

          style={{

            fontSize:18,

            color:"#4b5563",

            marginBottom:25,

            lineHeight:1.6

          }}

        >

          Every action you take today helps

          create a greener tomorrow.

        </Text>

        <Text

          style={{

            fontSize:14,

            width:"80%",

            textAlign:"center",

            lineHeight:1.8,

            color:"#555"

          }}

        >

          EcoTrack exists to help people understand,

          reduce and improve their environmental

          impact through simple daily actions.

        </Text>

      </View>

      {/* Quote */}

      <View

        style={{

          marginBottom:40,

          padding:20,

          backgroundColor:"#f0fdf4",

          borderRadius:10,

          border:"1 solid #16a34a"

        }}

      >

        <Text

          style={{

            fontSize:16,

            color:"#166534",

            textAlign:"center",

            lineHeight:1.8

          }}

        >

          "The Earth is what we all have in common."

        </Text>

      </View>

      <View

style={{

alignItems:"center",

marginBottom:20

}}

>

<View

style={{

backgroundColor:"#16a34a",

paddingHorizontal:18,

paddingVertical:8,

borderRadius:30

}}

>

<Text

style={{

color:"white",

fontSize:14

}}

>

Certified EcoTrack User

</Text>

</View>

</View>

      <View

style={{

alignItems:"center",

marginBottom:20

}}

>

<Text>

<link href="/" target="_blank" rel="noopener noreferrer">🌐 ecotrack.app</link>

</Text>

<Text>

<link href="https://github.com/TreesandPlants">GitHub</link> • <link href="https://www.linkedin.com/in/parthiban-duraisamy-b73641341/">LinkedIn</link>

</Text>

<Text>

Made with ❤ for a Sustainable Future

</Text>

</View>

      {/* Footer */}

      <Text style={styles.footer}>

        🌍 EcoTrack • Track Today, Save Tomorrow

      </Text>

    </Page>

  );

}

export default ThankYouPage;