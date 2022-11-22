<template>
  <div class="background-pink">
    <TheHeader />
    <TheSidebar
      :class="{ hidden: !sidebarVisible }"
      @change="onSidebarChanged"
    />
    <div class="content-page">
      <div class="content background-white shadow p-5">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheHeader from '~/components/partials/admin/TheHeader.vue';
import TheSidebar from '~/components/partials/admin/TheSidebar.vue';

export default Vue.extend({
  name: 'DashboardLayout',

  components: { TheHeader, TheSidebar },

  data() {
    return {
      sidebarVisible: true,
    };
  },

  methods: {
    onSidebarChanged(visible: boolean) {
      this.sidebarVisible = visible;
    },
  },
});
</script>

<style lang="scss" scoped>
.content-page {
  $padding-top: 42px;

  min-height: calc(100vh - #{$admin-header-height});
  margin-left: $admin-sidebar-width;
  margin-top: $admin-header-height;
  transition: margin 0.3s ease-in-out;

  .content {
    min-height: calc(100vh - #{$admin-header-height});
    border-top-left-radius: 50px;
  }
}

.b-sidebar-outer {
  &.hidden {
    & + .content-page {
      margin-left: 0;
    }
  }
}
</style>
