<template>
  <b-modal
    id="modal-delete-discount"
    centered
    hide-header
    ok-variant="danger"
    cancel-variant="outline-secondary"
    @ok="deleteDiscount"
  >
    <div class="d-flex flex-column">
      <div>
        {{ $t('adminDiscounts.modal.delete.title') }}
        <span class="font-weight-bold">{{ deletingDiscount.name }}</span
        >?
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Discount } from '~/types/Discount';

export default Vue.extend({
  name: 'ModalDelete',

  props: {
    deletingDiscount: {
      type: Object as PropType<Discount>,
      required: true,
    },
  },

  methods: {
    deleteDiscount() {
      this.$services.discounts
        .destroy(this.deletingDiscount.id)
        .then(() => {
          this.$emit('delete', this.deletingDiscount.id);
          this.$root.$bvToast.toast(
            this.$t('adminDiscounts.modal.delete.success') as string,
            {
              title: this.$t('toastTitle.success') as string,
              variant: 'success',
            }
          );
        })
        .catch(() => {
          this.$root.$bvToast.toast(
            this.$t('adminDiscounts.modal.delete.error') as string,
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
