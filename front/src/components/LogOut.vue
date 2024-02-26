<template>
</template>
<script setup>
// import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore'
const authStore = useAuthStore();
const router = useRouter();
authStore.$logout();
// router.push({name:'signin'})
</script>