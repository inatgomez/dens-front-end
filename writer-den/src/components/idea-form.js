import { useState, useEffect } from "react";
import { lusitana } from "@/assets/fonts/fonts";

export default function IdeaForm() {
  const [ideas, setIdeas] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addIdea = () => {
    const title = title.trim();
    const content = content.trim();
    if (title && content) {
      fetch("ideasrecording/ideas", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json)
        .then((data) => {
          setIdeas([...ideas, data]);
          setTitle("");
          setContent("");
        });
    }
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justifiy-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-98'>
          New Idea
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form action='#' method='POST' className='space-y-6'>
          <div>
            <label
              htmlFor='title'
              className={`${lusitana.className} block text-lg font-medium leading-6 text-neutral-98`}
            >
              Title
            </label>
            <div className='mt-2'>
              <input
                id='title'
                name='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='block w-full rounded-md border-0 py-1.5 text-neutral-90 shadow-sm ring-1 ring-inset ring-neutral-30 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-60 sm:text-sm sm:eading-6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='content'
              className='block text-lg font-medium leading-6 text-neutral-98'
            >
              What's your idea?
            </label>
            <div className='mt-2'>
              <input
                id='content'
                name='content'
                type='text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className='block w-full rounded-md border-0 py-1.5 text-neutral-90 shadow-sm ring-1 ring-inset ring-neutral-30 placeholder:text-neutral-40 focus:ring-2 focus:ring-inset focus:ring-primary-60 sm:text-sm sm:eading-6'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              onClick={addIdea}
              className='flex w-full justify-center rounded-md bg-primary-60 px-3 py-1.5 text-sm font-semibold leading-6 text-neutral-98 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-60'
            >
              Save idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
