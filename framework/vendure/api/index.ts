import type { CommerceAPIConfig } from '@commerce/api'

import {
  API_URL,
  API_TOKEN,
  VENDURE_CHECKOUT_ID_COOKIE,
  VENDURE_CUSTOMER_TOKEN_COOKIE,
  VENDURE_COOKIE_EXPIRE,
} from '../const'

if (!API_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_VENDURE_STORE_DOMAIN is missing and it's required to access your store`
  )
}

if (!API_TOKEN) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_VENDURE_STOREFRONT_ACCESS_TOKEN is missing and it's required to access your store`
  )
}

import fetchGraphqlApi from './utils/fetch-graphql-api'

export interface VendureConfig extends CommerceAPIConfig {}

export class Config {
  private config: VendureConfig

  constructor(config: VendureConfig) {
    this.config = config
  }

  getConfig(userConfig: Partial<VendureConfig> = {}) {
    return Object.entries(userConfig).reduce<VendureConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<VendureConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const config = new Config({
  locale: 'en-US',
  commerceUrl: API_URL,
  apiToken: API_TOKEN!,
  cartCookie: VENDURE_CHECKOUT_ID_COOKIE,
  cartCookieMaxAge: VENDURE_COOKIE_EXPIRE,
  fetch: fetchGraphqlApi,
  customerCookie: VENDURE_CUSTOMER_TOKEN_COOKIE,
})

export function getConfig(userConfig?: Partial<VendureConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<VendureConfig>) {
  return config.setConfig(newConfig)
}
