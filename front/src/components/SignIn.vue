<template>
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent="submit">
      <v-text-field variant="solo" prepend-inner-icon="mdi-email" v-model="form.email"
        label="Email"></v-text-field>
      <v-text-field type="password" variant="solo" prepend-inner-icon="mdi-key" v-model="form.password"
        label="Password">
      </v-text-field>
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
    <v-btn @click='()=>{router.push({name:"signup"})}' block class="mt-2">singUp</v-btn>

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
console.log(process.env.NODE_ENV,"---------------")
const form = ref({
  email: '',
  password: '',
})

function submit() {
  authStore.$login(form.value)
  router.push({name:"home"})
  }

</script>