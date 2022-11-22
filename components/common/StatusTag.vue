<template>
  <b-alert
    show
    :variant="getStatusVariant(status)"
    class="tag-status d-flex align-items-center"
  >
    <svg
      width="5"
      height="5"
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.44208 4.99334H1.55126C0.525965 4.99334 0 4.47403 0 3.44208V1.55127C0 0.525965 0.519308 0 1.55126 0H3.44873C4.47403 0 5 0.519308 5 1.55127V3.44874C4.99334 4.47404 4.47403 4.99334 3.44208 4.99334ZM1.55126 0.998668C1.07856 0.998668 0.998668 1.07856 0.998668 1.55127V3.44874C0.998668 3.92144 1.07856 4.00133 1.55126 4.00133H3.44873C3.92144 4.00133 4.00133 3.92144 4.00133 3.44874V1.55127C4.00133 1.07856 3.92144 0.998668 3.44873 0.998668L2.5 1L1.55126 0.998668Z"
        fill="currentColor"
      />
      <path
        d="M1.55126 0.998668C1.07856 0.998668 0.998668 1.07856 0.998668 1.55127V3.44874C0.998668 3.92144 1.07856 4.00133 1.55126 4.00133H3.44873C3.92144 4.00133 4.00133 3.92144 4.00133 3.44874V1.55127C4.00133 1.07856 3.92144 0.998668 3.44873 0.998668L2.5 1L1.55126 0.998668Z"
        fill="currentColor"
      />
    </svg>
    <div class="ml-2">
      {{ $t(`statusTag.${status}`) }}
    </div>
  </b-alert>
</template>

<script lang="ts">
import Vue from 'vue';
import getStatusVariant from '~/utils/getStatusVariant';

export default Vue.extend({
  name: 'StatusTag',

  props: {
    status: {
      type: String,
      default: '',
    },
  },

  methods: {
    getStatusVariant,
  },
});
</script>
