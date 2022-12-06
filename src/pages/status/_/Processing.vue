<template>
  <div class="processing">
    <img class="processing-image-ip" src="/images/image-ip.png">
    <div class="processing-dotbit-account">{{ account }}</div>
    <div class="processing-description">
      You will receive your special SubDID in 5 minutes!
    </div>
    <div class="processing-progress-bar">
      <span>
        <Iconfont
          class="processing-progress-bar-icon"
          name="loading"
          color="#2EB67D"
          size="18"
        />
        Processing
      </span>
    </div>
    <SubDIDTips class="progressing-subDID-tips"/>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SubDIDTips from './SubDIDTips.vue'
import Iconfont from '~/components/icon/Iconfont.vue'

export default defineComponent({
  name: 'Processing',
  components: {
    Iconfont,
    SubDIDTips
  },
  props: {
    account: String
  }
})
</script>
<style>
.processing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100vw;
  text-align: center;
  padding: 32px 0;
  box-sizing: border-box;
  gap: 16px;
}

.processing-image-ip {
  width: 143px;
  height: 143px;
}

.processing-dotbit-account {
  word-break: break-all;
  padding: 0 24px;
  text-align: center;
  font-weight: 800;
  font-size: 32px;
  color: #121314;
}

.processing-description {
  font-size: 18px;
  color: #121314;
  width: 75%;
  color: #B0B8BF;
}

.processing-progress-bar {
  background: #D6EFE7;
  border-radius: 60px;
  width: 75%;
  height: 52px;
  font-weight: 700;
  font-size: 16px;
  color: #1EAE82;
  display: flex;
  align-items: center;
  padding: 0 14px;
  margin-bottom: 32px;
}

.processing-progress-bar-icon {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.progressing-subDID-tips {
  width: 75%;
}
</style>
