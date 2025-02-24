import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthFetcher } from "../_customHooks/useButtonClickFetcher";
import LayoutComponent from "./LayoutComponent";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("jwtoken")?.value;
  if (!userCookie) {
    redirect("/login");
  }
  let data;
  let userDetails;
  try {
    data = await AuthFetcher("userAuthorization", userCookie);
    if (data?.statusCode === 401 || data?.code === 5) {
      return redirect("/login");
    }

    userDetails = {
      ...data.data,
      ...(data.data.userRole[0] === "Admin"
        ? { roles: ["Admin"] }
        : { roles: ["User"] })
    };
  } catch (error) {
    console.error("user Un-Authorized", error);
    return redirect("/login");
  }

  return <LayoutComponent userData={userDetails}>{children}</LayoutComponent>;
  // return <LayoutComponent>{children}</LayoutComponent>;
}
