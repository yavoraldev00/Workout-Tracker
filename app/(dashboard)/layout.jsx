import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

export default async function DashboardLayout({ children }) {

    // if(true){
    //     redirect("/login")
    // }
    
    // 1. Read cookies set by your /api/set-session route
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const refresh_token = cookieStore.get("refresh_token")?.value;

  if (!access_token) {
    redirect("/login");
  }

  // 2. Create a Supabase client with those tokens
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    }
  );

  // 3. Get the user/session
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(access_token);

  if (error || !user) {
    redirect("/login");
  }

  // 4. Access user metadata
  const displayName = user.user_metadata?.display_name ?? "Anonymous";
  return (
    <>
        <Navbar />
        <main>
          <div>WORKKKK PLEASE {displayName}</div>
            {children}
        </main>
    </>
  )
}