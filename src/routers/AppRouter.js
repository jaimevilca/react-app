import { Routes, Route, BrowserRouter } from "react-router-dom";
import Order from "../components/Order/Order";
import SignIn from "../components/SignUp";
import NavBar from "../components/NavBar";
import Search from "../components/Search/Search";
import Dashboard from "../components/Dashboard/Dashboard";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="order" element={<Order />} />
        <Route path="search" element={<Search />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
