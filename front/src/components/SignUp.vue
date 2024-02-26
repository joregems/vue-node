<template>


  <v-sheet width="300" class="mx-auto">
    <div v-if="errors.length">
      {{ errors }}
    </div>
    <v-form @submit.prevent="submit">
      <v-text-field variant="solo" prepend-inner-icon="mdi-email" v-model="form.email" label="Email"></v-text-field>
      <v-text-field type="password" variant="solo" prepend-inner-icon="mdi-key" v-model="form.password" label="Password"></v-text-field>
      <v-text-field variant="solo" prepend-inner-icon="mdi-face-man" v-model="form.name" label="Name"></v-text-field>
      <v-select v-model="form.role" label="role" :items="['admin', 'user', 'bad']"></v-select>
      <v-btn type="submit" block class="mt-2">Sign Up</v-btn>
    </v-form>
  </v-sheet>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/AuthStore'
import axios from '@/axios';
import { useInterceptors } from '@/axios';
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
const router = useRouter()
const authStore = useAuthStore();

useInterceptors(axios);
const DEBUG = process.env.NODE_ENV === "development";
console.log(process.env.NODE_ENV, "---------------")
const form = ref({
  email: '',
  password: '',
  name: '',
  role: '',
})
const errors = ref([])

function submit() {
  authStore.$signup(form.value)
  .then((response)=>{
    alert("user has been created")
    router.push({name:"signin"})
  })
  .catch((error)=>{
    errors.value=[]
    error.response.data.forEach(element => {
      errors.value.push(element.message)
  
    });

  })
}

</script>