<template>
  <div
    class="free-mint-container"
    :class="{ '_mobile': isMobile }"
  >
    <div class="free-mint">
      <div class="free-mint-dotbit">
        <img src="/images/dotbit-logo.png" alt="logo">
      </div>
      <div class="free-mint-desc">
        <div class="free-mint-get-subDID">Get your SubDID</div>
        <div class="free-mint-for-free">for FREE</div>
        <div class="free-mint-sfbw2022">
          SPECIAL FOR
          <img
            class="free-mint-sfbw2022-logo"
            src="/images/logo-sfbw22.svg"
            alt="SFBW2022"
          >
        </div>
      </div>
      <div class="free-mint-subDID-input">
        <div class="free-mint-subDID-label">SubDID</div>
        <div class="free-mint-subDID-input-container">
          <input
            v-model="account"
            placeholder="Name (e.g jack)"
            @input="onInputAccount"
          >
          <div class="free-mint-subDID-input-tip">{{ `.${mainAccount}` }}</div>
        </div>
        <div v-if="accountError" class="free-mint-error">
          {{ accountError }}
          <a
            v-if="accountError === 'Includes unsupported characters.'"
            class="free-mint-rule-details"
            href="https://docs.did.id/register-das/open-registration-rules"
            target="_blank">[Rule details]</a>
        </div>
      </div>

      <div class="free-mint-address-input">
        <div class="free-mint-subDID-label">
          <span>Mint to</span>
          <span
            class="free-mint-connect-wallet"
            @click="onConnectWallet"
          >
            {{ loggedIn ? $tt('Switch wallet') : $tt('Connect wallet') }}
          </span>
        </div>
        <input
          v-model="address"
          placeholder="Paste ETH/TRON Address"
          @input="onInputAddress"
        >
      </div>
      <div v-if="addressError" class="free-mint-error">{{ addressError }}</div>
      <Button
        :loading="checkLoading"
        status="success"
        size="super"
        shape="round"
        block
        class="free-mint-button"
        @click="freeMint"
      >Free Mint</Button>
    </div>
    <div class="free-mint-learn-more">
      Learn more about
      <a
        class="free-mint-learn-more-link"
        href="https://www.did.id"
        target="_blank">.bit</a>
    </div>
    <SeeYouSoonDialog v-model="seeYouSoonDialogShowing"></SeeYouSoonDialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { validate } from 'vee-validate'
import { isMobile, digitalEmojiHandle } from '~/modules/tools'
import { CoinType, ETH, TRON } from '~/constant/chain'
import { AccountRegisterStatus } from '~/constant'
import { mainAccount } from '~~/config'
import Button from '~/components/Button.vue'
import errno from '~/constant/errno'
import { IConnectedAccount, ME_KEYS } from '~/store/me'
import SeeYouSoonDialog from '~/pages/_/SeeYouSoonDialog.vue'

export default Vue.extend({
  name: 'Index',
  components: {
    Button,
    SeeYouSoonDialog
  },
  data () {
    return {
      mainAccount,
      account: '',
      address: '',
      checkLoading: false,
      accountError: '',
      addressError: '',
      subAccount: '',
      seeYouSoonDialogShowing: false
    }
  },
  computed: {
    isMobile,
    ...mapState({
      me: ME_KEYS.namespace
    }),
    loggedIn (): boolean {
      return !!this.me.connectedAccount.address
    },
    connectedAccount (): IConnectedAccount {
      return this.me.connectedAccount
    }
  },
  watch: {
    'connectedAccount.address' () {
      this.address = this.connectedAccount?.address
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.connectedAccount?.address) {
        this.address = this.connectedAccount?.address
      }
    }, 500)
  },
  methods: {
    onConnectWallet () {
      this.$walletSdk.walletsConnect()
    },
    onInputAccount () {
      this.account = digitalEmojiHandle(this.account)
      this.account = this.account.toLowerCase()
      this.account = this.account.replace(/\s+/g, '')
      this.accountError = ''
    },
    onInputAddress () {
      this.addressError = ''
    },
    async freeMint () {
      this.seeYouSoonDialogShowing = false
      return
      try {
        this.checkLoading = true
        const accountVerified = await validate(this.account, 'required', { name: 'SubDID' })
        if (!accountVerified.valid) {
          this.accountError = accountVerified.errors[0]
          return
        }
        this.subAccount = `${this.account}.${mainAccount}`
        const ethAddressVerified = await validate(this.address, `required|address:${ETH.symbol}`)
        const tronAddressVerified = await validate(this.address, `required|address:${TRON.symbol}`)
        let coinType = ''
        if (ethAddressVerified.valid) {
          coinType = CoinType.eth
        }
        else if (tronAddressVerified.valid) {
          coinType = CoinType.trx
        }
        if (!coinType) {
          this.addressError = 'Invalid address'
          return
        }
        const checkRes = await this.$services.mintSubDID.checkSubdid(this.subAccount)
        if (checkRes.register_status === AccountRegisterStatus.none) {
          const mintRes = await this.$services.mintSubDID.mintSubdid({
            account: this.subAccount,
            ownerKey: this.address,
            ownerCoinType: coinType
          })
          if (mintRes.registering_status === AccountRegisterStatus.registering) {
            this.$router.push(`/status/${this.subAccount}`)
          }
        }
        else if (checkRes.register_status === AccountRegisterStatus.registered) {
          this.accountError = 'Oops! This SubDID has been minted. Please try another one.'
        }
        else if (checkRes.register_status === AccountRegisterStatus.registering) {
          this.accountError = 'Someone is minting it. Please try another one.'
        }
      }
      catch (err: any) {
        console.error(err)
        if (err.code === errno.rpcApiErrInvalidCharset) {
          this.accountError = 'Includes unsupported characters.'
        }
        else if (err.code === errno.rpcApiTooManyAccountsForSameAddress) {
          this.$alert({
            title: this.$tt('Tips'),
            message: err.message
          })
        }
        else {
          this.$alert({
            title: this.$tt('Error'),
            message: err.code ? `${err.code}: ${err.message}` : err
          })
        }
      }
      finally {
        this.checkLoading = false
      }
    }
  }
})
</script>

