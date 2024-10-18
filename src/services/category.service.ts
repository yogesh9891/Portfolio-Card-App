import axios from "axios";
import { url } from "./url.service";
import { axiosApiInstance } from "../../App";

const serverUrl = url + "/cardLinkCategory";
const serverUrl2 = url + "/cardLink";

export const getCategoryApi = (query:string) => {
  return axiosApiInstance.get(`${serverUrl}/getCardLinkCategory?${query}`);
};


export const getLinkApi = (query:string) => {
    return axiosApiInstance.get(`${serverUrl2}/getCardLink?${query}`);
  };
  
