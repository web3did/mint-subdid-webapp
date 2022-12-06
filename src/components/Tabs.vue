<template>
  <div class="tabs">
    <button
      v-for="item in items"
      :key="item.value"
      class="tabs__button"
      :class="{ 'tabs__button_active': value === item.value }"
      @click="onChange(item.value)">
      <Iconfont
        v-if="item.icon"
        class="tabs__button__icon"
        :name="item.icon"
        size="16"
        color="#FE61A0"
      />
      {{ item.text }}
      <Iconfont
        v-if="item.outlink"
        class="tabs__button__out-link-icon"
        name="arrow-right-up"
        size="8"
        color="#121314"
      />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Iconfont from '~/components/icon/Iconfont.vue'
import { isMobile } from '~/modules/tools'
import { dasBalance } from '~~/config'
import { IConnectedAccount, ME_KEYS } from '~/store/me'

export default Vue.extend({
  name: 'Tabs',
  components: {
    Iconfont
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isMobile,
    ...mapState({
      me: ME_KEYS.namespace
    }),
    connectedAccount (): IConnectedAccount {
      return this.me.connectedAccount
    }
  },
  methods: {
    onChange (value: string) {
      if (value === 'balance') {
        const address = this.connectedAccount?.address
        const chainName = this.connectedAccount?.chain?.name
        const link = `${dasBalance}?originAddress=${address}&originChainName=${chainName}`
        if (this.isMobile) {
          window.location.href = link
        }
        else {
          window.open(link)
        }
        return
      }
      this.$emit('change', value)
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.tabs {
  background: #EAEEF3;
  border-radius: 12px;
  padding: 4px 2px;
  display: flex;
}

.tabs__button {
  flex: 1;
  height: 32px;
  margin: 0 2px;
  border: 0;
  border-radius: 8px;
  font-size: $font-size-14;
  color: rgba(31, 43, 77, 0.66);
  background: unset;
  outline: 0;
  cursor: pointer;
}

.tabs__button_active {
  background: $white;
  font-weight: bold;
  color: $primary-font-color;
}

.tabs__button__icon {
  margin-bottom: 1px;
}

.tabs__button__out-link-icon {
  position: relative;
  top: -10px;
  right: -3px;
}
</style>
