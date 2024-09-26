import ProjectsList from "@/components/list-projects";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
export default function ProjectPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='grid grid-cols-5 w-screen'>
        <SideBar className='col-span-1' />
        <div className='flex flex-col col-span-4'>
          <ProjectsList />
        </div>
      </div>
    </div>
  );
}
