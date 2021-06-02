import * as React from 'react'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { vendureProvider, VendureProvider } from './provider'
import { VENDURE_CHECKOUT_ID_COOKIE } from './const'

export { vendureProvider }
export type { VendureProvider }

export const vendureConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: VENDURE_CHECKOUT_ID_COOKIE,
}

export type VendureConfig = Partial<CommerceConfig>

export type VendureProps = {
  children?: ReactNode
  locale: string
} & VendureConfig

export function CommerceProvider({ children, ...config }: VendureProps) {
  return (
    <CoreCommerceProvider
      // TODO: Fix this type
      provider={vendureProvider as any}
      config={{ ...vendureConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
