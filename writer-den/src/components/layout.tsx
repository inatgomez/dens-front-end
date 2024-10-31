import { inter } from "../assets/fonts/fonts";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div
        className={`bg-slate-950 flex flex-col min-h-screen ${inter.className} antialiased`}
      >
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
