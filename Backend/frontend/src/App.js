import './App.css';
import About from './Screens/About';
import Homepage from './Screens/Homepage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import { CartProvider } from './Components/ContextReducer';
import MyOrder from './Screens/MyOrder';


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/MyOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
