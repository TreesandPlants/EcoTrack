import { View, Text } from "@react-pdf/renderer";

function StatCard({ title, value, color }) {

  return (

    <View

      style={{

        width: "46%",

        marginBottom: 14,

        padding: 15,

        borderRadius: 8,

        backgroundColor: "#f8fafc",

        borderLeft: `6 solid ${color}`,

      }}

    >

      <Text

        style={{

          fontSize: 12,

          color: "#666",

        }}

      >

        {title}

      </Text>

      <Text

        style={{

          marginTop: 8,

          fontSize: 22,

          color,

        }}

      >

        {value}

      </Text>

    </View>

  );

}

export default StatCard;