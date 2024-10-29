import { inter } from "../assets/fonts/fonts";
import SideBar from "@/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`bg-primary-10 flex flex-col min-h-screen ${inter.className} antialiased`}
    >
      <div className='grid grid-cols-5 w-screen'>
        <SideBar />
        <main className='bg-neutral-10 flex flex-col col-span-4'>
          {children}
        </main>
      </div>
    </div>
  );
}
