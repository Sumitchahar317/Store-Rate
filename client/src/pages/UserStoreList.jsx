import { useCallback, useEffect, useState } from 'react'
import {apiRequest} from "../services/Api";
import UserStoreListForm from "../component/UserStoreListForm"

const UserStoreList = () => {

  const [store, setStore] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState({error: "", success: ""})
  const [sumbittingId, setSumbittingId] = useState(null)

  const fetchStores = useCallback(async () => {
    try{
      const data = await apiRequest(`/user/stores?search=${encodeURIComponent(search)}`)
      setStore(Array.isArray(data) ? data : [])
    }catch(err){
      setFeedback({error : err.message, success : ""})
    }finally{
      setLoading(false)
    }
  },[search])
  

  useEffect(()=>{
    fetchStores()
  }, [fetchStores])

  const handleRate = async (storeId, score)=>{
    setSumbittingId(storeId)
    setFeedback({ error: "", success: "" })
    try{
      await apiRequest("/user/rate", {
        method : "POST",
        body : JSON.stringify({storeId, score})
      })

      setFeedback({error : "", success : "Rating submitted successfully"})
      fetchStores()
      setTimeout(()=> setFeedback({error : "", success : ""}), 3000)
    }catch(err){
      setFeedback({error : err.message, success : ""})
    }finally{
      setSumbittingId(null);
    }
  }

  return (
    <UserStoreListForm 
    stores={store}
    search={search}
    setSearch={setSearch}
    loading={loading}
    feedback={feedback}
    submittingId={sumbittingId}
    handleRate={handleRate}
    />
  )
}

export default UserStoreList

