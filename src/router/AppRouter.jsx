import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Library from "../pages/Library";
import BookDetail from "../pages/BookDetail";
import Coworking from "../pages/Coworking";
import CoworkingDetail from "../pages/CoworkingDetail";
import Purchases from "../pages/Purchases";
import PrivateRoute from "./PrivateRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Home />} />

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
        path="/coworking/:id"
        element={
          <PrivateRoute>
            <CoworkingDetail />
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
    </Routes>
  );
}

export default AppRouter;

