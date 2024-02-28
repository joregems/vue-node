<script setup>
import { useRouter } from 'vue-router'
import '@mdi/font/css/materialdesignicons.css'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
const authStore = useAuthStore();
const { is_logged, loading, user } = storeToRefs(authStore)
const sidebar = ref(false);
import { storeToRefs } from 'pinia'
const change = () => {
  sidebar.value = !sidebar.value
}
const appTitle = 'magic';
const menuItems = [
  { title: 'Home', path: '/', icon: 'mdi-home' },
  { title: 'Sign Up', path: '/signup', icon: 'mdi-lock-open' },
  { title: 'Sign In', path: '/signin', icon: 'mdi-login' }
]

</script>
<template>
  <v-app-bar>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>App</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="is_logged">
      <router-link to="/logout">
        <v-btn icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </router-link>
    </div>
    <div v-if="!is_logged">
      <router-link to="/signin">
        <v-btn icon>
          <v-icon>mdi-lock-open</v-icon>
        </v-btn>
      </router-link>
    </div>
    <div v-if="!is_logged">
      <router-link to="/signup">
        <v-btn icon>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </router-link>
    </div>
    <!-- <div v-if="is_logged">
      {{ "is logged: " + is_logged }}

      <router-link to="/signin">
        <v-btn icon variant="outlined">
          <v-icon>mdi-lock-open</v-icon>
        </v-btn>
      </router-link>
    </div> -->
  </v-app-bar>
</template>