import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { isAuthenticated } from "./lib/auth";

const App = () => {
  const loggedIn = isAuthenticated();

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/login"
            element={
              loggedIn ? <Navigate to="/home" replace /> : <LoginPage />
            }
          />

          <Route
            path="/signup"
            element={
              loggedIn ? <Navigate to="/home" replace /> : <SignupPage />
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/note/:id"
            element={
              <ProtectedRoute>
                <NoteDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/home" : "/login"} replace />}
          />
        </Routes>
      </div>

      {/* GLOBAL FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
