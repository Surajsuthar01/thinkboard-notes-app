import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password });

      toast.success("Account created. Please login.");

      // ✅ GO TO LOGIN PAGE
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div className="relative w-full max-w-md">

      {/* 🔵 TOP ACCENT LINE */}
      <div
        className="absolute -top-1 left-0 right-0 h-1 rounded-full
                   bg-gradient-to-r from-primary via-green-400 to-primary"
      />

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-2xl backdrop-blur-xl"
      >
        <div className="card-body gap-5">

          {/* TITLE */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-base-content/70 italic">
              Start writing thoughts that matter
            </p>
          </div>

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button className="btn btn-primary w-full text-lg">
            Sign Up
          </button>

          {/* SWITCH */}
          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
);

};

export default SignupPage;
