import i18n from "../i18n/i18n";
import { applyTheme } from "./theme";


// =====================================================
// LANGUAGE MAP
// =====================================================

const languageMap = {

  English: "en",

  Tamil: "ta",

};


// =====================================================
// CONVERT DATABASE LANGUAGE → I18NEXT LANGUAGE
// =====================================================

export const getLanguageCode = (language) => {

  return languageMap[language] || "en";

};


// =====================================================
// APPLY USER PREFERENCES
// =====================================================

export const applyUserPreferences = async ({
  theme = "light",
  language = "English",
}) => {

  // Apply theme
  applyTheme(theme);

  // Convert database language to i18next code
  const languageCode =
    getLanguageCode(language);

  // Change i18next language
  await i18n.changeLanguage(languageCode);

  // Store ONLY the currently active user's preferences
  localStorage.setItem(
    "theme",
    theme
  );

  localStorage.setItem(
    "language",
    languageCode
  );

  // Update browser language
  document.documentElement.lang =
    languageCode;
};


// =====================================================
// CLEAR ACTIVE USER PREFERENCES
// =====================================================

export const clearUserPreferences = async () => {

  // Reset theme
  applyTheme("light");

  // Reset language
  await i18n.changeLanguage("en");

  // Remove previous user's active preferences
  localStorage.removeItem("theme");
  localStorage.removeItem("language");

  document.documentElement.lang = "en";
};