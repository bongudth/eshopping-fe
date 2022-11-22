<template>
  <div class="m-3">Please wait...</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'GoogleCallback',

  auth: 'guest',

  async mounted() {
    await this.$nextTick();
    this.$nuxt.$loading.start();
    this.signIn(this.parseParams());
  },

  methods: {
    parseParams() {
      return this.$route.hash
        .replace('#', '')
        .split('&')
        .reduce((acc, entry) => {
          const [key, value] = entry.split('=');
          acc[key] = value;
          return acc;
        }, {} as Record<string, string | number>);
    },

    async signIn(credentials: Record<string, string | number>) {
      try {
        const { data } = await this.$axios.post('/signin/google', credentials);
        this.$auth.setStrategy('local');
        this.$auth.setUserToken(data.data.token, data.data.refresh_token);
        await this.$auth.fetchUser();
        this.$router.push('/');
      } catch (error) {
        this.$root.$bvToast.toast('Failed to signin with Google', {
          title: 'Error',
          variant: 'danger',
          autoHideDelay: 5000,
        });
        this.$router.push('/signin');
      }
    },
  },
});
</script>
