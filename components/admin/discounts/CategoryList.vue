<template>
  <b-table
    hover
    sticky-header="500px"
    borderless
    responsive
    thead-class="background-pink"
    :fields="fields"
    :items="categories"
  >
    <template #cell(index)="data">
      {{ data.index + 1 }}
    </template>

    <template #cell(category)="data">
      <div class="font-weight-bold">
        {{ data.item.name }}
      </div>
    </template>

    <template #cell(delete)="data">
      <IconTrash class="ml-3" @click.native="$emit('remove', data.item.id)" />
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import IconTrash from '~/components/icons/IconTrash.vue';
import { Category } from '~/types/Category';

export default Vue.extend({
  name: 'CategoryList',

  components: {
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
          label: this.$t('adminDiscounts.new.category.table.category'),
        },
        {
          key: 'delete',
          label: this.$t('adminDiscounts.new.category.table.delete'),
          class: 'text-right',
        },
      ],
    };
  },
});
</script>
