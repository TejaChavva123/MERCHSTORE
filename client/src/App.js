import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';
import Productscreen from './screens/Productscreen'
import { Routes,Route} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Cartscreen from './screens/Cartscreen';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" exact element = {<Homescreen />} />
          <Route path="/product/:id" element = {<Productscreen />} />
          <Route path="/cart/:id?" element ={<Cartscreen />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
