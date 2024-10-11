import { inter } from "../assets/fonts/fonts";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased flex flex-col h-screen`}>
        <Navbar />
        <div className='grid grid-cols-5 w-screen'>
          <SideBar />
          <div className='flex flex-col col-span-4'>{children}</div>
        </div>
      </body>
    </html>
  );
}
