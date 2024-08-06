import axios from "axios";

const url =
  process.env.REACT_APP_API_URL || "https://twitter-ieea.onrender.com/api";

  //T should be InputDatas
export const postData = async <T,T2,>(endpoint: string, data?: T): Promise<T2>=>{
  const res = await axios.post(`${url}${endpoint}`, data);
  if(res.status == 201) return res.data;
  throw new Error("Error Posting data");
}

//T should be Pagination interfaces
export const fetchData = async <T,>(endpoint: string, params?: T) =>{
  const res = await axios.get(`${url}${endpoint}`,{params})
  if(res.status == 200) return res.data;
  throw new Error("Error Fetching data");
}
export const deleteData = async (endpoint: string) => {
  const res = await axios.delete(`${url}${endpoint}`);
  if (res.status === 200)return res.data;
  throw new Error('Error deleting data');
};