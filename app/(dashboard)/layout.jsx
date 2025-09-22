import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
    if(true){
        redirect("/login")
    }
  return (
    <>
        <Navbar />
        <main>
            {children}
        </main>
    </>
  )
}