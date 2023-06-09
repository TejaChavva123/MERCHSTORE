import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';
import Productscreen from './screens/Productscreen'
import { Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" exact element = {<Homescreen />} />
          <Route path="/product/:id" element = {<Productscreen />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
