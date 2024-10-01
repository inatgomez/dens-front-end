import IdeaForm from "@/components/idea-form";
import ProjectsList from "@/components/list-projects";
import Navbar from "@/components/navbar";
import RecentProjects from "@/components/recent-projects";
import SideBar from "@/components/sidebar";

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='grid grid-cols-5 w-screen'>
        <SideBar />
        <div className='flex flex-col col-span-4'>
          <RecentProjects />
          <ProjectsList />
        </div>
      </div>
    </div>
  );
}
