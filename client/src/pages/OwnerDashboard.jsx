import { useEffect, useState } from "react";
import { apiRequest } from "../services/Api";
import OwnerView from "../component/OwnerView";

const OwnerDashboard = () => {
  const [data, setData] = useState({
    storeName: "",
    storeAddress: "",
    averageRating: null,
    totalReviews: 0,
    ratings: []
  })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async()=>{
    try{
      setLoading(true)
      const res = await apiRequest("/owner/dashboard")
      setData(res);
    }catch(err){
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, []);

  return <OwnerView 
      data={data} 
      loading={loading} 
      error={error} 
    />;
};

export default OwnerDashboard
