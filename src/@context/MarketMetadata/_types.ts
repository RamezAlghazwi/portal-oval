export interface OpcFee {
  chainId: number
  swapNotApprovedFee: string
  swapApprovedFee: string
  approvedTokens: string[]
}

export interface AppConfig {
  metadataCacheUri: string
  complianceUri: string
  complianceApiVersion: string
  infuraProjectId: string
  chainIds: number[]
  chainIdsSupported: number[]
  defaultDatatokenTemplateIndex: number
  marketFeeAddress: string
  publisherMarketOrderFee: string
  publisherMarketFixedSwapFee: string
  consumeMarketOrderFee: string
  consumeMarketFixedSwapFee: string
  currencies: string[]
  coingeckoTokenIds: string[]
  allowFixedPricing: string
  allowDynamicPricing: string
  allowFreePricing: string
  defaultPrivacyPolicySlug: string
  privacyPreferenceCenter: string
  darkModeConfig: {
    classNameDark: string
    classNameLight: string
    storageKey: string
  }
  defaultAccessTerms: string
}
export interface SiteContent {
  siteTitle: string
  siteTagline: string
  siteUrl: string
  siteImage: string
  copyright: string
  menu: {
    name: string
    link?: string
    subItems?: {
      name: string
      link?: string
      subItems?: {
        name: string
        link: string
      }[]
    }[]
  }[]
  announcement: string
  warning: {
    ctd: string
  }
  footer: {
    subtitle: string
    copyright: string
    privacyTitle: string
    content: {
      title: string
      links: {
        name: string
        link: string
      }[]
    }[]
  }
}

export interface MarketMetadataProviderValue {
  opcFees: OpcFee[]
  siteContent: SiteContent
  appConfig: AppConfig
  getOpcFeeForToken: (tokenAddress: string, chainId: number) => string
}
