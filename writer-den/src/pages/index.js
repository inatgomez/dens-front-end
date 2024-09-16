import RecentProjects from "@/components/recent-projects";

export default function Home() {
  return (
    <div className='mt-4 mx-auto flex flex-col justify-around'>
      <h1 className='font-bold text-center text-neutral-10 text-2xl'>
        Writer's Den
      </h1>
      <RecentProjects />
    </div>
  );
}
