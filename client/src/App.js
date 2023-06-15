import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';
import Productscreen from './screens/Productscreen'
import { Routes,Route} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Cartscreen from './screens/Cartscreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import Profilescreen from './screens/Profilescreen';
import Shippingscreen from './screens/Shippingscreen';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" exact element = {<Homescreen />} />
          <Route path="/product/:id" element = {<Productscreen />} />
          <Route path="/cart/:id?" element ={<Cartscreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path='/register' element={<RegistrationScreen />} />
          <Route path='/login?/profile' element={<Profilescreen />} />
          <Route path='/login?/shipping' element = {<Shippingscreen />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
