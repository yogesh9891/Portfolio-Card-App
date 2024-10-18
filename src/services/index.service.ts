import axios from "axios";
import { url } from "./url.service";
import { axiosApiInstance } from "../../App";


export const getContactFromImageApi = (dateq:any) => {
  return axiosApiInstance.post(`${url}/getDataFromImage`,dateq);
};



  
