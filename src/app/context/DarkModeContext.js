// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";

// const DarkModeContext = createContext();

// export const DarkModeProvider = ({ children }) => {
//   const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

//   useEffect(() => {
//     // Retrieve the initial theme preference from localStorage on the client side
//     const savedTheme = localStorage.getItem("darkMode");
//     if (savedTheme !== null) {
//       setIsDarkModeEnabled(JSON.parse(savedTheme));
//     }
//   }, []); // Run only once when the component mounts

//   const toggleDarkMode = () => {
//     setIsDarkModeEnabled((prev) => {
//       const newTheme = !prev;
//       localStorage.setItem("darkMode", JSON.stringify(newTheme)); // Save the preference
//       return newTheme;
//     });
//   };

//   useEffect(() => {
//     if (isDarkModeEnabled) {
//       document.body.classList.add("dark"); // Apply the dark class to the body
//     } else {
//       document.body.classList.remove("dark"); // Remove the dark class from the body
//     }
//   }, [isDarkModeEnabled]);

//   return (
//     <DarkModeContext.Provider value={{ isDarkModeEnabled, toggleDarkMode }}>
//       <div
//         className={`min-h-100vh flex grow bg-slate-50 dark:bg-navy-900 ${
//           isDarkModeEnabled ? "dark" : ""
//         }`}
//       >
//         {children}
//       </div>
//     </DarkModeContext.Provider>
//   );
// };

// export const useDarkMode = () => useContext(DarkModeContext);

// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   // Initial theme state
//   const defaultConfig = {
//     direction: "ltr",
//     theme: "light",
//     layout: {
//       width: "default", // Boxed width for large screens
//       position: "fixed",
//     },
//     topbar: {
//       color: "light",
//     },
//     menu: {
//       color: "light",
//     },
//     sidenav: {
//       view: "default",
//     },
//   };

//   // Load saved theme config from sessionStorage/localStorage
//   const savedConfig =
//     typeof window !== "undefined"
//       ? JSON.parse(sessionStorage.getItem("__CONFIG__")) ||
//         JSON.parse(localStorage.getItem("__CONFIG__")) ||
//         defaultConfig
//       : defaultConfig;

//   const [themeConfig, setThemeConfig] = useState(savedConfig);

//   // Apply theme settings to HTML attributes
//   useEffect(() => {
//     const html = document.documentElement;

//     html.setAttribute("dir", themeConfig.direction);
//     html.setAttribute("data-mode", themeConfig.theme);
//     html.setAttribute("data-layout-width", themeConfig.layout.width);
//     html.setAttribute("data-layout-position", themeConfig.layout.position);
//     html.setAttribute("data-topbar-color", themeConfig.topbar.color);
//     html.setAttribute("data-menu-color", themeConfig.menu.color);

//     if (window.innerWidth <= 1140) {
//       html.setAttribute("data-sidenav-view", "mobile");
//     } else {
//       html.setAttribute("data-sidenav-view", themeConfig.sidenav.view);
//     }

//     // Save config changes to sessionStorage
//     sessionStorage.setItem("__CONFIG__", JSON.stringify(themeConfig));
//   }, [themeConfig]);

//   // Function to toggle dark/light mode
//   const toggleDarkMode = () => {
//     setThemeConfig((prevConfig) => {
//       const newTheme = prevConfig.theme === "dark" ? "light" : "dark";
//       const updatedConfig = { ...prevConfig, theme: newTheme };

//       sessionStorage.setItem("__CONFIG__", JSON.stringify(updatedConfig));
//       return updatedConfig;
//     });
//   };

//   return (
//     <ThemeContext.Provider
//       value={{ themeConfig, setThemeConfig, toggleDarkMode }}
//     >
//       <div
//         className={`min-h-screen flex flex-col bg-slate-50 dark:bg-navy-900 ${
//           themeConfig.theme === "dark" ? "dark" : ""
//         }`}
//       >
//         {children}
//       </div>
//     </ThemeContext.Provider>
//   );
// };

// // Hook to access theme context
// export const useTheme = () => useContext(ThemeContext);

"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const defaultConfig = {
    direction: "ltr",
    theme: "dark", // 🔥 Now default theme is set to "dark"
    layout: {
      width: "default",
      position: "fixed"
    },
    topbar: {
      color: "light"
    },
    menu: {
      color: "light"
    },
    sidenav: {
      view: "default"
    }
  };

  // State for themeConfig (initially null to prevent hydration mismatch)
  const [themeConfig, setThemeConfig] = useState(null);

  // Load saved theme config on client-side only
  useEffect(() => {
    const savedConfig =
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("__CONFIG__")) ||
          JSON.parse(localStorage.getItem("__CONFIG__")) ||
          defaultConfig
        : defaultConfig;

    setThemeConfig(savedConfig); // Set the theme after mount
  }, []);

  // Update HTML attributes when themeConfig changes
  useEffect(() => {
    if (!themeConfig) return; // Ensure config is loaded before applying changes

    const html = document.documentElement;
    html.setAttribute("dir", themeConfig.direction);
    html.setAttribute("data-mode", themeConfig.theme);
    html.setAttribute("data-layout-width", themeConfig.layout.width);
    html.setAttribute("data-layout-position", themeConfig.layout.position);
    html.setAttribute("data-topbar-color", themeConfig.topbar.color);
    html.setAttribute("data-menu-color", themeConfig.menu.color);

    if (window.innerWidth <= 1140) {
      html.setAttribute("data-sidenav-view", "mobile");
    } else {
      html.setAttribute("data-sidenav-view", themeConfig.sidenav.view);
    }

    // Save to sessionStorage
    sessionStorage.setItem("__CONFIG__", JSON.stringify(themeConfig));
  }, [themeConfig]);

  // Function to toggle dark/light mode
  const toggleDarkMode = () => {
    setThemeConfig((prevConfig) => {
      if (!prevConfig) return prevConfig; // Prevent toggling before state is ready

      const newTheme = prevConfig.theme === "dark" ? "light" : "dark";
      const updatedConfig = { ...prevConfig, theme: newTheme };

      sessionStorage.setItem("__CONFIG__", JSON.stringify(updatedConfig));
      return updatedConfig;
    });
  };

  // Prevent rendering until themeConfig is loaded (Fixes hydration issue)
  if (!themeConfig) {
    // return <div className="min-h-screen bg-black">Loading Page....</div>; // Temporary loader with dark mode default
    return (
      <div>
        <div className="bg-gradient-to-r  from-gray-700 via-gray-900 to-black">
          {/* <div className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black"> */}
          <div className="h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col justify-center text-center gap-6">
              <i className="mgc_rocket_line text-4xl text-gray-600 dark:text-gray-100 -rotate-45 my-4"></i>
              <h1 className="text-2xl font-bold tracking-tight dark:text-gray-100">
                Optimizing Performance, Enhancing Experience
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Hold tight! We’re loading the latest data to keep your workflow
                seamless.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider
      value={{ themeConfig, setThemeConfig, toggleDarkMode }}
    >
      <div
        // className={`min-h-screen flex flex-col bg-navy-900 ${
        // className={`min-h-screen flex flex-col bg-slate-50 dark:bg-navy-900 ${
        className={` ${themeConfig.theme === "dark" ? "dark" : "light"}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Hook to access theme context
export const useTheme = () => useContext(ThemeContext);
