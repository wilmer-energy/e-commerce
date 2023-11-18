import "./App.css";
import "./ProductInf.css";
import "./styles/home.css";
import "./styles/Login.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  LogIn,
  ProductDetails,
  Purchases,
  ProtectedRoutes,
} from "./pages/index";
import {
  Products,
} from "./pages/index.jsx";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {

  return (
    <HashRouter>
      <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/products/:category_id" element={<Products />} />
      </Routes>
      <Footer/>
      </>
    </HashRouter>
  );
}

export default App;
