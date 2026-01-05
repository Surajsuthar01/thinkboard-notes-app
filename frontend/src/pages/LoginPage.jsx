import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful");

      // ✅ GO TO HOME PAGE
      navigate("/home");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div className="relative w-full max-w-md">

      {/* 🔵 TOP ACCENT LINE */}
      <div className="absolute -top-1 left-0 right-0 h-1 rounded-full 
                      bg-gradient-to-r from-primary via-green-400 to-primary" />

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-2xl backdrop-blur-xl"
      >
        <div className="card-body gap-5">

          {/* TITLE */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-base-content/70 italic">
              ThinkBoard — where good notes become great ideas
            </p>
          </div>

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
          <button
            className="btn btn-primary w-full text-lg"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* SWITCH */}
          <p className="text-center text-sm mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="link link-primary font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
);
};

export default LoginPage;
