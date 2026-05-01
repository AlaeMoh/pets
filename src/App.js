import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home';
import Pets from './pages/pets';
import Footer from './components/footer';
import Profile from './pages/profile';
import Health from './pages/heath';
import Login from './pages/login';
import Contact from './pages/contact';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Breeds from './pages/breeds';
import AdoptionProcess from './pages/adoption';
import Aboutus from "./pages/aboutus"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);



function App() {

  return (

          <BrowserRouter>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allPets" element={<Pets />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/health" element={<Health />} />
          <Route path="/login" element={<Login />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/adoption" element={<AdoptionProcess />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route   path="/contactus"  element={
                    <Elements stripe={stripePromise}>
                      <Contact />
                    </Elements>
                  } 
                />
         </Routes>

        <Footer />
      </BrowserRouter>

  );
}

export default App;
