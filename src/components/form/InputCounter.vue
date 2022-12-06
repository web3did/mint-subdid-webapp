<template>
  <div class="input-counter">
    <button
      class="input-counter__subtract"
      :disabled="disabled || value <= MIN_VALUE"
      @click="onSubtract"
    >
      <Iconfont
        name="subtract"
        :size="ICON_SIZE"
        :color="disabled || value <= MIN_VALUE ? DISABLED_ICON_COLOR : NORMAL_ICON_COLOR"
      />
    </button>
    <input
      :value="value"
      class="input-counter__input"
      type="number"
      inputmode="numeric"
      pattern="[0-9]*"
      :min="MIN_VALUE"
      :max="MAX_VALUE"
      :disabled="disabled"
      @change="onChange"
    >
    <span
      v-if="unit"
      class="input-counter__unit"
    >{{ unit }}</span>
    <button
      class="input-counter__add"
      :disabled="disabled || value >= MAX_VALUE"
      @click="onAdd"
    >
      <Iconfont
        name="add"
        :size="ICON_SIZE"
        :color="disabled || value >= MAX_VALUE ? DISABLED_ICON_COLOR : NORMAL_ICON_COLOR"
      />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Iconfont from '~/components/icon/Iconfont.vue'

const MIN_VALUE = 1
const MAX_VALUE = 20
const DISABLED_ICON_COLOR = '#A0A1AB'
const NORMAL_ICON_COLOR = '#121314'
const ICON_SIZE = 16

export default Vue.extend({
  name: 'InputCounter',
  components: {
    Iconfont
  },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Number,
      default: MIN_VALUE
    },
    disabled: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      MIN_VALUE,
      MAX_VALUE,
      NORMAL_ICON_COLOR,
      DISABLED_ICON_COLOR,
      ICON_SIZE
    }
  },
  methods: {
    onAdd () {
      this.$emit('input', this.value + 1)
    },
    onSubtract () {
      this.$emit('input', this.value - 1)
    },
    onChange (event: Event) {
      let _value = parseInt((event.target as HTMLInputElement).value)
      if (isNaN(_value) || _value < MIN_VALUE) {
        _value = MIN_VALUE
      }
      else if (_value > MAX_VALUE) {
        _value = MAX_VALUE
      }
      ;(event.target as HTMLInputElement).value = _value + ''
      this.$emit('input', _value)
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.input-counter {
  display: flex;
  height: 40px;
  border-radius: 8px;
  border: $container-border;
  background: $white;
  overflow: hidden;
}

.input-counter__subtract {
  width: 40px;
  border: 0;
  border-right: $container-border;
  outline: none;
  background: $normal-color;
  cursor: pointer;

  &:disabled {
    background: $container-border-color;
  }
}

.input-counter__input {
  width: 40px;
  outline: none;
  border: none;
  height: 40px;
  font-size: 20px;
  font-weight: 500;
  font-family: $barlow-medium;
  color: $primary-font-color;
  text-align: center;
}

.input-counter__unit {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0 12px 9px -4px;
  min-width: 30px;
  font-size: $font-size-12;
  color: $assist-font-color;
}

.input-counter__add {
  width: 40px;
  border: 0;
  border-left: $container-border;
  outline: none;
  background: $normal-color;
  cursor: pointer;

  &:disabled {
    background: $container-border-color;
  }
}
</style>
