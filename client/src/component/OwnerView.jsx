import React from "react";
import { AlertCircle, MapPin, Star, Store, Users } from "lucide-react";

const OwnerView = ({ data, loading, error }) => {
  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-12 text-center text-slate-400">Loading store dashboard...</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2.5">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Store Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Store size={26} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{data.storeName}</h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <MapPin size={14} className="text-slate-400" />
                <span>{data.storeAddress}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-xl text-amber-700 font-bold text-sm">
              <Star size={18} className="fill-amber-400 text-amber-400" />
              <span>{data.averageRating ? Number(data.averageRating).toFixed(1) : "N/A"}</span>
              <span className="text-slate-400 text-xs font-normal">/ 5.0</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
            <div className="p-2.5 bg-white text-blue-600 rounded-lg shadow-xs border border-slate-100">
              <Star size={20} className="fill-amber-400 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Average Rating</p>
              <h3 className="text-xl font-bold text-slate-800 mt-0.5">
                {data.averageRating ? Number(data.averageRating).toFixed(2) : "No ratings yet"}
              </h3>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
            <div className="p-2.5 bg-white text-indigo-600 rounded-lg shadow-xs border border-slate-100">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Customer Reviews</p>
              <h3 className="text-xl font-bold text-slate-800 mt-0.5">{data.totalReviews || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Customer Ratings & Reviews</h2>
          <p className="text-xs text-slate-500 mt-0.5">List of verified users who reviewed your store</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 text-slate-500 text-xs uppercase border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Score</th>
                <th className="py-3 px-6 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!data.ratings || data.ratings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-slate-400">
                    No customers have submitted a review yet.
                  </td>
                </tr>
              ) : (
                data.ratings.map((r) => (
                  <tr key={r.ratingId} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                        {r.user?.name?.charAt(0) || "U"}
                      </div>
                      <span>{r.user?.name}</span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 text-xs font-mono">{r.user?.email}</td>
                    <td className="py-3.5 px-6">
                      <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-md font-bold text-xs border border-amber-200/70">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span>{r.score} / 5</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-right text-slate-400 text-xs">
                      {new Date(r.updatedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerView;
