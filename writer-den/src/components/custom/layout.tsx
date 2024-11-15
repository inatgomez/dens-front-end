// import { cookies } from "next/headers";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className='bg-background-secondary md:rounded-sm'>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
