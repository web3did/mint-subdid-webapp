<template>
  <div class="content-header">
    <span class="content-header__title">{{ title }}</span>
    <span
      v-if="closeButton"
      class="content-header__close"
      @click="onClose"
    >
      <Iconfont
        name="close"
        size="19"
        color="#B0B8BF"
      />
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Iconfont from '~/components/icon/Iconfont.vue'

export default Vue.extend({
  name: 'ContentHeader',
  components: {
    Iconfont
  },
  props: {
    title: {
      type: String,
      required: true
    },
    closeButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose () {
      this.$emit('close', false)
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.content-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
}

.content-header__title {
  width: 84%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: $font-size-24;
  font-weight: 500;
  color: $primary-font-color;
  text-align: left;
  line-height: 28px;
}

.content-header__close {
  position: absolute;
  right: 24px;
  top: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: $normal-color;
  }
}
</style>
