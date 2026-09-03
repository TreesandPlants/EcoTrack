import { useEffect } from "react";
import { applyTheme } from "../utils/theme";
import i18n from "../i18n/i18n";

function PreferenceInitializer() {

  useEffect(() => {

    const theme =
      localStorage.getItem("theme") || "light";

    const language =
      localStorage.getItem("language") || "en";

    // Apply theme
    applyTheme(theme);

    // Apply language
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }

  }, []);

  return null;
}

export default PreferenceInitializer;