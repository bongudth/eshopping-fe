<template>
  <b-table
    hover
    borderless
    responsive
    thead-class="background-pink"
    :fields="fields"
    :items="sizes"
  >
    <template #cell(name)="data">
      <div class="font-weight-bold">
        {{ data.value }}
      </div>
    </template>

    <template #cell(action)="data">
      <IconPencil
        @click.native="
          $router.push(
            localePath({
              name: 'admin-sizes-id-edit',
              params: { id: data.item.id },
            })
          )
        "
      />
      <IconTrash
        v-b-modal.modal-delete-size
        class="ml-3"
        @click.native="$emit('deleting-size-id', data.item.id)"
      />
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import IconPencil from '~/components/icons/IconPencil.vue';
import IconTrash from '~/components/icons/IconTrash.vue';
import { Size } from '~/types/Size';

export default Vue.extend({
  name: 'SizeList',

  components: {
    IconPencil,
    IconTrash,
  },

  props: {
    sizes: {
      type: Array as PropType<Size[]>,
      default: () => [],
    },
  },

  data() {
    return {
      fields: [
        {
          key: 'name',
          label: this.$t('adminSizes.table.size'),
        },
        {
          key: 'action',
          label: this.$t('adminSizes.table.action'),
        },
      ],
    };
  },
});
</script>
