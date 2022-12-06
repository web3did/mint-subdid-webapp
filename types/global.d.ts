// eslint-disable-next-line @typescript-eslint/naming-convention
interface Window {
  // @ts-ignore
  i18n: any
  ethereum: any
  web3: any
  tronWeb: any
  WalletConnect: any
  WalletConnectQRCodeModal: any
  eruda: any
}

// polyfill EventTarget for input event
// eslint-disable-next-line @typescript-eslint/naming-convention
interface EventTarget {
  value: string,
}
