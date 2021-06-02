import * as Core from '@commerce/types'

// TODO: this type should match:
// https://www.vendure.io/docs/graphql-api/shop/queries/#order
export type VendureCart = {
  id: string
  code?: string
  customer: {
    id: number
    firstName: string
    lastName: string
    emailAddress: string
  }
  currencyCode: { code: string }
  subTotal: number
  subTotalWithTax: number
  totalQuantity: number
  lines: {
    createdAt: string
    productVariant: {
      id: any
      productId: any
      sku: string
      price: number
    }
  }[]
  createdAt: string
  discounts?: { adjustmentSource: string; amount: number, amountWithTax: number }[]
  // TODO: add missing fields
}

export type Cart = Core.Cart & {
  lineItems: LineItem[]
}

export type LineItem = Core.LineItem

/**
 * Cart mutations
 */

export type OptionSelections = {
  option_id: number
  option_value: number | string
}

export type CartItemBody = Core.CartItemBody & {
  productId: string // The product id is always required for BC
  optionSelections?: OptionSelections
}

export type GetCartHandlerBody = Core.GetCartHandlerBody

export type AddCartItemBody = Core.AddCartItemBody<CartItemBody>

export type AddCartItemHandlerBody = Core.AddCartItemHandlerBody<CartItemBody>

export type UpdateCartItemBody = Core.UpdateCartItemBody<CartItemBody>

export type UpdateCartItemHandlerBody = Core.UpdateCartItemHandlerBody<CartItemBody>

export type RemoveCartItemBody = Core.RemoveCartItemBody

export type RemoveCartItemHandlerBody = Core.RemoveCartItemHandlerBody
