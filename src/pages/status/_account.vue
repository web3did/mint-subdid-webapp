<template>
  <div
    class="account-status-container"
    :class="{ '_mobile': isMobile }"
  >
    <Processing
      v-if="checkLoading"
      :account="account"
    />
    <Congratulation
      v-else
      :account="account"
    />
    <div class="account-status-learn-more">
      Learn more about
      <a
        class="account-status-learn-more-link"
        href="https://www.did.id"
        target="_blank">.bit</a>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import Vue from 'vue'
import Processing from './_/Processing.vue'
import Congratulation from './_/Congratulation.vue'
import { isMobile } from '~/modules/tools'
import { AccountRegisterStatus, CYCLE_CALL_FUNCTION_TIME } from '~/constant'

export default Vue.extend({
  name: 'AccountStatus',
  components: {
    Processing,
    Congratulation
  },
  data () {
    return {
      account: this.$route.params.account,
      checkLoading: true,
      checkAccountStatusTimerId: 0
    }
  },
  computed: {
    isMobile,
    ...mapState(['config'])
  },
  mounted () {
    this.check()
    this.checkAccountStatusTimerId = window.setInterval(() => {
      this.check()
    }, 2 * CYCLE_CALL_FUNCTION_TIME)
  },
  beforeDestroy () {
    window.clearInterval(this.checkAccountStatusTimerId)
  },
  methods: {
    async check () {
      try {
        const checkRes = await this.$services.mintSubDID.checkSubdid(this.account)
        if (checkRes.register_status === AccountRegisterStatus.registered) {
          this.checkLoading = false
          window.clearInterval(this.checkAccountStatusTimerId)
        }
      }
      catch (err: any) {
        console.error(err)
        this.$alert({
          title: this.$tt('Error'),
          message: err.code ? `${err.code}: ${err.message}` : err
        })
      }
    }
  }
})
</script>

<style lang="scss">
@import 'src/assets/variables';

.account-status-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  .account-status-learn-more {
    margin-bottom: 30px;
    color: #5F6570;
    font-size: 14px;
    text-align: center;
  }

  .account-status-learn-more-link {
    color: #3E66B3;
  }

  &._mobile {

  }
}
</style>
