import { Image } from "@react-pdf/renderer";
import logo from "../../assets/logo.png";

function Watermark() {

  return (

    <Image

      src={logo}

      style={{

        position: "absolute",

        width: 280,

        height: 280,

        top: 180,

        left: 150,

        opacity: 0.05,

      }}

    />

  );

}

export default Watermark;