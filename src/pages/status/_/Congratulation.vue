<template>
  <div class="congratulation">
    <img class="congratulation-image" src="/images/icon-congratulation.png">
    <div class="congratulation-congratulation">Congratulations! You are</div>
    <div class="congratulation-subdid">{{ account }}</div>
    <div class="congratulation-now-you-can">
      Now you can
    </div>
    <GuideCard
      title="Learn more about .bit"
      description=""
      iconName="alias"
      backgroundColor="rgba(98, 126, 234, 0.1)"
      @click.native="onLearnMore"
    />
    <GuideCard
      title="Manage"
      description="Manage data, change permissions..."
      iconName="manage"
      backgroundColor="rgba(205, 249, 204, 1)"
      @click.native="onMange"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import GuideCard from './GuideCard.vue'
import { isProdData } from '~~/config'

export default defineComponent({
  name: 'Processing',
  components: {
    GuideCard
  },
  props: {
    account: String
  },
  methods: {
    onLearnMore () {
      window.open('https://www.did.id')
    },
    onMange () {
      const link = isProdData ? `https://data.did.id/${this.account}` : `https://testdata.did.id/${this.account}`
      window.location.href = link
    }
  }
})
</script>

<style>
.congratulation {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.congratulation-image {
  height: 98px;
  margin-top: 60px;
}

.congratulation-congratulation {
  font-weight: 800;
  font-size: 18px;
  color: #B0B8BF;
}

.congratulation-subdid {
  word-break: break-all;
  padding: 0 24px;
  text-align: center;
  color: #121314;
  font-weight: 800;
  font-size: 32px;
}

.congratulation-now-you-can {
  color: #121314;
  font-size: 18px;
  padding: 16px;
}
</style>
