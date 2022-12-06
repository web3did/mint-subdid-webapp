import { Buffer } from 'buffer'
import BN from 'bn.js'
import Decimal from 'decimal.js'
// @ts-ignore
import abcCopy from 'abc-copy'
import dayjs, { Dayjs } from 'dayjs'
import GraphemeSplitter from 'grapheme-splitter'
import { SignTypedDataVersion, TypedMessage, TypedDataUtils } from '@metamask/eth-sig-util'
import Das from 'das-sdk'
// @ts-ignore
import blake2b from 'blake2b'
import { ACCOUNT_SUFFIX, CHAR_TYPE, DigitalEmojiMap, TIME_FORMAT, TOKEN_DECIMAL_PLACES } from '~/constant'
import { CKB } from '~/constant/chain'
// @ts-ignore
import emojiList from '~/modules/char_set/emoji_list.json'
// @ts-ignore
import numberList from '~/modules/char_set/digit_list.json'
// @ts-ignore
import englishList from '~/modules/char_set/en_list.json'
// @ts-ignore
import turkishList from '~/modules/char_set/tr_list.json'
// @ts-ignore
import thaiList from '~/modules/char_set/th_list.json'
// @ts-ignore
import koreanList from '~/modules/char_set/ko_list.json'
// @ts-ignore
import vietnameseList from '~/modules/char_set/vi_list.json'

/**
 * Used to determine whether it is a mobile terminal
 */
export function isMobile (): boolean {
  return window.innerWidth < 960
}

/**
 * Enhance the key of the module in vuex, because these modules have namespace, so the outside world must add namespace if they want to use it.
 * @param keys
 * @param namespace
 */
export function augmentKeys<T> (keys: T, namespace: string): T {
  const ret: any = {}
  for (const key in keys) {
    if (!Object.prototype.hasOwnProperty.call(keys, key)) {
      continue
    }

    if (key === 'namespace') {
      ret[key] = keys[key]
    }
    else {
      ret[key] = `${namespace}/${keys[key]}`
    }
  }
  return ret
}

/**
 * shrinkUnit
 * @param value
 * @param shrinkDecimals
 * @param precision
 */
export function shrinkUnit (value: string|number|Decimal, shrinkDecimals: number, precision = 8): string {
  value = value || 0
  const decimalNum = Decimal.div(value, 10 ** shrinkDecimals)
  let decimals = decimalNum.decimalPlaces()

  if (decimals > precision) {
    decimals = precision
  }
  return decimalNum.toFixed(decimals, Decimal.ROUND_DOWN)
}

/**
 * expandUnit
 * @param value
 * @param decimals
 * @param precision
 */
export function expandUnit (value: string|number|Decimal, decimals: number, precision = 0): string {
  value = value || 0
  return Decimal.mul(value, 10 ** decimals).toFixed(precision, Decimal.ROUND_DOWN)
}

/**
 * Thousands of divisions
 * @param num
 * @param digits
 */
