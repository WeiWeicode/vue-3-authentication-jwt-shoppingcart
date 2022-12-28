import axios from 'axios';
import authHeader from './auth-header';
// 引用axios和auth-header

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {    
    return axios.get(API_URL + 'all');
  }
  // 訪問API公開資源

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  // 訪問User資源

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }
  // 訪問Moderator資源
  
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  // 訪問Admin資源
}
// 定義訪問受保護的路由的方法

export default new UserService();