<template>
  <b-modal
    id="modal-delete-product"
    centered
    hide-header
    ok-variant="danger"
    cancel-variant="outline-secondary"
    @ok="deleteProduct"
  >
    <div class="d-flex flex-column">
      <div>
        {{ $t('adminProducts.modal.delete.title') }}
        <span class="font-weight-bold">{{ deletingProduct.name }}</span
        >?
      </div>
      <div class="d-flex align-items-center mt-3">
        <img
          :src="
            deletingProduct.images !== undefined && deletingProduct.images[0]
              ? deletingProduct.images[0].url
              : 'https://www.democraciacristajovem.org.br/wp-content/themes/dc_jovem2022/assets/images/default.jpg'
          "
          alt="eShopping image"
          width="100"
          height="100"
          class="rounded object-fit-cover"
        />
        <div class="d-flex flex-column ml-3">
          <div>
            <span class="font-weight-bold"
              >{{ $t('adminProducts.modal.delete.price') }}:</span
            >
            {{ deletingProduct.price }}
          </div>
          <div>
            <span class="font-weight-bold"
              >{{ $t('adminProducts.modal.delete.stock') }}:</span
            >
            {{ deletingProduct.stock }}
          </div>
          <div>
            <span class="font-weight-bold"
              >{{ $t('adminProducts.modal.delete.status') }}:</span
            >
            {{ deletingProduct.status }}
          </div>
          <div>
            <span class="font-weight-bold"
              >{{ $t('adminProducts.modal.delete.category') }}:</span
            >
            {{ deletingProduct.category?.name }}
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Product } from '~/types/Product';

export default Vue.extend({
  name: 'ModalDelete',

  props: {
    deletingProduct: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  methods: {
    deleteProduct() {
      this.$services.products
        .destroy(this.deletingProduct.id)
        .then(() => {
          this.$emit('delete', this.deletingProduct.id);
          this.$root.$bvToast.toast(
            this.$t('adminProducts.modal.delete.success') as string,
            {
              title: this.$t('toastTitle.success') as string,
              variant: 'success',
            }
          );
        })
        .catch(() => {
          this.$root.$bvToast.toast(
            this.$t('adminProducts.modal.delete.error') as string,
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
