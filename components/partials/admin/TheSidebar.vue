<template>
  <b-sidebar
    id="sidebar-admin"
    :visible="visible"
    no-close-on-route-change
    text-variant="secondary"
    bg-variant="transparent"
    width="280px"
    v-on="$listeners"
  >
    <template #header>
      <IconLogo @click.native="$router.push(localePath({ name: 'index' }))" />
    </template>
    <template #default>
      <NavLinks />
    </template>
  </b-sidebar>
</template>

<script lang="ts">
import Vue from 'vue';
import IconLogo from '~/components/icons/IconLogo.vue';
import NavLinks from '~/components/partials/admin/NavLinks.vue';

const SM_BREAK_POINT = 991;

export default Vue.extend({
  name: 'TheSidebar',

  components: {
    IconLogo,
    NavLinks,
  },

  data() {
    return {
      visible: process.server ? true : window.innerWidth > SM_BREAK_POINT,
      delayId: null as any,
    };
  },

  beforeMount() {
    this.updateVisible();
  },

  mounted() {
    window.addEventListener('resize', this.pageResizeHandler);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.pageResizeHandler);
  },

  methods: {
    pageResizeHandler() {
      clearTimeout(this.delayId);
      this.delayId = setTimeout(this.updateVisible, 250);
    },

    updateVisible() {
      this.visible = window.innerWidth > SM_BREAK_POINT;
      this.$emit('change', this.visible);
    },
  },
});
</script>
