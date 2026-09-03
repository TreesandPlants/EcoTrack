import {

Page,
Text,
View,
Image

} from "@react-pdf/renderer";

import styles from "./styles";

import logo from "../assets/logo.png";

import ReportFooter from "./components/ReportFooter";

function StatisticsPage({ stats }) {

return (

<Page size="A4" style={styles.page}>

<Image

src={logo}

style={styles.watermark}

/>

<Text style={styles.title}>

Carbon Statistics

</Text>
<View

style={{

marginTop:15,

padding:18,

borderRadius:8,

backgroundColor:"#f8fafc",

border:"1 solid #d1d5db"

}}

>

<Text

style={{

fontSize:16,

marginBottom:8,

color:"#166534"

}}

>

Monthly Summary

</Text>

<Text>
    Total Calculations:
{stats?.total || 0}

</Text>
<Text>
 Average Carbon:
{stats.average} kg

</Text>

<Text>

Highest:
{stats.highest} kg


</Text>
<Text>
     Lowest:
{stats.lowest} kg
</Text>
<Text>
     Eco Rank:
{stats?.rank || "Beginner"}

</Text>

<Text>

Records :

24

</Text>

</View>

<View

style={{

flexDirection:"row",

justifyContent:"space-between",

marginTop:30

}}

>

{

[

["Average","62"],

["Highest","95"],

["Lowest","18"]

].map((card,index)=>(

<View

key={index}

style={{

width:"31%",

padding:16,

backgroundColor:"#f0fdf4",

borderRadius:10,

alignItems:"center"

}}

>

<Text>

{card[0]}

</Text>

<Text

style={{

fontSize:22,

marginTop:10,

color:"#15803d"

}}

>

{card[1]}

</Text>

</View>

))

}

</View>

<View style={styles.section}>

<Text style={styles.heading}>

Performance

</Text>

<Text>

Excellent ≤ 50 kg

</Text>

<Text>

Moderate 51 - 100 kg

</Text>

<Text>

High - 100 kg

</Text>

</View>
<ReportFooter page={4}/>
</Page>

);

}

export default StatisticsPage;