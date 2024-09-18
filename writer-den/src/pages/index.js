import ProjectsList from "@/components/list-projects";
import Navbar from "@/components/navbar";
import ProjectForm from "@/components/project-form";
import RecentProjects from "@/components/recent-projects";

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <RecentProjects />
      <ProjectsList />
      <ProjectForm />
    </div>
  );
}
