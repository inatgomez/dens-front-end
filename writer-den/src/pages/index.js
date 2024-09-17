import Navbar from "@/components/navbar";
import RecentProjects from "@/components/recent-projects";

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <RecentProjects />
    </div>
  );
}
