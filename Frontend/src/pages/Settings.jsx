import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaBell, FaGlobe, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api";
import { applyTheme } from "../utils/theme";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

function Settings() {

  const { t, i18n } = useTranslation();

  const [settings, setSettings] = useState({
    theme: "light",
    language: "en",
    notifications: true,
  });

  const [loading, setLoading] = useState(false);


  // =====================================================
  // LOAD SETTINGS
  // =====================================================

  useEffect(() => {

    loadSettings();

  }, []);

const loadSettings = async () => {

  try {

    const userId = localStorage.getItem("userId");

    if (!userId) return;

    const response = await api.get(`/users/${userId}`);

    let language = response.data.language || "en";

    // Convert old database values
    if (language === "English") {
      language = "en";
    }

    if (language === "Tamil") {
      language = "ta";
    }

    const theme = response.data.theme || "light";

    const notifications =
      response.data.notifications !== 0;

    // Update React state
    setSettings({
      theme,
      language,
      notifications,
    });

    // IMPORTANT: Apply user's saved theme
    applyTheme(theme);

    // IMPORTANT: Apply user's saved language
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);

    await i18n.changeLanguage(language);

  } catch (error) {

    console.error(
      "Settings Load Error:",
      error
    );

  }

};


  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setSettings({

      ...settings,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  };


  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const saveSettings = async () => {

    try {

      setLoading(true);

      const userId =
        localStorage.getItem("userId");

      if (!userId) {

        toast.error(
          "Please login first."
        );

        return;

      }


      await api.put(

        `/users/${userId}`,

        {

          theme:
            settings.theme,

          language:
            settings.language,

          notifications:
            settings.notifications
              ? 1
              : 0,

        }

      );

      await i18n.changeLanguage(settings.language);

localStorage.setItem(
  "language",
  settings.language
);


      // Save theme locally
      localStorage.setItem(
        "theme",
        settings.theme
      );

      applyTheme(
        settings.theme
      );


      toast.success(
        "Settings Updated Successfully"
      );

    }

    catch (error) {

      console.error(
        "Settings Update Error:",
        error
      );

      toast.error(
        "Failed to update settings"
      );

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="
  w-full
  max-w-5xl
  mx-auto
  px-4
  sm:px-6
  py-6
  sm:py-8
">

      {/* ========================================= */}
      {/* PAGE TITLE */}
      {/* ========================================= */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">

          {t("settings.title")}

        </h1>

        <p className="text-gray-500 mt-2 dark:text-gray-400">

          {t("settings.subtitle")}

        </p>

      </div>


      {/* ========================================= */}
      {/* SETTINGS CONTAINER */}
      {/* ========================================= */}

      <div className="
        max-w-3xl
        bg-white
        dark:bg-gray-800
        rounded-2xl
        shadow-lg
        p-5
        space-y-8
        sm:p-8
        text-gray-900
        dark:text-white
      ">


        {/* ========================================= */}
        {/* THEME */}
        {/* ========================================= */}

        <div>

          <div className="
            flex
            items-center
            gap-4
            mb-4
          ">

            {settings.theme === "light"
              ? (
                <FaSun
                  className="text-yellow-500 text-xl"
                />
              )
              : (
                <FaMoon
                  className="text-green-600 text-xl"
                />
              )
            }

            <div>

              <h2 className="text-xl font-semibold">

                {t("settings.appearance")}

              </h2>

              <p className="text-sm text-gray-400">

                {t("settings.appearanceDescription")}

              </p>

            </div>

          </div>


          <select

            name="theme"

            value={settings.theme}

            onChange={handleChange}

            className="
  w-full
  border
  border-gray-300
  dark:border-gray-600
  bg-white
  dark:bg-gray-700
  text-gray-900
  dark:text-white
  rounded-xl
  px-4
  py-3
  outline-none
  focus:ring-2
  focus:ring-green-500
"

          >

            <option value="light">

              {t("settings.light")}

            </option>

            <option value="dark">

              {t("settings.dark")}

            </option>

          </select>

        </div>


        {/* ========================================= */}
        {/* LANGUAGE */}
        {/* ========================================= */}

        <div>

          <div className="
            flex
            items-center
            gap-4
            mb-4
          ">

            <FaGlobe
              className="
                text-blue-500
                text-xl
              "
            />

            <div>

              <h2 className="text-xl font-semibold">

                {t("settings.language")}

              </h2>

              <p className="text-sm text-gray-400">

                {t("settings.languageDescription")}

              </p>

            </div>

          </div>


          <select

            name="language"

            value={settings.language}

            onChange={handleChange}

            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-green-500
            "

          >

            <option value="en">
    English
  </option>

  <option value="ta">
    தமிழ்
  </option>
          </select>
        </div>


        {/* ========================================= */}
        {/* NOTIFICATIONS */}
        {/* ========================================= */}

        <div>

          <div className="
            flex
            items-center
            justify-between
          ">

            <div className="
              flex
              items-center
              gap-4
            ">

              <FaBell
                className="
                  text-green-600
                  text-xl
                "
              />

              <div>

                <h2 className="
                  text-xl
                  font-semibold
                ">

                  {t("settings.notifications")}

                </h2>

                <p className="
                  text-sm
                  text-gray-400
                ">

                  {t("settings.notificationsDescription")}

                </p>

              </div>

            </div>


            <label className="
              relative
              inline-flex
              items-center
              cursor-pointer
            ">

              <input

                type="checkbox"

                name="notifications"

                checked={
                  settings.notifications
                }

                onChange={handleChange}

                className="sr-only peer"

              />

              <div className="
                w-11
                h-6
                bg-gray-300
                rounded-full
                peer
                peer-checked:bg-green-600
                after:content-['']
                after:absolute
                after:top-0.5
                after:left-0.5
                after:bg-white
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                peer-checked:after:translate-x-full
              " />

            </label>

          </div>

        </div>


        {/* ========================================= */}
        {/* SAVE BUTTON */}
        {/* ========================================= */}

        <div className="
          border-t
          pt-6
          flex
          justify-end
        ">

          <button

            onClick={saveSettings}

            disabled={loading}

            className="
              flex
              items-center
              gap-3
              bg-green-600
              hover:bg-green-700
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
              disabled:opacity-60
            "

          >

            <FaSave />

            {loading
              ? t("settings.saving")
              : t("settings.save")
            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default Settings;