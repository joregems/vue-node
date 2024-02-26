import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/axios';
import { useInterceptors } from '@/axios';

useInterceptors(axios);

const is_empty=(obj)=>(Object.keys(obj).length ===0);

export const useAuthStore = defineStore('authStore', () => {
  const user = ref({})
  const is_logged = ref(false)
  const loading = ref(true)
  function $reset(){
    user.value={}
    is_logged.value = false
    loading.value = true
  }
  async function $login(data) {
    if (is_empty(user.value)){
      axios.post('login', data)
      .then((response) =>{
        user.value = {"name":response.data.name,"role":response.data.role }
        is_logged.value = true
        loading.value = false
      })
      .catch((error)=>{console.log(error)})
    }
  }

  async function $signup(data) {
    let respons = await axios.post('users', data);
    if (is_empty(user.value)){}

    return respons;
  }

  async function $logout() {
    axios.get('logout').then((response)=>{
      $reset();
    }
    ).catch((error)=>{
      console.log(error)
    })
  }
  async function $check_logged() {
    let res=false;
    try{
    const response = await axios.post('check')
      if (response.data){
      user.value = response.data
      is_logged.value = true;
      loading.value = false
      res=true;        
      }
    }
    catch{

    }

    return res

  }
  return { user, is_logged, loading, $login, $signup, $check_logged, $logout, $reset}
})