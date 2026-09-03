import { View } from "@react-pdf/renderer";

function ProgressBar({ value }) {

  return (

    <View

      style={{

        marginTop: 8,

      }}

    >

      <View

        style={{

          height: 12,

          backgroundColor: "#ddd",

          borderRadius: 8,

        }}

      >

        <View

          style={{

            width: `${Math.min(value,100)}%`,

            height: 12,

            backgroundColor: "#16a34a",

            borderRadius: 8,

          }}

        />

      </View>

    </View>

  );

}

export default ProgressBar;