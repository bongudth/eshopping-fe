<template>
  <b-modal
    id="modal-delete-size"
    centered
    hide-header
    ok-variant="danger"
    cancel-variant="outline-secondary"
    @ok="deleteSize"
  >
    <div class="d-flex flex-column">
      <div>
        {{ $t('adminSizes.modal.delete.title') }}
        <span class="font-weight-bold">{{ deletingSize.name }}</span
        >?
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Size } from '~/types/Size';

export default Vue.extend({
  name: 'ModalDelete',

  props: {
    deletingSize: {
      type: Object as PropType<Size>,
      required: true,
    },
  },

  methods: {
    deleteSize() {
      this.$services.sizes
        .destroy(this.deletingSize.id)
        .then(() => {
          this.$emit('delete', this.deletingSize.id);
          this.$root.$bvToast.toast(
            this.$t('adminSizes.modal.delete.success') as string,
            {
              title: this.$t('toastTitle.success') as string,
              variant: 'success',
            }
          );
        })
        .catch(() => {
          this.$root.$bvToast.toast(
            this.$t('adminSizes.modal.delete.error') as string,
            {
              title: this.$t('toastTitle.error') as string,
              variant: 'danger',
            }
          );
        });
    },
  },
});
</script>
