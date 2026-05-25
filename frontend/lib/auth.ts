import API from '@/lib/api'

 export const getCurrentUser=async()=>{
  try {
      const res = await API.get("/api/v1/users/me");
      return res.data.data;
    
  } catch (error) {
    return null
  }
}