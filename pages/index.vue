<template>
  <div>
    <Introduce />
    <NewArrivals />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Introduce from '~/components/home/Introduce.vue';
import NewArrivals from '~/components/home/NewArrivals.vue';

export default Vue.extend({
  name: 'Home',

  components: { Introduce, NewArrivals },

  auth: 'guest',
});
</script>
