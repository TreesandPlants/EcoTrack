import { View, Text } from "@react-pdf/renderer";

function ReportFooter({ page }) {

  return (

    <View
      style={{
        position: "absolute",
        bottom: 20,
        left: 40,
        right: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        borderTop: "1 solid #ddd",
        paddingTop: 8,
        fontSize: 10,
        color: "#666",
      }}
    >

      <Text>
        EcoTrack Sustainability Report
      </Text>

      <Text>
        Page {page}
      </Text>

    </View>

  );

}

export default ReportFooter;