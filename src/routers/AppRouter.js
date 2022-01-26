import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Order from "../components/Order/Order";
import Login from "../components/Login";
import NavBar from "../components/NavBar";
import Search from "../components/Search/Search";
import Users from "../components/User/Users";
import Items from "../components/Item/Items";
import Dashboard from "../components/Dashboard/Dashboard";
import CommissionReport from "../components/Reports/CommissionReport";
import ProtectedRoutes from "./ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";
import { StyleMessage } from "../components/StyleMessage";
import { Loading } from "../components/Loading";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      dispatch(login({ ...JSON.parse(userLocal) }));
    }
  }, []);

  /*if (checking) {
    return <h1>Espere...</h1>;
  }*/

  return (
    <BrowserRouter>
      {isLoggedIn && <NavBar />}
      <Routes>
        <Route element={<ProtectedRoutes isAuth={!!localStorage.getItem("user") || isLoggedIn} />}>
          <Route path="/order" element={<Order />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/search" element={<Search />} />
          <Route path="/item" element={<Items />} />
          <Route path="/user" element={<Users />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/commission-report" element={<CommissionReport />} />

        </Route>

        <Route path="/" element={!isLoggedIn ? <Login /> : <Dashboard />} />
      </Routes>

      <StyleMessage />
      <Loading />

    </BrowserRouter>
  );
};
