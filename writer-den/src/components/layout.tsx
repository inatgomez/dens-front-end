import { cookies } from "next/headers";
import { inter } from "../assets/fonts/fonts";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar-2";
import { AppSidebar } from "./app-sidebar";
export async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      {/* <div
        className={`bg-slate-950 flex flex-col min-h-screen ${inter.className} antialiased`}
      > */}
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
      {/* </div> */}
    </SidebarProvider>
  );
}
