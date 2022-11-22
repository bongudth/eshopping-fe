<template>
  <div class="button-icon d-flex align-items-center rounded-pill p-2">
    <b-avatar
      v-if="avatarUrl"
      size="24px"
      variant="primary"
      :src="avatarUrl"
    ></b-avatar>
    <IconPerson v-else />
    <div class="button-icon__title ml-2">{{ email }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconPerson from '~/components/icons/IconPerson.vue';

export default Vue.extend({
  name: 'AccountButton',

  components: { IconPerson },

  computed: {
    avatarUrl() {
      return this.$store.state.auth.user.avatarUrl;
    },
    email() {
      return this.$store.state.auth.user.email;
    },
  },
});
</script>
