export interface ILanguageOption {
  text: string,
  symbol: string,
  value: string,
  matcher: RegExp,
}

export const LANGUAGE = {
  en: 'en',
  zhCN: 'zh-CN'
}

export const LanguageOptions: ILanguageOption[] = [{
  text: 'English',
  symbol: 'EN',
  value: LANGUAGE.en,
  matcher: /en/i
}, {
  text: '简体中文',
  symbol: 'CN',
  value: LANGUAGE.zhCN,
  matcher: /(^zh$|cn|hans)/i
}]
