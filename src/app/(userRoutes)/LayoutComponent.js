"use client";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "../_components/Header";
import { GlogbalContext } from "../_components/AppContext";
import SideNavBar from "../_components/Common/Sidebar/SideNavBar";
import Footer from "../_components/Footer";
const LayoutComponent = ({ children, userData }) => {
  const [sidebarView, setSidebarView] = useState("default");

  // Handle Sidebar Toggle
  const toggleSidebar = () => {
    setSidebarView((prev) => {
      if (window.innerWidth > 1130) {
        return prev === "default" ? "sm" : "default"; // Toggle between sm and default
      } else {
        const isCurrentlyMobileOpen =
          document.documentElement.classList.contains("sidenav-enable");
        document.documentElement.classList.toggle(
          "sidenav-enable",
          !isCurrentlyMobileOpen
        );
        return "mobile"; // Always set mobile when screen is <= 1130px
      }
    });
  };

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1130) {
        setSidebarView("mobile");
        document.documentElement.classList.remove("sidenav-enable"); // Auto-close in mobile
      } else {
        setSidebarView("default"); // Set default when resizing back
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run on load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update HTML Attributes Dynamically
  useEffect(() => {
    document.documentElement.setAttribute("data-sidenav-view", sidebarView);
  }, [sidebarView]);

  return (
    <GlogbalContext value={userData}>
      <>
        <div className="flex wrapper">
          <Toaster position="top-center" reverseOrder={false} />
          <SideNavBar toggleSidebar={toggleSidebar} sidebarView={sidebarView} />
          <div className="page-content">
            <Header toggleSidebar={toggleSidebar} />
            <main className={`flex-grow p-6 `}>{children}</main>
            {/* <main className="flex-grow p-6 ">{children}</main> */}
            <Footer />
          </div>
        </div>
      </>
    </GlogbalContext>
  );
};

export default LayoutComponent;

const MainBody = React.memo(({ children }) => {
  return <main className="main-content w-full p-3">{children}</main>;
});

MainBody.displayName = "MainBody";
