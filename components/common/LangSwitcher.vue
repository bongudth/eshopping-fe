<template>
  <b-dropdown
    :key="$i18n.locale"
    :text="$t(`headerBar.lang.${$i18n.locale}`)"
    variant="white"
  >
    <b-dropdown-item
      v-for="{ code: locale } in $i18n.locales"
      ref="langMenu"
      :key="locale"
      :disabled="$i18n.locale === locale"
      @click="switchLocale(locale)"
    >
      <span class="ml-2">{{ $t(`headerBar.lang.${locale}`) }}</span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from 'vue';
import { localeChanged, localize } from 'vee-validate';

export default Vue.extend({
  name: 'LangSwitcher',

  methods: {
    switchLocale(locale: string) {
      localize(locale);
      this.$i18n.setLocale(locale);
      localeChanged();
    },
  },
});
</script>
