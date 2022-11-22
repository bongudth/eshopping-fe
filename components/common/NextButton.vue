<template>
  <b-button pill variant="outline-secondary">
    {{ $t('button.next') }}
    <IconRight class="ml-2" />
  </b-button>
</template>

<script lang="ts">
import Vue from 'vue';
import IconRight from '~/components/icons/IconRight.vue';

export default Vue.extend({
  name: 'NextButton',

  components: { IconRight },
});
</script>
