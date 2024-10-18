import axios from 'axios';
import {axiosApiInstance} from '../../App';
import {url} from './url.service';

const serverUrl = url + '/users';

export const loginApi = (formData:any) => {
  console.log(serverUrl + '/userLogin', formData);
  return axios.post(serverUrl + '/userLogin', formData);
};

export const googleLoginApi = (formData:any) => {
  console.log(serverUrl + '/userLogin', formData);
  return axios.post(serverUrl + '/googleLogin', formData);
};


export const emailLoginApi = (formData:any) => {
  console.log(serverUrl + '/userLogin', formData);
  return axios.post(serverUrl + '/userEmailLogin', formData);
};
export const sendOtpApi = (formData:any) => {

  console.log(serverUrl + '/send-otp',"gdhghf")
  return axios.post(serverUrl + '/send-otp', formData);
};

export const verifyOtpApi = (formData:any) => {
  return axios.post(serverUrl + '/verify-otp', formData);
};
export const sendOtpEmailApi = (formData:any) => {

  console.log(serverUrl + '/send-otp',"gdhghf")
  return axios.post(serverUrl + '/send-otp-email', formData);
};

export const verifyEmailOtpApi = (formData:any) => {
  return axios.post(serverUrl + '/verify-otp-email', formData);
};

export const userUpdateApi = (id:string, formData:any) => {
  return axios.patch(serverUrl + `/updateById/${id}`, formData);
};

export const saveTokenToDatabase =  (token:string) => {
  return  axiosApiInstance.post(`${serverUrl}/registerFcmToken`, { token });

};
export const getuserbyIdApi = (id:string) => {
  return axios.get(serverUrl + `/getUserById/${id}`);
};
export const getdeleteUserApi = (id:string) => {
  return axios.delete(serverUrl + `/deleteById/${id}`);
};
export const getQrCodeApi = (query:string) => {
  return axios.get(serverUrl + `/downloadQr?${query}`);
};


