export const VENDURE_CHECKOUT_ID_COOKIE = 'vendure_checkoutId'

export const VENDURE_CHECKOUT_URL_COOKIE = 'vendure_checkoutUrl'

export const VENDURE_CUSTOMER_TOKEN_COOKIE = 'vendure_customerToken'

export const STORE_DOMAIN = process.env.NEXT_PUBLIC_VENDURE_STORE_DOMAIN

export const VENDURE_COOKIE_EXPIRE = 30

export const API_URL = `https://${STORE_DOMAIN}/shop-api`

export const API_TOKEN = process.env.NEXT_PUBLIC_VENDURE_STOREFRONT_ACCESS_TOKEN
