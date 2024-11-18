import Layout from "@/components/custom/layout";
import IdeaInputChat from "@/components/custom/idea-input-chat";

export default function App() {
  return (
    <Layout>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-slate-50 text-3xl my-2'>What's your next idea?</h1>
        <IdeaInputChat />
      </div>
    </Layout>
  );
}
