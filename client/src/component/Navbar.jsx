import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { KeyRound, LogOut, Store, UserCheck } from "lucide-react";

const getBadgeStyle = (role) => {
  switch (role) {
    case "ADMIN":
      return "bg-purple-50 text-purple-700 border-purple-200 ring-1 ring-purple-500/10";
    case "STORE_OWNER":
      return "bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-500/10";
    default:
      return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/10";
  }
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-18">
          {/* Logo / Brand */}
          <Link
            to={user ? (user.role === "ADMIN" ? "/admin" : user.role === "STORE_OWNER" ? "/owner" : "/stores") : "/login"}
            className="flex items-center gap-3 text-slate-900 font-bold text-xl tracking-tight group"
          >
            <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Store size={22} />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              StoreRate
            </span>
          </Link>

          {/* User Actions */}
          {user ? (
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Role Badge */}
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full border ${getBadgeStyle(
                  user.role
                )}`}
              >
                {user.role}
              </span>

              {/* User Name */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-sm font-medium text-slate-700">
                <UserCheck size={16} className="text-slate-400" />
                <span className="truncate max-w-[180px]">{user.name || "User"}</span>
              </div>

              <div className="h-5 w-px bg-slate-200 mx-1" />

              {/* Change Password */}
              <Link
                to="/change-password"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 rounded-xl transition-all"
                title="Change Password"
              >
                <KeyRound size={15} className="text-slate-500" />
                <span>Password</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200/80 rounded-xl transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/25 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;