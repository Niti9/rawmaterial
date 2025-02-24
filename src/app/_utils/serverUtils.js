import { cookies } from "next/headers";

export const GetUserCookies = async () => {
  if (process.env.NODE_ENV === "production") {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("jwtoken")?.value;
  }
};
