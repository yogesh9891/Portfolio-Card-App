import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { emailLoginApi, googleLoginApi, loginApi } from '../services/users.service';

export const storeAuthData = async (value:any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@auth_key', jsonValue);
    return jsonValue;
  } catch (e) {
    console.error('Auth Error', e);
  }
};

export const getAuth = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@auth_key');

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Auth Error', e);
    return null;
  }
};

export const checkAuth = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@auth_key');
    return jsonValue != null ? true : false;
  } catch (e) {
    console.error('Auth Error', e);
  }
};

export const loginUser = async (formData:any) => {
  try {
    let {data: response} = await loginApi(formData);
    if (response) {
      console.log(response);
      let decodedToken:any = await jwtDecode(response.token);
      let authToken = {
        ...response.data,
        token: response.token,
        role: decodedToken.role,
        userId: decodedToken.userId,
        user: decodedToken.user,
      };
      await storeAuthData(authToken);
      return authToken;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const loginEmailUser = async (formData:any) => {
  try {
    let {data: response} = await emailLoginApi(formData);
    if (response) {
      console.log(response);
      let decodedToken:any = await jwtDecode(response.token);
      let authToken = {
        ...response.data,
        token: response.token,
        role: decodedToken.role,
        userId: decodedToken.userId,
        user: decodedToken.user,
      };
      await storeAuthData(authToken);
      return authToken;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const emailloginUser = async (formData:any) => {
  try {
    let {data: response} = await googleLoginApi(formData);
    if (response) {
      console.log(response);
      let decodedToken:any = await jwtDecode(response.token);
      let authToken = {
        ...response.data,
        token: response.token,
        role: decodedToken.role,
        userId: decodedToken.userId,
        user: decodedToken.user,
      };
      await storeAuthData(authToken);
      return authToken;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('@auth_key');
  
  return true;
};
