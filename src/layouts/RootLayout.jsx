/* eslint-disable react/prop-types */

// import BottomNav from '../components/BottomNav';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/shared/Footer';
import Nav from '../components/Navbar';
import ChatSupportButton from '../components/ChatSupportButton';
const RootLayout = () => {
  return (
    <div>
          <Nav />
          <div className="md:max-w-[800px] mx-auto bg-white">
     <Outlet/>
          </div>
          <ChatSupportButton/>
      <Footer/>
    </div>
  )
}

export default RootLayout