

import { Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import AuthLayout from './layouts/AuthLayout';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import AuthOnlyRoute from './components/shared/AuthOnlyRoute';
import ProtectedRoute from './components/shared/ProtectedRoute';
import OTPVerification from './pages/OTPVerification';
import SendMoney from './pages/SendMoney';
import PaymentHubPage from './pages/PaymentHub';
import MarketplacePage from './pages/MarketPlace';
import ExpressDeliveryPage from './pages/ExpressDeliveryPage';

const App = () => {

  return (
    <div className="h-screen flex flex-col bg-gray-50">
    <Routes>
      {/* <Route path='/' element={<LandingPage/>} />
      <Route path="/" element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/" element={<RootLayout/>}>
      <Route path="" element={<Home/>} />
      <Route path='set-exchange-rate' element={<SetExchangeRate/>} />
      </Route> */}

         {/* Auth-only routes */}
         {/* <Route element={<AuthOnlyRoute />}> */}
          <Route path="/" element={<LandingPage />} />
            <Route path="/verification" element={<OTPVerification />} />
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        {/* </Route> */}

        {/* Protected routes */}
        {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<RootLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/home/send-money" element={<SendMoney />} />
            <Route path="/home/hub" element={<PaymentHubPage />} />
            <Route path="/home/marketplace" element={<MarketplacePage />} />
            <Route path="/home/express-delivery" element={<ExpressDeliveryPage />} />
          </Route>
        {/* </Route> */}
    </Routes>
    <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
