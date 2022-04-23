import axios from 'axios';


const baseURL = 'http://192.168.1.84:8082/api';


const connectionApi = axios.create({ baseURL });








export default connectionApi;

