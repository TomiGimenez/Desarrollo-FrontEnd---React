
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import Callback from "./Callback";
import UserProfile from "./UserProfile";
import NavigationBar from "./NavigationBar";
import ProtectedRoute from "./ProtectedRoute";
import Posts from "./Posts";

const AppRoutes = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route index element={<UserProfile />} />
        </Route>
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
