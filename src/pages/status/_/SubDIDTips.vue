<template>
  <div
    v-if="showTip"
    class="das-tips"
  >
    <div class="das-tips__title">
      💡{{ $tt('Do you know') }}
    </div>
    <div>{{ showTip }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { COMMON_KEYS } from '~/store/common'

export default Vue.extend({
  name: 'SubDIDTips',
  data () {
    return {
      showTip: '',
      showTipTimerId: 0,
      currentTipIndex: 0
    }
  },
  computed: {
    ...mapState({
      common: COMMON_KEYS.namespace
    }),
    tips (): any[] {
      return [
        'You can vote in DAOs with your SubDID.',
        'SubDID is your unique identity credential.',
        '.bit SubDID: crosschain, gas-free, decentralized...',
        'SubDID has all the essential features of a decentralized identity.',
        'You can distribute your own SubDIDs and set price on them.'
      ]
    }
  },
  mounted () {
    this.currentTipIndex = this.getRandomIntInclusive(0, 4)
    this.showTip = this.tips[this.currentTipIndex]
    this.loopTips()
  },
  beforeDestroy () {
    window.clearInterval(this.showTipTimerId)
  },
  methods: {
    loopTips () {
      this.showTipTimerId = window.setInterval(() => {
        if (this.currentTipIndex < 4) {
          this.currentTipIndex += 1
        }
        else {
          this.currentTipIndex = 0
        }
        this.showTip = this.tips[this.currentTipIndex]
      }, 10000)
    },
    getRandomIntInclusive (min: number, max: number): number {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.das-tips {
  padding: 24px 16px;
  margin-bottom: 24px;
  border-radius: 12px;
  border: $container-border;
  line-height: 20px;
}

.das-tips__title {
  color: $assist-font-color;
  margin-bottom: 6px;
}
</style>
