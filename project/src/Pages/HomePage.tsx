import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Post } from '../components/Post';
import { Profile } from '../components/Profile';
// import { CreatePost } from '../components/CreatePost';
import Billboard from '../components/Billboard';
import AddPost from '../components/AddPost';
import Music from '../components/Music';
import HomeModal from "../components/HomeModal";
import axios from 'axios';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts/fetch_posts') // Replace with your actual backend URL
      .then((res) => {
        setPosts(res.data); // No need for res.json() here
        console.log("Fetched posts with user data:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch posts:', err);
        setLoading(false);
      });
  }, []);

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