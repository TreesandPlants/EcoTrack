import { Document } from "@react-pdf/renderer";
import RecommendationPage from "./RecommendationPage";
import CertificatePage from "./CertificatePage";
import TableOfContents from "./TableOfContents";
import CoverPage from "./CoverPage";
import ProfilePage from "./ProfilePage";
import StatisticsPage from "./StatisticsPage";
import AchievementPage from "./AchievementPage";
import ThankYouPage from "./ThankYouPage";
function EcoTrackReport({ profile, stats }){
return(
<Document>

<CoverPage
profile={profile}
stats={stats}
/>
<TableOfContents />
<ProfilePage
profile={profile}
/>

<StatisticsPage
stats={stats}
/>

<AchievementPage
stats={stats}
/>

<RecommendationPage
    stats={stats}
  />

  <CertificatePage
    profile={profile}
    stats={stats}
  />
  <ThankYouPage />

</Document>

);

}

export default EcoTrackReport;