<template>
  <b-modal
    id="modal-delete-category"
    centered
    hide-header
    ok-variant="danger"
    cancel-variant="outline-secondary"
    @ok="deleteCategory"
  >
    <div class="d-flex flex-column">
      <div>
        {{ $t('adminCategories.modal.delete.title') }}
        <span class="font-weight-bold">{{ deletingCategory.name }}</span
        >?
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Category } from '~/types/Category';

export default Vue.extend({
  name: 'ModalDelete',

  props: {
    deletingCategory: {
      type: Object as PropType<Category>,
      required: true,
    },
  },

  methods: {
    deleteCategory() {
      this.$services.categories
        .destroy(this.deletingCategory.id)
        .then(() => {
          this.$emit('delete', this.deletingCategory.id);
          this.$root.$bvToast.toast(
            this.$t('adminCategories.modal.delete.success') as string,
            {
              title: this.$t('toastTitle.success') as string,
              variant: 'success',
            }
          );
        })
        .catch(() => {
          this.$root.$bvToast.toast(
            this.$t('adminCategories.modal.delete.error') as string,
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
