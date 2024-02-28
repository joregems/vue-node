const env = import.meta.env;
console.log(env)
const config = {
  "axios":{
  "baseURL":env.VITE_API_URL,
  "withCredentials": true,
  "access-control-allow-origin":env.VITE_FRONT_URL
}}
export default config;