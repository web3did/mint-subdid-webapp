<template>
  <div class="breadcrumb">
    <template v-for="(item, index) in items">
      <nuxt-link
        v-if="item.href"
        class="breadcrumb__link"
        :key="index"
        :to="item.href"
      >
        {{ item.text }}
      </nuxt-link>
      <span
        v-else
        class="breadcrumb__unlink"
        :key="index"
      >
        {{ item.text }}
      </span>
      <span
        v-if="index < items.length - 1"
        class="breadcrumb__delimiter"
        :key="index + 'delimiter'">/</span>
    </template>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Breadcrumb',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.breadcrumb__link {
  display: inline-block;
  padding: 2px 5px;
  border-radius: 6px;
  color: $primary-font-color;

  &:hover {
    color: $link-font-color;
    background: rgba(7, 58, 141, 0.08);
  }
}

.breadcrumb__unlink {
  color: $assist-font-color;
}

.breadcrumb__delimiter {
  color: $assist-font-color;
}
</style>
