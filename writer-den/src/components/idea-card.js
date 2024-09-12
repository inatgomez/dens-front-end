export default function Ideacard() {
  return (
    <div className='flex min-h-full flex-1 flex-col justifiy-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900'>
          New Idea
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form action='#' method='POST' className='space-y-6'>
          <div>
            <label
              htmlFor='title'
              className='block text-lg font-medium leading-6 text-white-900'
            >
              Title
            </label>
            <div className='mt-2'>
              <input
                id='title'
                name='title'
                type='text'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:eading-6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='idea'
              className='block text-lg font-medium leading-6 text-white-900'
            >
              What's your idea?
            </label>
            <div className='mt-2'>
              <input
                id='idea'
                name='idea'
                type='text'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:eading-6'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Save idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
