import { useState } from 'react';
import { Header } from '../components/Header';
import { Post } from '../components/Post';
import { Profile } from '../components/Profile';
// import { CreatePost } from '../components/CreatePost';
import Billboard from '../components/Billboard';
import AddPost from '../components/AddPost';
import Music from '../components/Music';
import HomeModal from "../components/HomeModal";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const posts = [
    {
      type: 'game' as const,
      content: {
        url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: 'Space Explorer',
        requirements: {
          cpu: '2 Cores',
          memory: '1GB',
          storage: '2GB'
        }
      },
      author: {
        name: 'Sarah Developer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      timestamp: '2h ago',
      likes: 234,
      comments: 18
    },
    {
      type: 'image' as const,
      content: {
        url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: 'Game Development Setup'
      },
      author: {
        name: 'Mike Coder',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      timestamp: '4h ago',
      likes: 156,
      comments: 12
    }
  ];

  return (
    <div className="min-h-screen  bg-gray-100 dark:bg-gray-900">
      <Header />
      {isModalOpen && <HomeModal onClose={() => setIsModalOpen(false)} />}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">

        <div className="lg:col-span-2 sticky shadow-2xl top-24 h-60 dark:bg-gray-800 bg-white rounded-xl border  border-gray-200 dark:border-gray-700 hidden lg:block">
              <Profile />
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center min-h-[80vh]">
            <AddPost></AddPost>
            {posts.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
          <div className="lg:col-span-3 hidden lg:block">
            {/* <div className="sticky top-24 h-[500px] dark:bg-gray-800 bg-white rounded-xl border  border-gray-200 dark:border-gray-700"> */}
            <div className="sticky top-24 h-[500px] ">
              <Billboard />
              {/* <ModelTower></ModelTower> */}
            </div>
          </div>
          
        </div>
      </main>
      <Music></Music>
    </div>
  );
}

export default HomePage;