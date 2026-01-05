import { Link, useNavigate } from "react-router-dom";
import { PlusIcon, LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
import toast from "react-hot-toast";
import { getUserFromToken } from "../lib/auth";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();

  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const toggleTheme = () => {
    setTheme(theme === "forest" ? "winter" : "forest");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-7xl px-4 py-4">

        {/* MAIN FLEX */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          {/* LEFT */}
          <div className="text-center md:text-left">
            <span className="text-xl font-semibold tracking-tight">
              ThinkBoard
            </span>
          </div>

          {/* CENTER (USER TITLE) */}
          {user && (
            <div className="text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                {user.name}
                <span className="text-primary">’s</span>{" "}
                <span className="font-light">Thoughts</span>
              </h2>
            </div>
          )}

          {/* RIGHT ACTIONS */}
          <div className="flex justify-center md:justify-end gap-3 flex-wrap">

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <MoonIcon className="size-5" />
              ) : (
                <SunIcon className="size-5" />
              )}
            </button>

            {/* NEW NOTE */}
            <Link
              to="/create"
              className="btn btn-primary btn-sm sm:btn-md flex items-center gap-2"
            >
              <PlusIcon className="size-4 sm:size-5" />
              New Note
            </Link>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="btn btn-error btn-outline btn-sm sm:btn-md"
            >
              Logout
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
