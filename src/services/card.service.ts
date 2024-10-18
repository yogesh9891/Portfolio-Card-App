import axios from 'axios';
import {axiosApiInstance} from '../../App';
import {url} from './url.service';
const serverUrl = url + '/card';


export const getUserCardApi = (query:string) => {
    return axiosApiInstance.get(serverUrl + `/getUserByCard?${query}`);
  };

  export const addCard = (formData:any) => {
    return axiosApiInstance.post(serverUrl + "/addCard", formData);
  };
  export const getUserCardByNoApi = (card:string) => {
    return axiosApiInstance.get(serverUrl + `/getBySlug/${card}`);
  };


  export const deleteCardByNoApi = (card:string) => {
    return axiosApiInstance.delete(serverUrl + `/deleteById/${card}`);
  };
export const updateUserCardApi = (id:string,formData:any) => {
    return axiosApiInstance.patch(serverUrl + `/updateUserCard/${id}`,formData);
  };
export const addNewCardApi = (id:string,formData:any) => {
    return axiosApiInstance.patch(serverUrl + `/addNewCard/${id}`,formData);
  };
export const userLinkActiveApi = (id:string,formData:any) => {

  console.log(serverUrl ,"serverUrlserverUrlserverUrlserverUrlserverUrlserverUrlserverUrlserverUrlserverUrlserverUrlserverUrl")
    return axiosApiInstance.patch(serverUrl + `/userLinkActive/${id}`,formData);
  };

  export const copyUserCardApi = (id:string,formData:any) => {
    return axiosApiInstance.patch(serverUrl + `/copyCard/${id}`,formData);
  };
  export const deleteCardLinkApi = (id:string,formData:any) => {
    return axiosApiInstance.patch(serverUrl + `/deleteCardLink/${id}`,formData);
  };