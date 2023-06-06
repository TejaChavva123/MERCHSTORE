import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './screens/Homescreen';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='my-5'>
        <Homescreen />
      </main>
      <Footer />
    </div>
  );
}

export default App;
