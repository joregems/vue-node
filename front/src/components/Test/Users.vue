<template>
  <button @click="submit">clicjeame</button>
</template>

<script setup>
import axios from '@/axios';

function submit() {
  axios
    .get('http://192.168.0.91:8080/users',)
    .then((response) => alert(JSON.stringify(response)))
}
</script>