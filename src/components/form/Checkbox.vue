<template>
  <div
    class="checkbox"
    @click="onSwitch">
    <span
      class="checkbox__input"
      :class="{ 'checkbox__input_checked': value }">
      <span
        class="checkbox__inner"
        :class="{ 'checkbox__inner__disabled': $attrs.disabled }"
      ></span>
      <input
        ref="checkbox"
        class="checkbox__original"
        v-bind="$attrs"
        :value="value"
        type="checkbox"
        v-on="listeners"/>
    </span>
    <slot/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Checkbox',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    listeners (): object {
      const _vm = this
      return {
        ...this.$listeners,
        input (event: Event) {
          if (_vm.$attrs.disabled) {
            return
          }
          _vm.$emit('input', (event.target as HTMLInputElement).checked)
        }
      }
    }
  },
  methods: {
    onSwitch () {
      if (this.$attrs.disabled) {
        return
      }
      const _value = !this.value
      ;(this.$refs.checkbox as HTMLInputElement).checked = _value
      this.$emit('input', _value)
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.checkbox {
  display: inline-flex;
  align-items: center;
  color: $tips-font-color;
  font-weight: 500;
  line-height: 16px;
  cursor: pointer;
}

.checkbox__input {
  display: inline-flex;
  margin-right: 8px;
}

.checkbox__inner {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid $container-border-color;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: $white;

  &:after {
    position: absolute;
    left: 5px;
    top: 1px;
    width: 4px;
    height: 9px;
    box-sizing: content-box;
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
    content: "";
    transform: rotate(45deg) scaleY(0);
  }
}

.checkbox__original {
  position: absolute;
  margin: 0;
  width: 0;
  height: 0;
  opacity: 0;
  outline: none;
  z-index: -1;
}

.checkbox__input.checkbox__input_checked {
  .checkbox__inner {
    background-color: $success-font-color;
    border-color: $success-font-color;
  }

  .checkbox__inner__disabled {
    background-color: $third-font-color;
    border-color: $third-font-color;
  }

  .checkbox__inner:after {
    transform: rotate(45deg) scaleY(1);
  }
}
</style>
