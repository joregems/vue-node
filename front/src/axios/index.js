import axios from 'axios';
import config from '@/config'
import { useAuthStore } from '@/stores/AuthStore';
console.log(config["axios"])
export default axios.create(config["axios"])
export const useInterceptors = (axiosToIntercept)=>{
  const refresh = async () => {
    axiosToIntercept
      .post('/refresh')
  }
  axiosToIntercept.interceptors.request.use(
    config => {
      config.sent = false
      return config;
    }, (error) => {
      Promise.reject("error", error)
    }
  )
  axiosToIntercept.interceptors.response.use(
    response => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        await refresh();
        return axiosToIntercept(prevRequest)
        // axios.interceptors.response.eject(requestIntercept);
        // axios.interceptors.response.eject(responseIntercept);
      }
      return Promise.reject(error);
    }
  )
}

// export const useCheckLogin = async (axios_for_use)=>{
//   const user = await axios_for_use.post('/check')
//   const store = useAuthStore();
// }
