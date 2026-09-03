import {
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";

import styles from "./styles";
import logo from "../assets/logo.png";
import ReportFooter from "./components/ReportFooter";

function ProfilePage({ profile }) {

  return (

    <Page size="A4" style={styles.page}>

      {/* Watermark */}

      <Image
        src={logo}
        style={styles.watermark}
      />

      <Text style={styles.title}>
        User Profile
      </Text>

      <View style={styles.section}>

        <Text style={styles.heading}>
          Personal Information
        </Text>

        <Text style={styles.text}>
           Name: {profile?.full_name || "EcoTrack User"}
        </Text>

        <Text style={styles.text}>
           Email: {profile?.email || "-"}
        </Text>

        <Text style={styles.text}>
           Country: {profile?.country || "-"}
        </Text>

        <Text style={styles.text}>
           Report Generated:
        </Text>

        <Text style={styles.text}>
          {new Date().toDateString()}
        </Text>

      </View>

      <View style={styles.section}>

        <Text style={styles.heading}>
          EcoTrack Mission
        </Text>

        <Text style={styles.text}>
          EcoTrack empowers individuals to
          understand and reduce their carbon
          footprint through awareness,
          tracking and sustainable decisions.
        </Text>

      </View>
<ReportFooter page={3}/>

    </Page>

  );

}

export default ProfilePage;