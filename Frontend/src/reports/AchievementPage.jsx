import {

Page,
Text,
View,
Image

} from "@react-pdf/renderer";

import styles from "./styles";

import logo from "../assets/logo.png";

import { allBadges } from "../data/badges";

import ReportFooter from "./components/ReportFooter";

function AchievementPage({ stats }) {

return (

<Page size="A4" style={styles.page}>

<Image

src={logo}

style={styles.watermark}

/>

<Text style={styles.title}>

Achievements

</Text>

<View style={styles.section}>

<Text style={styles.heading}>

Unlocked Badges

</Text>

<View

style={{

flexDirection:"row",

flexWrap:"wrap",

justifyContent:"space-between",

marginTop:30

}}

>

{

[

" Beginner",

" Explorer",

" Warrior",

" Hero"

].map((badge,index)=>(

<View

key={index}

style={{

width:"47%",

padding:18,

marginBottom:15,

borderRadius:10,

backgroundColor:"#ecfdf5",

alignItems:"center"

}}

>

<Text

style={{

fontSize:28

}}

>

{badge.split(" ")[0]}

</Text>

<Text

style={{

marginTop:8

}}

>

{badge.split(" ")[1]}

</Text>

</View>

))

}

</View>

</View>
<ReportFooter page={5}/>

</Page>

);

}

export default AchievementPage;