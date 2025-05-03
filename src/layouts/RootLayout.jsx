/* eslint-disable react/prop-types */

// import BottomNav from '../components/BottomNav';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/shared/Footer';
import Nav from '../components/Navbar';
import ChatSupportButton from '../components/ChatSupportButton';
import Refer from '../components/Refer';
import { useAuth } from '../lib/AuthContext';
const RootLayout = () => {
  const { user } = useAuth();
  return (
    <div>
          <Nav />
          <div className="md:max-w-[800px] mx-auto bg-white">
     <Outlet/>
          </div>
          <ChatSupportButton/>
        {user && <Refer/>}
      <Footer/>
    </div>
  )
}

export default RootLayout