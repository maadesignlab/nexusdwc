import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Library from "../pages/Library";
import BookDetail from "../pages/BookDetail";
import Coworking from "../pages/Coworking";
import Purchases from "../pages/Purchases";
import Cart from "../pages/Cart";
import Payment from "../pages/Payment";
import Account from "../pages/Account";
import Unavailable from "../pages/Unavailable";
import PrivateRoute from "./PrivateRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/home" />} />

      {/* RUTAS PRIVADAS */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/library"
        element={
          <PrivateRoute>
            <Library />
          </PrivateRoute>
        }
      />

      <Route
        path="/library/:id"
        element={
          <PrivateRoute>
            <BookDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/coworking"
        element={
          <PrivateRoute>
            <Coworking />
          </PrivateRoute>
        }
      />

      <Route
        path="/purchases"
        element={
          <PrivateRoute>
            <Purchases />
          </PrivateRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        }
      />

      <Route
        path="/account"
        element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        }
      />

      <Route
        path="/unavailable"
        element={
          <PrivateRoute>
            <Unavailable />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default AppRouter;

