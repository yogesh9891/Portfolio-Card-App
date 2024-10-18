import axios from "axios";
import { url } from "./url.service";
import { axiosApiInstance } from "../../App";

const serverUrl = url + "/verification";

export const addVerfication = (id:string,formData:any) => {
  return axiosApiInstance.post(`${serverUrl}/addVerification/${id}`,formData);
};



  
