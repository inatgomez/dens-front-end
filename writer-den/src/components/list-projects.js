const projects = [
  {
    id: 1,
    name: "Alien alchemy",
    href: "#",
    imageSrc: "",
    imageAlt: "",
  },
  {
    id: 2,
    name: "The Cliff",
    href: "#",
    imageSrc: "",
    imageAlt: "",
  },
  {
    id: 3,
    name: "The road to mastery",
    href: "#",
    imageSrc: "",
    imageAlt: "",
  },
  {
    id: 4,
    name: "Personal brand",
    href: "#",
    imageSrc: "",
    imageAlt: "",
  },
  {
    id: 5,
    name: "SWE Projects",
    href: "#",
    imageSrc: "",
    imageAlt: "",
  },
  {
    id: 6,
    name: "Running out of names",
    href: "#",
    imageSrc: "",
    imageAlt: "",
  },
  // More projects...
];

export default function ProjectsList() {
  return (
    <div className='bg-neutral-10'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-neutral-98 font-bold'>Fiction</h2>

        <div className='mt-4 grid grid-cols-6 gap-x-6 gap-y-10 xl:gap-x-8'>
          {projects.map((project) => (
            <a key={project.id} href={project.href} className='group'>
              <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-neutral-40 xl:aspect-h-8 xl:aspect-w-7'>
                <img
                  alt={project.imageAlt}
                  src={project.imageSrc}
                  className='h-full w-full object-cover object-center group-hover:opacity-75'
                />
              </div>
              <h2 className='mt-4 text-sm text-neutral-98'>{project.name}</h2>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
