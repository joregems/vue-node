<template>
  <h3>
    <button @click="cambiar_buttom">
    </button>
    <div v-if="show"> chess</div>
  </h3>
  <h3>{{ msg }}</h3>
  <h1>
    Cena {{ contador }} con el rey godo {{ capitalizeFirstLetter(rey_actual.nombre) }}

  </h1>
  <h2>
    <h3>precio {{ rey_actual.precio }} $</h3>
    <div v-if="rey_actual.finDeSemana" class="red dias">
      (Solo fines de semana)
    </div>
    <div v-else class="blue dias">
      (de lunes a domingo)
    </div>
  </h2>


  <h2 v-if="rey_actual.precio < 100">
    Ahora un 10% dto: {{ rey_actual.precio * .9 }} $
    <img v-bind:src="oferta" width="100" height="50">

  </h2>
  <img v-bind:src="'https://www.html6.es/img/rey_' + rey_actual.nombre + '.png'">
  <h2>
    <button class="my-button" v-on:click="next"> siguiente {{ contador }}/{{ max_cena }} </button>
  </h2>
</template>
<script setup>

  import { ref, computed } from 'vue';
  import { productos } from './datos';
  const props = defineProps(['msg'])
  let show = ref(props.msg)
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const oferta = "oferta.jpg"
  const contador = ref(1);
  const max_cena = productos.length
  const next = () => {
    if (contador.value < productos.length)
      contador.value++
    else {
      contador.value = 1;
    }
  }
  const rey_actual = computed(() => {
    return productos[contador.value - 1]
  })
  const cambiar_buttom = () => {
    show.value=!show.value
  }
</script>
<style scoped>
.my-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.my-button:hover {
  background-color: #45a049;
}

.my-button:active {
  background-color: #3e8e41;
}

.blue {
  background-color: blue;
}

.red {
  background-color: red;
}

.dias {
  color: white;
  padding: 4px 17px;
  font-size: 0.9em;
  border-radius: 4px;
  margin: 5px 0 10px;
  display: inline-block;
}</style>
