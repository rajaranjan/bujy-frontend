import isEmail from "sane-email-validation";
import validUrl from "valid-url";


//API Url
export const API_URL = "http://165.227.240.215:9001/v1/"

//User details
export const User = {

  getAccessToken() {
    return localStorage.getItem('access_token');
  },

  setAccessToken(token) {
    localStorage.setItem('access_token', token);
  },

  setName(name) {
    localStorage.setItem('name', name);
  },

  getName() {
    localStorage.getItem('name');
  },

  setEmail(email) {
    localStorage.setItem('email', email);
  },

  getEmail() {
    localStorage.getItem('email');
  },

  clear() {
    localStorage.clear();
  },

  // removeUserId() {
  //   localStorage.removeItem('id');
  // },

  removeAccessToken() {
    localStorage.removeItem('access_token');
  },

  isLoggedIn(){
    return localStorage.getItem('access_token') ? true : false;
  }
}
//Data validation Util goes in here.
export const Validate = {

    url(url) {
      return validUrl.isUri(url);
    },
  
    text(text) {
      if (!text || text.trim() === '') {
        return false;
      }
  
      return true;
    },
  
    email(email) {
      if (this.text(email))
        return isEmail(email);
      return false;
    },
  
    compare(text1, text2) {
      return text1 === text2;
    },
  }
  