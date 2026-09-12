import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Lock, Mail, MapPin, User } from "lucide-react";

const SignupForm = ({
  data,
  error = {},
  serverError,
  loading,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4 py-10 sm:py-14 bg-slate-50/80">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create an Account
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Sign up to view and rate registered stores
          </p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Full Name
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {data?.name?.length || 0}/60
              </span>
            </div>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input
                type="text"
                name="name"
                value={data?.name || ""}
                onChange={onChange}
                placeholder="20 to 60 characters"
                className={`w-full pl-11 pr-4 py-3 bg-slate-50/40 hover:bg-white border rounded-xl text-sm transition-all focus:outline-none focus:bg-white focus:ring-4 ${
                  error?.name
                    ? "border-red-400 focus:ring-red-100 focus:border-red-500"
                    : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
                }`}
              />
            </div>
            {error?.name && (
              <p className="text-xs text-red-600 mt-1.5 font-medium">{error.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={data?.email || ""}
                onChange={onChange}
                placeholder="name@example.com"
                className={`w-full pl-11 pr-4 py-3 bg-slate-50/40 hover:bg-white border rounded-xl text-sm transition-all focus:outline-none focus:bg-white focus:ring-4 ${
                  error?.email
                    ? "border-red-400 focus:ring-red-100 focus:border-red-500"
                    : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
                }`}
              />
            </div>
            {error?.email && (
              <p className="text-xs text-red-600 mt-1.5 font-medium">{error.email}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Address
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {data?.address?.length || 0}/400
              </span>
            </div>
            <div className="relative">
              <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                <MapPin size={18} />
              </div>
              <textarea
                name="address"
                rows="3"
                value={data?.address || ""}
                onChange={onChange}
                placeholder="Enter complete store or home address"
                className={`w-full pl-11 pr-4 py-3 bg-slate-50/40 hover:bg-white border rounded-xl text-sm transition-all focus:outline-none focus:bg-white focus:ring-4 resize-none ${
                  error?.address
                    ? "border-red-400 focus:ring-red-100 focus:border-red-500"
                    : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
                }`}
              />
            </div>
            {error?.address && (
              <p className="text-xs text-red-600 mt-1.5 font-medium">{error.address}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                value={data?.password || ""}
                onChange={onChange}
                placeholder="8-16 chars, 1 uppercase, 1 special char"
                className={`w-full pl-11 pr-4 py-3 bg-slate-50/40 hover:bg-white border rounded-xl text-sm transition-all focus:outline-none focus:bg-white focus:ring-4 ${
                  error?.password
                    ? "border-red-400 focus:ring-red-100 focus:border-red-500"
                    : "border-slate-300 focus:ring-blue-100 focus:border-blue-600"
                }`}
              />
            </div>
            {error?.password && (
              <p className="text-xs text-red-600 mt-1.5 font-medium">{error.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/25 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