export function thousandSplit (num: number | string | Decimal, digits?: number): string {
  if (digits && digits > 0) {
    if (Decimal.isDecimal(num)) {
      num = (num as Decimal).toFixed(digits).toString()
    }
    else {
      num = new Decimal(num).toFixed(digits).toString()
    }
  }
  const strNum = num + ''
  if (strNum.includes('.')) {
    return (num + '').replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }
  else {
    return strNum.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
}

/**
 * Copy data to the clipboard
 * @param text
 * @param el
 */
export function copyText (text: string, el?: Element): Promise<void> {
  return abcCopy(text, {
    target: el
  })
}

/**
 * String reduction
 * @param inputString
 * @param head
 * @param tail
 * @param tokenStr
 */
export function collapseString (inputString = '', head = 4, tail = 4, tokenStr = '...'): string {
  const splitter = new GraphemeSplitter()
  const split = splitter.splitGraphemes(inputString)
  if (split.length > 12) {
    return split.slice(0, head).join('') + tokenStr + split.slice(split.length - tail, split.length).join('')
  }
  else {
    return inputString
  }
}

/**
 * Handling dayjs format not supported in safari 2019-07-02T13:34:11+0000
 * @param timestamp
 */
export function safariTimestampFormat (timestamp: string | number | Dayjs): string | number | Dayjs {
  if (typeof timestamp === 'string') {
    return timestamp.replace(/\+0000/, 'Z')
  }
  else {
    return timestamp
  }
}

/**
 * Convert the time to the specified time format
 * @param timestamp
 * @param template
 */
export function formatDateTime (timestamp: string | number | Dayjs, template = TIME_FORMAT.fullDateTime): string {
  timestamp = safariTimestampFormat(timestamp)
  return dayjs(timestamp).format(template)
}

export interface ICharInfo {
  char_set_name: number,
  char: string
}

export function accountChars (account: string): ICharInfo[] {
  const splitter = new GraphemeSplitter()
  let split = splitter.splitGraphemes(account)

  split = split.map((item) => {
    // @ts-ignore
    if (DigitalEmojiMap[item]) {
      // @ts-ignore
      return DigitalEmojiMap[item]
    }
    else {
      return item
    }
  })

  const chars: ICharInfo[] = split.map((char) => {
    let _charType: number = CHAR_TYPE.unknown
    if (emojiList.includes(char)) {
      _charType = CHAR_TYPE.emoji
    }
    else if (numberList.includes(char)) {
      _charType = CHAR_TYPE.number
    }
    else if (englishList.includes(char)) {
      _charType = CHAR_TYPE.english
    }
    else if (turkishList.includes(char)) {
      _charType = CHAR_TYPE.turkish
    }
    else if (vietnameseList.includes(char)) {
      _charType = CHAR_TYPE.vietnamese
    }
    else if (thaiList.includes(char)) {
      _charType = CHAR_TYPE.thai
    }
    else if (koreanList.includes(char)) {
      _charType = CHAR_TYPE.korean
    }

    return {
      char_set_name: _charType,
      char
    }
  })

  return chars
}

export function splitAccount (account: string, addSuffix = false): ICharInfo[] {
  const splitter = new GraphemeSplitter()
  let split = splitter.splitGraphemes(account)

  split = split.map((item) => {
    // @ts-ignore
    if (DigitalEmojiMap[item]) {
      // @ts-ignore
      return DigitalEmojiMap[item]
    }
    else {
      return item
    }
  })

  const englishSplitArr: ICharInfo[] = split.map((char: string) => {
    let _charType: number = CHAR_TYPE.unknown
    if (emojiList.includes(char)) {
      _charType = CHAR_TYPE.emoji
    }
    else if (numberList.includes(char)) {
      _charType = CHAR_TYPE.number
    }
    else if (englishList.includes(char)) {
      _charType = CHAR_TYPE.english
    }

    return {
      char_set_name: _charType,
      char
    }
  })

  const turkishSplitArr: ICharInfo[] = split.map((char: string) => {
    let _charType: number = CHAR_TYPE.unknown
    if (emojiList.includes(char)) {
      _charType = CHAR_TYPE.emoji
    }
    else if (numberList.includes(char)) {
      _charType = CHAR_TYPE.number
    }
    else if (turkishList.includes(char)) {
      _charType = CHAR_TYPE.turkish
    }

    return {
      char_set_name: _charType,
      char
    }
  })

  const vietnameseSplitArr: ICharInfo[] = split.map((char: string) => {
    let _charType: number = CHAR_TYPE.unknown
    if (emojiList.includes(char)) {
      _charType = CHAR_TYPE.emoji
    }
    else if (numberList.includes(char)) {
      _charType = CHAR_TYPE.number
    }
    else if (vietnameseList.includes(char)) {
      _charType = CHAR_TYPE.vietnamese
    }

    return {
      char_set_name: _charType,
      char
    }
  })

  const thaiSplitArr: ICharInfo[] = split.map((char: string) => {
    let _charType: number = CHAR_TYPE.unknown
    if (emojiList.includes(char)) {
      _charType = CHAR_TYPE.emoji
    }
    else if (numberList.includes(char)) {
      _charType = CHAR_TYPE.number
    }
    else if (thaiList.includes(char)) {
      _charType = CHAR_TYPE.thai
    }

    return {
      char_set_name: _charType,
      char
    }
  })

  const koreanSplitArr: ICharInfo[] = split.map((char: string) => {
    let _charType: number = CHAR_TYPE.unknown
    if (emojiList.includes(char)) {
      _charType = CHAR_TYPE.emoji
    }
    else if (numberList.includes(char)) {
      _charType = CHAR_TYPE.number
    }
    else if (koreanList.includes(char)) {
      _charType = CHAR_TYPE.korean
    }

    return {
      char_set_name: _charType,
      char
    }
  })

  const englishUnknownChar = englishSplitArr.find((item: ICharInfo) => {
    return item.char_set_name === CHAR_TYPE.unknown
  })
  const turkishUnknownChar = turkishSplitArr.find((item: ICharInfo) => {
    return item.char_set_name === CHAR_TYPE.unknown
  })
  const vietnameseUnknownChar = vietnameseSplitArr.find((item: ICharInfo) => {
    return item.char_set_name === CHAR_TYPE.unknown
  })
  const thaiUnknownChar = thaiSplitArr.find((item: ICharInfo) => {
    return item.char_set_name === CHAR_TYPE.unknown
  })
  const koreanUnknownChar = koreanSplitArr.find((item: ICharInfo) => {
    return item.char_set_name === CHAR_TYPE.unknown
  })

  let splitArr = null

  if (!englishUnknownChar) {
    splitArr = englishSplitArr
  }
  else if (!turkishUnknownChar) {
    splitArr = turkishSplitArr
  }
  else if (!vietnameseUnknownChar) {
    splitArr = vietnameseSplitArr
  }
  else if (!thaiUnknownChar) {
    splitArr = thaiSplitArr
  }
  else if (!koreanUnknownChar) {
    splitArr = koreanSplitArr
  }
  else {
    splitArr = split.map((char: string) => {
      return {
        char_set_name: CHAR_TYPE.unknown,
        char
      }
    })
  }

  const unknownChar = splitArr.find((item: ICharInfo) => {
    return item.char_set_name === CHAR_TYPE.unknown
  })

  if (!unknownChar) {
    const charList: { [key: string]: any } = {}
    if (!englishUnknownChar) {
      charList.en = englishSplitArr
    }

    if (!turkishUnknownChar) {
      charList.tr = turkishSplitArr
    }

    if (!vietnameseUnknownChar) {
      charList.vi = vietnameseSplitArr
    }

    if (!thaiUnknownChar) {
      charList.th = thaiSplitArr
    }

    if (!koreanUnknownChar) {
      charList.ko = koreanSplitArr
    }

    let language = window.navigator.language
    if (/^en/i.test(language)) {
      language = 'en'
    }
    else if (/^ja/i.test(language)) {
      language = 'ja'
    }
    else if (/^ru/i.test(language)) {
      language = 'ru'
    }
    else if (/^tr/i.test(language)) {
      language = 'tr'
    }
    else if (/^vi/i.test(language)) {
      language = 'vi'
    }
    else if (/^th/i.test(language)) {
      language = 'th'
    }
    else if (/^ko/i.test(language)) {
      language = 'ko'
    }

    if (charList[language]) {
      splitArr = charList[language]
    }
    else if (charList.en) {
      splitArr = charList.en
    }
  }

  if (addSuffix) {
    ACCOUNT_SUFFIX.split('')
      .forEach((char: string) => {
        splitArr.push({
          char_set_name: CHAR_TYPE.english,
          char
        })
      })
  }

  return splitArr
}

/**
 * load script
 * @param src
 * @param id
 */
export function loadScript (src: string, id: string): Promise<any> {
  const script = 'script'
  const firstScript: HTMLScriptElement = document.getElementsByTagName(script)[0]
  if (document.getElementById(id)) {
    return Promise.resolve()
  }
  const scriptElement: HTMLScriptElement = document.createElement(script)
  scriptElement.id = id
  scriptElement.src = src
  firstScript.parentNode?.insertBefore(scriptElement, firstScript)

  return new Promise((resolve, reject) => {
    scriptElement.onload = resolve
    scriptElement.onerror = reject
  })
}

/**
 * get all user agent
 */
export function getAllUserAgent () {
  const ua: string = window.navigator.userAgent.toLowerCase()

  const wechat = ua.includes('micromessenger')
  const android = ua.includes('android')
  const ios = ua.includes('iphone')
  const ipados = ua.includes('ipad')

  return {
    // app user agent
    wechat,
    weibo: ua.includes('weibo'),
    mathwallet: ua.includes('mdsapp'),
    tokenpocket: ua.includes('tokenpocket'),
    // platform user agent
    android,
    ios,
    ipados,
    mobile: android || ios,
    windows: ua.includes('windows'),
    ubuntu: ua.includes('ubuntu'),
    mac: ua.includes('mac'),
    messenger: !wechat && (
      ua.includes('messenger') ||
      ua.includes('fbav') ||
      ua.includes('fban') ||
      window.location.href.includes('fb_iframe_origin')
    )
  }
}

/**
 * detects if the given user agent is supported
 * @param uaList
 */
export function isUASupported (uaList: string[]): boolean {
  const uaMap = getAllUserAgent()
  return uaList.some(ua => (uaMap as any)[ua])
}

/**
 * detect if the visitor is coming from mobile
 */
export function isMobileDevices (): boolean {
  return isUASupported(['wechat', 'android', 'ios'])
}

/**
 * check if the current access environment is a MathWallet environment
 */
export function isMathWallet (): boolean {
  return isUASupported(['mathwallet'])
}

/**
 * check if the current access environment is a TokenPocket environment
 */
export function isTokenPocket (): boolean {
  return isUASupported(['tokenpocket'])
}

/**
 * check if the current access environment is a Coinbase Wallet environment
 */
export function isCoinbaseWallet (): boolean {
  const { ethereum } = window
  if (typeof ethereum !== 'undefined') {
    return !!ethereum.isCoinbaseWallet
  }
  else {
    return false
  }
}

/**
 * check if the current access environment is a SafePal wallet environment
 */
export function isSafePalWallet (): boolean {
  const { ethereum } = window
  if (typeof ethereum !== 'undefined') {
    return !!ethereum.isSafePal
  }
  else {
    return false
  }
}

/**
 * check if the current access environment is a ViaWallet wallet environment
 */
export function isViaWallet (): boolean {
  const { ethereum } = window
  if (typeof ethereum !== 'undefined') {
    return !!ethereum.isViaWallet
  }
  else {
    return false
  }
}

/**
 * string initial capitalization
 * @param value
 */
export function capitalize (value: string): string {
  if (value) {
    return value.replace(/^\S/, s => s.toUpperCase())
  }
  else {
    return ''
  }
}

/**
 * get mmJson hash and chainId hex
 * @param typedData
 * @param chainId
 */
export function mmJsonHashAndChainIdHex (typedData: TypedMessage<any>, chainId: number): string {
  const mmHash = TypedDataUtils.eip712Hash(typedData, SignTypedDataVersion.V4).toString('hex')
  const chainIdHex = new BN(chainId).toString(16, 16)
  return mmHash + chainIdHex
}

export function fromSatoshi (satoshi: string | number): string {
  return shrinkUnit(satoshi, CKB.decimals, TOKEN_DECIMAL_PLACES)
}

/**
 * sleep for a fixed time
 * @param ms
 */
export function sleep (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function toDottedStyle (inputAccount: string): string {
  return Das.toDottedStyle(inputAccount)
}

export function toHashedStyle (inputAccount: string): string {
  // return Das.toHashedStyle(inputAccount)
  return inputAccount
}

export function nftTokenId (account: string): string {
  const personal = Buffer.from('ckb-default-hash')
  const accountBuf = Buffer.from(account)
  const hasher = blake2b(32, null, null, personal)
  hasher.update(accountBuf)
  const hashBuffer = hasher.digest('binary') as Uint8Array
  const first20Bytes = Buffer.from(hashBuffer.slice(0, 20))
  const tokenId = new BN(first20Bytes.toString('hex'), 16).toString(10)
  return tokenId
}

export function nftTokenIdHex (account: string): string {
  const personal = Buffer.from('ckb-default-hash')
  const accountBuf = Buffer.from(account)
  const hasher = blake2b(32, null, null, personal)
  hasher.update(accountBuf)
  const hashBuffer = hasher.digest('binary') as Uint8Array
  const first20Bytes = Buffer.from(hashBuffer.slice(0, 20))
  return '0x' + first20Bytes.toString('hex')
}

export function digitalEmojiHandle (account: string): string {
  const splitter = new GraphemeSplitter()
  const split = splitter.splitGraphemes(account)
  const list = split.map((item) => {
    // @ts-ignore
    if (DigitalEmojiMap[item]) {
      // @ts-ignore
      return DigitalEmojiMap[item]
    }
    else {
      return item
    }
  })
  return list.join('')
}
