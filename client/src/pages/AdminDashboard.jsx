import { useEffect, useState } from "react";
import { apiRequest } from "../services/Api";
import AdminView from "../component/AdminView"


export default function AdminDashboard() {

  const [tab , setTab] = useState("stores")
  const [stats, setStats] = useState({
     totalUsers: 0, totalStores: 0, totalRatings: 0 
    });

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [showForm, setShowForm] = useState(null) 
  const [formData, setFormData] = useState({});
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  // just fetching basic stats on load
  const fetchStats = async()=>{
    try{
      const res = await apiRequest("/admin/dashboard");
      setStats(res);
    }catch(err){
      // console.log("Failed to load stats:", err);
    }
  }

  useEffect(()=>{
    fetchStats()
    // maybe add something else here later?
  },[])

  const fetchData = async () => {
    setLoading(true);
    try {
      // checking which tab we are currently viewing
      if (tab === "stores") {
        const res = await apiRequest(`/admin/stores?search=${encodeURIComponent(search)}`);
        // just making sure it's an array
        if (Array.isArray(res)) {
          setData(res);
        } else {
          setData([]);
        }
      } else {
        const res = await apiRequest(
          `/admin/users?search=${encodeURIComponent(search)}&role=${roleFilter}`
        );
        if (Array.isArray(res)) {
          setData(res);
        } else {
          setData([]);
        }
      }
    } catch (err) {
      setMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Debouncing search so we don't spam the API backend
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);
    
    return () => clearTimeout(timer)
  }, [tab, search, roleFilter])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    
    try {
      if (showForm === "store") {
        await apiRequest("/admin/store", {
          method: "POST",
          body: JSON.stringify({
            ...formData,
            ownerId: formData.ownerId ? String(formData.ownerId).trim() : undefined,
          }),
        })
      } else {
        // assume it's user creation for now
        await apiRequest("/admin/users", {
          method: "POST",
          body: JSON.stringify(formData)
        })
      }
      
      setShowForm(null)
      setFormData({})
      
      // refresh everything after mutating
      fetchStats()
      fetchData()
    } catch (err) {
      setMsg(err.message)
    }
  };

  return (
    <AdminView
      tab={tab}
      setTab={setTab}
      stats={stats}
      data={data}
      search={search}
      setSearch={setSearch}
      roleFilter={roleFilter}
      setRoleFilter={setRoleFilter}
      showForm={showForm}
      setShowForm={setShowForm}
      formData={formData}
      setFormData={setFormData}
      msg={msg}
      setMsg={setMsg}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
}
