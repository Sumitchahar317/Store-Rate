import React from "react";
import { AlertCircle, CheckCircle2, MapPin, Search, Star, Store } from "lucide-react";

const UserStoreListForm = ({
  stores = [],
  search,
  setSearch,
  loading,
  feedback,
  submittingId,
  handleRate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Explore Stores</h1>
          <p className="text-sm text-slate-500 mt-1">Discover registered stores and share your feedback</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by store name or address..."
            className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-xs"
          />
        </div>
      </div>

      {/* Alert Banners */}
      {feedback?.error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{feedback.error}</span>
        </div>
      )}
      {feedback?.success && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm flex items-center gap-2">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{feedback.success}</span>
        </div>
      )}

      {/* Stores Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading stores...</div>
      ) : stores.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-400">
          No stores found matching "{search}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Store size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg leading-snug">{s.name}</h3>
                  </div>

                  {/* Overall Store Rating Badge */}
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md font-bold text-xs shrink-0">
                    <Star size={13} fill="currentColor" />
                    <span>{s.overallRating ? Number(s.overallRating).toFixed(1) : "New"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-xs text-slate-500 mt-3">
                  <MapPin size={14} className="shrink-0 mt-0.5 text-slate-400" />
                  <span className="line-clamp-2">{s.address}</span>
                </div>
              </div>

              {/* User Rating Action */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {s.userSubmittedRating ? "Your Rating (Click to change)" : "Rate this Store"}
                  </span>
                  {s.userSubmittedRating && (
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {s.userSubmittedRating} / 5
                    </span>
                  )}
                </div>

                {/* 1-5 Interactive Star Buttons */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isSelected = (s.userSubmittedRating || 0) >= star;
                    return (
                      <button
                        key={star}
                        disabled={submittingId === s.id}
                        onClick={() => handleRate(s.id, star)}
                        className={`p-1.5 rounded-md transition-all cursor-pointer ${
                          isSelected
                            ? "text-amber-500 hover:text-amber-600"
                            : "text-slate-300 hover:text-amber-400"
                        } disabled:opacity-50`}
                        title={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      >
                        <Star size={24} fill={isSelected ? "currentColor" : "none"} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserStoreListForm;
