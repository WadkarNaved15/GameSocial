import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Home from './Pages/Home';
// import UploadPage from './Pages/UploadPage';
// import ExplorePage from './Pages/ExplorePage';
import Profile from './Pages/Profile';
import Auth from './Pages/Auth';
// import ModelTower from "./components/ModelTower";
// import GamePage from './Pages/GamePage';
// import Navbar from './components/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { EditProfilePage } from './Pages/EditProfile';


function App() {
  return (
    <GoogleOAuthProvider clientId="970893892840-8ecshtmle4kip6ps0bl7vbkg3nogl5od.apps.googleusercontent.com">
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/modeltower" element={<ModelTower />} /> */}
        {/* <Route path="/upload" element={<UploadPage />} />
        <Route path="/explore" element={<ExplorePage />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        {/* <Route path="/game/:gameId" element={<GamePage />} /> */}
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
