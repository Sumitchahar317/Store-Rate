import React from "react";
import { Users, Store, Star, Plus, Search, X } from "lucide-react";

export default function AdminView({
  tab,
  setTab,
  stats,
  data,
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  showForm,
  setShowForm,
  formData,
  setFormData,
  msg,
  setMsg,
  loading,
  onSubmit,
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">Manage stores, users, and view platform metrics</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(showForm === "store" ? null : "store")}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Plus size={16} /> Add Store
          </button>
          <button
            onClick={() => {
              setFormData({ role: "STORE_OWNER" });
              setShowForm(showForm === "user" ? null : "user");
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <Plus size={16} /> Add User
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Users", val: stats.totalUsers, icon: Users, color: "text-blue-600 bg-blue-50" },
          { label: "Total Stores", val: stats.totalStores, icon: Store, color: "text-emerald-600 bg-emerald-50" },
          { label: "Total Ratings", val: stats.totalRatings, icon: Star, color: "text-amber-600 bg-amber-50" },
        ].map((c) => (
          <div key={c.label} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-xs">
            <div className={`p-3 rounded-lg ${c.color}`}><c.icon size={20} /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{c.label}</p>
              <h3 className="text-xl font-bold text-slate-800">{c.val ?? 0}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Message alert */}
      {msg && (
        <div className="mb-4 p-3 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg flex justify-between items-center">
          <span>{msg}</span>
          <button onClick={() => setMsg("")} className="cursor-pointer"><X size={16} /></button>
        </div>
      )}

      {/* Collapsible Form */}
      {showForm && (
        <form onSubmit={onSubmit} className="mb-6 p-5 bg-white border border-blue-200 rounded-xl shadow-xs space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800 text-sm">
              {showForm === "store" ? "Create New Store" : "Create New User"}
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(null)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <input
              required
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            {showForm === "user" && (
              <>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={formData.password || ""}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <select
                  value={formData.role || "STORE_OWNER"}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500"
                >
                  <option value="USER">USER</option>
                  <option value="STORE_OWNER">STORE_OWNER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </>
            )}
            <input
              required
              placeholder="Address"
              value={formData.address || ""}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm sm:col-span-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(null)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs cursor-pointer"
            >
              Save {showForm === "store" ? "Store" : "User"}
            </button>
          </div>
        </form>
      )}

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        {/* Controls */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {["stores", "users"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setSearch(""); }}
                className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg capitalize transition cursor-pointer ${
                  tab === t ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {tab === "users" && (
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-slate-50 focus:outline-none"
              >
                <option value="">All Roles</option>
                <option value="ADMIN">ADMIN</option>
                <option value="STORE_OWNER">STORE_OWNER</option>
                <option value="USER">USER</option>
              </select>
            )}
            <div className="relative">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                placeholder={`Search ${tab}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs w-48 sm:w-60 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">{tab === "stores" ? "Rating" : "Role"}</th>
                <th className="py-3 px-4">Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-8 text-slate-400">Loading {tab}...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-slate-400">No records found</td></tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-medium text-slate-800">{item.name}</td>
                    <td className="py-3 px-4 text-slate-600 text-xs">{item.email}</td>
                    <td className="py-3 px-4">
                      {tab === "stores" ? (
                        <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-semibold">
                          <Star size={13} className="fill-amber-400 text-amber-400" />
                          {item.rating ? Number(item.rating).toFixed(1) : "N/A"} ({item.totalRatings || 0})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-slate-100 text-slate-700">
                          {item.role}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs max-w-xs truncate">{item.address}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
