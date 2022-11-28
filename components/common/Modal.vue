<template>
  <b-modal
    :id="id"
    centered
    :title="title"
    header-bg-variant="primary"
    header-text-variant="light"
    hide-footer
  >
    <template #default="{ hide }">
      <div class="d-flex flex-column align-items-center">
        <div class="mt-3">{{ message }}</div>
        <div class="button-group d-flex">
          <b-button
            v-for="action in actions"
            :key="action.text"
            pill
            variant="outline-primary"
            class="mt-4"
            @click="
              () => {
                if (action.redirect) {
                  $router.push(localePath({ name: action.redirect }));
                } else {
                  hide();
                }
              }
            "
          >
            <component :is="action.icon" class="mr-2"></component>
            {{ action.text }}
          </b-button>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Modal',

  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    actions: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.button-group {
  gap: 1.5rem;
}
</style>
