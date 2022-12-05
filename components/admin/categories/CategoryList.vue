<template>
  <b-table
    hover
    borderless
    responsive
    thead-class="background-pink"
    :fields="fields"
    :items="categories"
  >
    <template #cell(category)="data">
      <div class="font-weight-bold">
        {{ data.item.name }}
      </div>
    </template>

    <template #cell(totalProducts)="data">
      <div>{{ data.value ? data.value : 0 }}</div>
    </template>

    <template #cell(action)="data">
      <IconPencil
        @click.native="
          $router.push(
            localePath({
              name: 'admin-categories-id-edit',
              params: { id: data.item.id },
            })
          )
        "
      />
      <IconTrash
        v-b-modal.modal-delete-category
        class="ml-3"
        @click.native="$emit('deleting-category-id', data.item.id)"
      />
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import IconPencil from '~/components/icons/IconPencil.vue';
import IconTrash from '~/components/icons/IconTrash.vue';
import { Category } from '~/types/Category';

export default Vue.extend({
  name: 'CategoryList',

  components: {
    IconPencil,
    IconTrash,
  },

  props: {
    categories: {
      type: Array as PropType<Category[]>,
      default: () => [],
    },
  },

  data() {
    return {
      fields: [
        {
          key: 'category',
          label: this.$t('adminCategories.table.category'),
        },
        {
          key: 'totalProducts',
          label: this.$t('adminCategories.table.totalProducts'),
        },
        {
          key: 'action',
          label: this.$t('adminCategories.table.action'),
        },
      ],
    };
  },
});
</script>
