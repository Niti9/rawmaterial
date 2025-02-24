"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { usePathname } from "next/navigation"; // Import usePathname
import { BsChatSquareQuoteFill } from "react-icons/bs";
import { IoBookmarks } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { PiExportBold } from "react-icons/pi";
const SideNavBar = ({ toggleSidebar }) => {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState({ admin: false });

  // Function to check if a link is active
  const isActive = (path) => {
    return pathname === path || pathname.startsWith(path + "/")
      ? "active-menu-item !text-[#1E85FF]  text-xs "
      : "";
  };

  // Auto-open dropdowns based on active route
  useEffect(() => {
    if (
      pathname.startsWith("/client") ||
      pathname.startsWith("/plants") ||
      pathname.startsWith("/locations")
    ) {
      setOpenDropdowns((prev) => ({ ...prev, admin: true }));
    }
  }, [pathname]);

  // Toggle function for dynamic menus
  const toggleDropdown = (menu) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [menu]: !prev[menu] // Toggle only the clicked dropdown
    }));
  };

  return (
    <div className="app-menu">
      {/* <!-- Sidenav Brand Logo --> */}
      <a href="/" className="logo-box relative">
        {/* <!-- Light Brand Logo --> */}
        <div className="logo-light">
          <img
            src="/images/noyt.png"
            className="logo-lg h-6"
            alt="Light logo"
          />

          <img src="/images/logo-sm.png" className="logo-sm" alt="Small logo" />
        </div>

        {/* <!-- Dark Brand Logo --> */}
        <div className="logo-dark">
          <img
            src="/images/noyt.png"
            className="logo-lg h-6"
            alt="Light logo"
          />

          <img src="/images/logo-sm.png" className="logo-sm" alt="Small logo" />
        </div>
        <button
          id="button-toggle-menu"
          className="nav-link p-2 hidden max-[1129px]:flex "
          onClick={(e) => {
            e.preventDefault(); // Prevents redirection
            toggleSidebar();
          }}
        >
          <span className="flex items-center justify-end h-6 w-6  absolute  top-2 right-2 hover:text-black">
            <IoMdClose className="mgc_menu_line text-xl " />
          </span>
        </button>
      </a>

      {/* <!-- Sidenav Menu Toggle Button --> */}
      <button
        id="button-hover-toggle"
        className="absolute top-5 end-2 rounded-full p-1.5"
      >
        <span className="sr-only">Menu Toggle Button</span>
        <i className="mgc_round_line text-xl"></i>
      </button>

      {/* <!--- Menu --> */}
      <div className="srcollbar" data-simplebar>
        <div className="simplebar-wrapper" style={{ margin: 0 }}>
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer"></div>
          </div>
          <div className="simplebar-mask">
            <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
              <div
                className="simplebar-content-wrapper"
                tabIndex={0}
                role="region"
                aria-label="scrollable content"
                style={{ height: "100%", overflow: "hidden scroll" }}
              >
                <div className="simplebar-content" style={{ padding: 0 }}>
                  <ul className="menu mt-3" data-fc-type="accordion">
                    <li
                      className={`menu-item ${
                        openDropdowns.admin ? "open" : ""
                      }`}
                    >
                      <div
                        className={`menu-link fc-collapse ${
                          openDropdowns.admin ? "open" : ""
                        }`}
                        onClick={() => toggleDropdown("admin")}
                      >
                        <span className="menu-icon">
                          <i className="mgc_user_3_line"></i>
                        </span>
                        <span className="menu-text">Admin</span>
                        <span className="menu-arrow"></span>
                      </div>
                      {openDropdowns.admin && (
                        <ul className="sub-menu">
                          <li className={`menu-item  `}>
                            <Link href="/client" className={`menu-link `}>
                              <span
                                className={`menu-text ${isActive("/client")}`}
                              >
                                Client
                              </span>
                            </Link>
                          </li>
                          <li className={`menu-item `}>
                            <Link href="/plants" className={`menu-link `}>
                              <span
                                className={`menu-text ${isActive("/plants")}`}
                              >
                                Plants
                              </span>
                            </Link>
                          </li>
                          <li className={`menu-item `}>
                            <Link href="/locations" className={`menu-link `}>
                              <span
                                className={`menu-text ${isActive(
                                  "/locations"
                                )}`}
                              >
                                Locations
                              </span>
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* <li className="menu-item">
                      <div
                        data-fc-type="collapse"
                        className={`menu-link fc-collapse ${
                          openDropdowns ? "open" : ""
                        } `}
                        onClick={() => setOpenDropdowns(!openDropdowns)}
                      >
                        <span className="menu-icon">
                          <i className="mgc_user_3_line"></i>
                        </span>
                        <span className="menu-text"> Admin </span>

                        <span className="menu-arrow"></span>
                      </div>
                      {openDropdowns && (
                        <ul className="sub-menu">
                          <li className="menu-item">
                            <Link href="/client" className="menu-link">
                              <span className="menu-text ">Client</span>
                            </Link>
                          </li>
                          <li className="menu-item">
                            <Link href="/plants" className="menu-link">
                              <span className="menu-text">Plants</span>
                            </Link>
                          </li>
                          <li className="menu-item">
                            <Link href="/locations" className="menu-link">
                              <span className="menu-text">Locations</span>
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li> */}

                    <li className={`menu-item fc-collapse open`}>
                      <Link href="/user/request" className={`menu-link `}>
                        <span
                          className={`menu-icon ${isActive("/user/request")}`}
                        >
                          <BsChatSquareQuoteFill className="mgc_user_3_line" />
                        </span>
                        <span
                          className={`menu-text ${isActive("/user/request")}`}
                        >
                          Items Checkin
                        </span>
                      </Link>
                    </li>
                    <li className={`menu-item fc-collapse open`}>
                      <Link href="/itemtype" className={`menu-link `}>
                        <span className={`menu-icon ${isActive("/itemtype")}`}>
                          {/* <BsChatSquareQuoteFill className="mgc_user_3_line" /> */}
                          <IoBookmarks className="mgc_user_3_line" />
                        </span>
                        <span className={`menu-text ${isActive("/itemtype")}`}>
                          Item List
                        </span>
                      </Link>
                    </li>
                    <li className={`menu-item fc-collapse open`}>
                      <Link
                        href="/user/checkoutrequest"
                        className={`menu-link `}
                      >
                        <span
                          className={`menu-icon ${isActive(
                            "/user/checkoutrequest"
                          )}`}
                        >
                          <PiExportBold className="mgc_user_3_line text-4xl" />
                        </span>
                        <span
                          className={`menu-text ${isActive(
                            "/user/checkoutrequest"
                          )}`}
                        >
                          Items Checkout
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