<style lang="scss">
@import 'src/assets/variables';

.free-mint-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  .free-mint {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 100vw;
    text-align: center;
    position: relative;
  }

  .free-mint-dotbit {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 38px;
    margin-bottom: 16px;

    img {
      height: 28px;
      width: 70px;
    }
  }

  .free-mint-desc {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .free-mint-get-subDID {
    font-size: 32px;
    font-family: $barlow-medium;
    font-weight: 800;
    color: #121314;
    line-height: 38px;
  }

  .free-mint-for-free {
    font-size: 32px;
    font-family: $barlow-medium;
    font-weight: 800;
    color: #E4B169;
    line-height: 38px;
  }

  .free-mint-sfbw2022 {
    display: flex;
    align-items: center;
    margin-top: 16px;
    color: #B0B8BF;
  }

  .free-mint-sfbw2022-logo {
    margin-left: 4px;
  }

  .free-mint-subDID-input,
  .free-mint-address-input {
    text-align: left;
    margin-top: 32px;
    position: relative;
    font-size: 14px;
    font-weight: bold;

    input {
      width: 277px;
      font-size: 16px;
      font-weight: 500;

      &::placeholder {
        color: #B0B8BF;
      }
    }
  }

  .free-mint-subDID-input {
    margin-top: 60px;
  }

  .free-mint-subDID-input-container {
    width: 311px;
    height: 57px;
    position: relative;
    font-size: 16px;

    input {
      width: 181px;
      font-size: 16px;
      padding-right: 112px;
      font-weight: 500;

      &::placeholder {
        color: #B0B8BF;
      }
    }
  }

  .free-mint-subDID-input-tip {
    position: absolute;
    right: 16px;
    top: 0;
    line-height: 57px;
  }

  input {
    width: 311px;
    height: 57px;
    background: #F7F7F7;
    border: 1px solid #F7F7F7;
    border-radius: 12px;
    padding: 0 16px;
    font-weight: normal;
  }

  input:focus {
    border: 1px solid #22C493;
    outline: none;
  }

  .free-mint-button {
    width: 311px;
    margin-top: 32px;
  }

  .free-mint-learn-more {
    margin-bottom: 30px;
    color: #5F6570;
    font-size: 14px;
    text-align: center;
  }

  .free-mint-learn-more-link {
    color: #3E66B3;
  }

  .free-mint-error {
    margin-top: 4px;
    width: 311px;
    font-size: 14px;
    font-weight: 400;
    color: $error-font-color;
    line-height: 14px;
    text-align: left;
  }

  .free-mint-subDID-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  .free-mint-connect-wallet {
    color: #3E66B3;
    cursor: pointer;
  }

  .free-mint-rule-details {
    color: $link-font-color;

    &:hover {
      color: $link-hover-font-color;
    }
  }

  &._mobile {
    .free-mint-subDID-input {
      margin-top: 32px;
    }
  }
}
</style>
