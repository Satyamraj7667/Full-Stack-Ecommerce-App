import './App.css';
import Home from './Components/Home';
import ProductDetails from './Components/ProductDetails';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Profile from './Components/Profile';
import Orders from './Components/Orders';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import PrivateRoutes from './Components/PrivateRoutes';
import Cart from './Components/Cart';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import Address from './Components/Address';
import AddressSelect from './Components/AddressSelect';
import AddProduct from './Components/AddProduct';
import PaymentSuccess from './Components/PaymentSuccess';

function App() {
  return (
    <Provider store={store}>
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} exact></Route>
      <Route path="/productdetails/:id" element={<ProductDetails/>} exact></Route>
      <Route path="/register" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/user" element={<PrivateRoutes/>}>
        <Route path="profile" element={<Profile/>}></Route>
        <Route path="orders" element={<Orders/>}></Route>
        <Route path="cart" element={<Cart/>}></Route>
        <Route path="address" element={<Address/>}></Route>
        <Route path="addressSelect" element={<AddressSelect/>}></Route>
        <Route path="addProduct" element={<AddProduct/>}></Route>
        <Route path ="paymentSuccess" element={<PaymentSuccess/>}></Route>
      </Route>

    </Routes>
    </Router>
    </Provider>
  );
}

export default App;
