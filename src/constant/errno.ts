export default {
  success: 0,
  serverError: 500,
  networkError: -1,
  // MetaMask
  metaMaskWalletRequestPermissions: -32002,
  metaMaskUserRejectedAccountAccess: -32603,
  metaMaskUserDeniedMessageSignature: 4001,
  // WalletConnect
  walletConnectUserRejectedTheTransaction: 'User rejected the transaction',
  walletConnectInsufficientFundsForTransfer: 'insufficient funds for transfer',
  // TronLink
  tronLinkConfirmationDeclinedByUser: 'Confirmation declined by user',
  tronLinkInsufficientBalance: 'class org.tron.core.exception.ContractValidateException : Validate TransferContract error, no OwnerAccount.',
  tronLinkTypeErrorAddUpdateDataNotFunction: 'transactionBuilder.addUpdateData',
  tronLinkAuthorizationRequestsAreBeingProcessed: 4000,
  // imToken
  imTokenUserCanceled: 'user_canceled',
  // coinbase wallet
  coinbaseWalletUsingMultipleWallet: 'Request method eth_chainId is not supported',
  // Portal Wallet
  portalWalletInsufficientBalance: 'input capacity not enough',
  portalWalletValidationFailure: 'ValidationFailure(-31)',
  // rpc api error
  rpcApiErrInvalidCharset: 2002,
  rpcApiTooManyAccountsForSameAddress: 2003
}
