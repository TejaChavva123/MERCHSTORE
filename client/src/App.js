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
import Paymentscreen from './screens/Paymentscreen';
import Placeorderscreen from './screens/Placeorderscreen';
import Orderscreen from './screens/Orderscreen'
import AdminUserListscreen from './screens/AdminUserListscreen';
import AdminUserUpdatescreen from './screens/AdminUserUpdatescreen';
import AdminProductListscreen from './screens/AdminProductListscreen';
import AdminProductUpdatescreen from './screens/AdminProductUpdatescreen';
import AdminProductCreatescreen from './screens/AdminProductCreatescreen';
import AdminOrderListscreen from './screens/AdminOrderListscreen';


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
          <Route path='/login?/payment' element={<Paymentscreen />} />
          <Route path='/placeorder' element={<Placeorderscreen />} />
          <Route path='/order/:id' element={<Orderscreen />} />
          <Route path='/admin/userlist' element={<AdminUserListscreen />} />
          <Route path='/admin/user/edit/:id' element={<AdminUserUpdatescreen />} />
          <Route path='/admin/productlist' element={<AdminProductListscreen />} />
          <Route path ='/admin/product/edit/:id' element={<AdminProductUpdatescreen />} />
          <Route path='/admin/product/create' element={<AdminProductCreatescreen />} />
          <Route path='/admin/orderlist' element={<AdminOrderListscreen />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
