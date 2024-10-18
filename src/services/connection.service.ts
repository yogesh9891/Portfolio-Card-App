import axios from 'axios';
import { axiosApiInstance } from '../../App';
import { url } from './url.service';
const serverUrl = url + '/connection';


export const getUserCoonectionApi = (query: string) => {
  return axiosApiInstance.get(serverUrl + `/getUserConnection?${query}`);
};
export const getInsightsConnectionApi = (id: string, query: string) => {
  console.log(`/getInsightsConnection/${id}?${query}`)
  return axiosApiInstance.get(serverUrl + `/getInsightsConnection/${id}?${query}`);

};

export const getConnectionDownloadApi = (id: string, query: string) => {
  return axiosApiInstance.get(serverUrl + `/downloadExcelFile/${id}?${query}`);

};

export const getConnectionDeleteApi = (id: string) => {
  return axiosApiInstance.delete(serverUrl + `/deleteById/${id}`);

};

export const addConnectionApi = (card: string, formData: any) => {  
  return axiosApiInstance.post(serverUrl + `/addConnection/${card}`, formData);
};
export const addConnectionBycCardApi = (card: string, formData: any) => {
  return axiosApiInstance.post(serverUrl + `/addConnectionBycCard/${card}`, formData);
};
export const updateUserCardApi = (id: string, formData: any) => {
  return axiosApiInstance.patch(serverUrl + `/updateCard/${id}`, formData);
};

export const copyUserCardApi = (id: string, formData: any) => {
  return axiosApiInstance.patch(serverUrl + `/copyCard/${id}`, formData);
};

export const addaddLinkApi = (cardId: string, forData: any) => {
  return axiosApiInstance.post(serverUrl + `/addLink/${cardId}`, forData);
};


