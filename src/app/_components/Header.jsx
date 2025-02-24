// "use client";
import React, { useContext, useState } from "react";
import { useTheme } from "../context/DarkModeContext";
import { GlogbalContext } from "./AppContext";
import Avatar from "./Common/Avatar";
import { ApiFetcher } from "../_customHooks/useButtonClickFetcher";
import { ClearAllCookies } from "../_utils/constant";
import toast from "react-hot-toast";

const Header = ({ toggleSidebar }) => {
  const { toggleDarkMode, themeConfig } = useTheme();
  const userdata = useContext(GlogbalContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    const response = await ApiFetcher("logout");
    if (response.code === 0) {
      toast.success(response.message);
      ClearAllCookies();
      window.location.href = "/login";
      return;
    } else {
      toast.error(response.message);
      return;
    }
  };

  return (
    <header className="app-header flex items-center px-4 gap-3">
      <div className="flex flex-row me-auto">
        {/* <!-- Sidenav Menu Toggle Button --> */}

        <button
          id="button-toggle-menu"
          className="nav-link p-2"
          onClick={toggleSidebar}
        >
          <span className="sr-only">Menu Toggle Button</span>
          <span className="flex items-center justify-center h-6 w-6">
            <i className="mgc_menu_line text-xl"></i>
          </span>
        </button>
        {/* <button id="button-toggle-menu" className="nav-link p-2">
          <span className="sr-only">Menu Toggle Button</span>
          <span className="flex items-center justify-center h-6 w-6">
            <i className="mgc_menu_line text-xl"></i>
          </span>
        </button> */}

        {/* <!-- Topbar Brand Logo --> */}
        <a href="/" className="logo-box">
          {/* <!-- Light Brand Logo --> */}
          <div className="logo-light">
            <img
              src="/images/noyt.png"
              className="logo-lg h-6"
              alt="Light logo"
            />

            <img
              src="/images/logo-sm.png"
              className="logo-sm"
              alt="Small logo"
            />
          </div>

          {/* <!-- Dark Brand Logo --> */}
          <div className="logo-dark">
            <img
              src="/images/noyt.png"
              className="logo-lg h-6"
              alt="Dark logo"
            />

            <img
              src="/images/logo-sm.png"
              className="logo-sm"
              alt="Small logo"
            />
          </div>
        </a>
      </div>

      {/* <!-- Light/Dark Toggle Button --> */}
      <div className="flex">
        {themeConfig.theme === "dark" ? (
          <button
            id="light-dark-mode"
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-800 hover:text-gray-200 rounded-full hover:bg-gray-600"
          >
            <div>
              <span className="sr-only">Light Mode</span>
              <span className="flex items-center justify-center h-6 w-6">
                <i className="mgc_moon_line text-2xl"></i>
              </span>
            </div>
          </button>
        ) : (
          <button
            id="light-dark-mode"
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-transparent hover:text-blue-500 rounded-full hover:bg-blue-100"
          >
            <div>
              <span className="sr-only">Dark Mode</span>
              <span className="flex items-center justify-center h-6 w-6">
                <i className="mgc_moon_line text-2xl"></i>
              </span>
            </div>
          </button>
        )}
      </div>
      {/* <div className="flex">
          <button id="light-dark-mode" type="button" className="nav-link p-2">
            <span className="sr-only">Light/Dark Mode</span>
            <span className="flex items-center justify-center h-6 w-6">
              <i className="mgc_moon_line text-2xl"></i>
            </span>
          </button>
        </div> */}

      {/* <!-- Profile Dropdown Button --> */}
      <div className="relative">
        <button
          type="button"
          className="nav-link  "
          onClick={toggleDropdown} // ✅ Toggle dropdown on click
        >
          <Avatar
            name={userdata.appusername}
            avatarClassName="avatar size-10 "
          />
          {/* <img
            src="/images/users/user-6.jpg"
            alt="user-image"
            className="rounded-full h-10"
          /> */}
        </button>
        <div
          className={`fc-dropdown ${
            isDropdownOpen ? "block opacity-100" : "hidden opacity-0"
          } w-44 z-50  absolute top-[44px] -left-[136px] transition-[margin,opacity] duration-300  bg-white shadow-lg border rounded-lg p-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800`}
        >
          <div className="px-4 pt-2  dark:border-gray-700">
            <span className="block text-sm font-medium text-gray-800 dark:text-gray-100">
              {userdata.appusername}
            </span>
          </div>
          <div className="px-4 pt-2">
            {userdata.designation && (
              <span className="block text-sm font-medium text-gray-800 dark:text-gray-100">
                {userdata.designation}
              </span>
            )}
          </div>

          <hr className="my-2 -mx-2 border-gray-200 dark:border-gray-700" />
          <p
            className="flex cursor-pointer items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            onClick={handleLogout}
          >
            <i className="mgc_exit_line me-2"></i>
            <span>Log Out</span>
          </p>
        </div>
      </div>

      {/* <div className="relative">
        <button
          data-fc-type="dropdown"
          data-fc-placement="bottom-end"
          type="button"
          className="nav-link  "
        >
          <img
            src="/images/users/user-6.jpg"
            alt="user-image"
            className="rounded-full h-10"
          />
        </button>
        <div
          className="fc-dropdown fc-dropdown-open:opacity-100 hidden opacity-0 w-44 z-50 transition-[margin,opacity] duration-300 mt-2 bg-white shadow-lg border rounded-lg p-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800
       "
        >
          <a
            className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            href="pages-gallery"
          >
            <i className="mgc_pic_2_line  me-2"></i>
            <span>Gallery</span>
          </a>
          <a
            className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            href="apps-kanban"
          >
            <i className="mgc_task_2_line  me-2"></i>
            <span>Kanban</span>
          </a>
          <a
            className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            href="auth-lock-screen"
          >
            <i className="mgc_lock_line  me-2"></i>
            <span>Lock Screen</span>
          </a>
          <hr className="my-2 -mx-2 border-gray-200 dark:border-gray-700" />
          <a
            className="flex items-center py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            href="auth-login"
          >
            <i className="mgc_exit_line  me-2"></i>
            <span>Log Out</span>
          </a>
        </div>
      </div> */}
    </header>

    //     <header className="app-header flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-900">
    //   {/* Left - Sidebar Toggle Button */}
    //   <button id="button-toggle-menu" className="nav-link p-2">
    //     <i className="mgc_menu_line text-xl"></i>
    //   </button>

    //   {/* Right - Profile and Dark Mode Toggle */}
    //   <div className="flex items-center space-x-4">
    //     {/* Dark Mode Toggle */}
    //     <button
    //       id="light-dark-mode"
    //       onClick={toggleDarkMode}
    //       className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
    //     >
    //       {themeConfig.theme === "dark" ? (
    //         <i className="mgc_sun_line text-2xl"></i>
    //       ) : (
    //         <i className="mgc_moon_line text-2xl"></i>
    //       )}
    //     </button>

    //     {/* Profile Dropdown */}
    //     <div className="relative">
    //       <button className="nav-link">
    //         <img
    //           src="images/users/user-6.jpg"
    //           alt="user-image"
    //           className="rounded-full h-10"
    //         />
    //       </button>
    //     </div>
    //   </div>
    // </header>
  );
};

export default Header;
