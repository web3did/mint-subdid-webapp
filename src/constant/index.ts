import config from '~~/config'

export const IDENTICON_SERVE = config.identiconServe

export const DEBOUNCE_WAIT_TIME = 600

export const CYCLE_CALL_FUNCTION_TIME = 5000

export const TOAST_DURATION_TIME = 1000

export const ACCOUNT_SUFFIX = '.bit'

// number of decimal places to keep for token amount
export const TOKEN_DECIMAL_PLACES = 8

// number of decimal places to retain the amount
export const FIAT_DECIMAL_PLACES = 2

export const TIME_FORMAT = {
  fullDateTime: 'YYYY-MM-DD HH:mm:ss',
  fullDate: 'YYYY-MM-DD',
  MMDDHHMM: 'MM-DD HH:mm'
}

export const DEFAULT_PAGE_SIZE = 50

export enum ACCOUNT_STATUS {
  notOpenRegister= -1,
  registerable,
  registeringPaymentConfirm,
  registeringLockedAccount,
  registering,
  registeringIncludeProposal,
  registeringConfirmProposal,
  registered,
  reservedAccount,
  onePriceSell,
  auctionSell,
  candidateAccount,
  expired,
  othersRegistering,
  unavailableAccount,
  subAccountNotCreated,
  onCross
}

export enum TRX_STATUS {
  failed = -1,
  pending,
  success,
  unpackaged,
  unknown
}

export enum WalletProtocol {
  metaMask = 'metaMask',
  tronLink = 'tronLink',
  torus = 'torus',
  uniSign = 'uniSign',
  walletConnect = 'walletConnect'
}

export enum CHAR_TYPE {
  emoji = 0,
  number = 1,
  english = 2,
  simplifiedChinese = 3,
  traditionalChinese,
  japanese,
  korean,
  russian,
  turkish,
  thai,
  vietnamese,
  unknown = 99
}

export const ORDER_ACTION_TYPE = {
  applyRegister: 'apply_register',
  setDasReverse: 8,
  editDasReverse: 9,
  deleteDasReverse: 10,
  editRecords: 12
}

export enum CrossDirection {
  fromCKB,
  toCKB
}

export const ACCOUNT_TABS = {
  nfts: 'nfts',
  bit: 'bit'
}

export const CrossEthContract = config.isProdData ? '0x60eB332Bd4A0E2a9eEB3212cFdD6Ef03Ce4CB3b5' : '0x7eCBEE03609f353d041942FF50CdA2A120ABddd9'
export const CrossEthGnosisAddress = config.isProdData ? '0x513EF3F0d5259a0819370459A86930d047Bf8E9d' : '0xd51D9Bc5F462e825e59CCae110675E96519F36Aa'

export enum MintEthNftStep {
  one = 1,
  two = 2,
  succeed = 3,
}

export enum MintEthNftStatus {
  lockPending = 0,
  lockConfirm = 1,
  lockRejected = 2,
  mintSign = 3,
  mintPending = 4,
  mintConfirm = 5,
  mintFailed = 6
}

export enum DigitalEmojiMap {
  '0⃣️' = '0️⃣',
  '1⃣️' = '1️⃣',
  '2⃣️' = '2️⃣',
  '3⃣️' = '3️⃣',
  '4⃣️' = '4️⃣',
  '5⃣️' = '5️⃣',
  '6⃣️' = '6️⃣',
  '7⃣️' = '7️⃣',
  '8⃣️' = '8️⃣',
  '9⃣️' = '9️⃣',
  '0⃣' = '0️⃣',
  '1⃣' = '1️⃣',
  '2⃣' = '2️⃣',
  '3⃣' = '3️⃣',
  '4⃣' = '4️⃣',
  '5⃣' = '5️⃣',
  '6⃣' = '6️⃣',
  '7⃣' = '7️⃣',
  '8⃣' = '8️⃣',
  '9⃣' = '9️⃣'
}

export enum AccountRegisterStatus {
  none,
  registering,
  registered,
}
