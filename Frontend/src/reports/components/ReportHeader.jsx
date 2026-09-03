import { View, Text, Image } from "@react-pdf/renderer";
import styles from "../styles";
import logo from "../../assets/logo.png";

function ReportHeader({ title }) {

  return (

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2 solid #16a34a",
        paddingBottom: 12,
        marginBottom: 20,
      }}
    >

      <View>

        <Text
          style={{
            fontSize: 24,
            color: "#15803d",
            fontWeight: "bold",
          }}
        >
          EcoTrack
        </Text>

        <Text
          style={{
            color: "#666",
            fontSize: 11,
          }}
        >
          {title}
        </Text>

      </View>

      <Image
        src={logo}
        style={{
          width: 45,
          height: 45,
        }}
      />

    </View>

  );

}

export default ReportHeader;