import { Routes, Route, BrowserRouter } from "react-router-dom";
import Order from "../components/Order/Order";
import SignIn from "../components/SignUp";
import NavBar from "../components/NavBar";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
};
