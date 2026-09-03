import { View, Text } from "@react-pdf/renderer";

function BadgeCard({ badge, unlocked }) {

  return (

    <View

      style={{

        width: "45%",

        marginBottom: 15,

        padding: 14,

        borderRadius: 10,

        backgroundColor: unlocked
          ? "#dcfce7"
          : "#f3f4f6",

      }}

    >

      <Text

        style={{

          fontSize: 18,

        }}

      >

        {unlocked ? badge.icon : "🔒"}

      </Text>

      <Text

        style={{

          marginTop: 6,

          fontSize: 14,

          fontWeight: "bold",

        }}

      >

        {badge.title}

      </Text>

    </View>

  );

}

export default BadgeCard;