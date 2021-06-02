## Table of Contents

- [Getting Started](#getting-started)
  - [Modifications](#modifications)
    - [Adding item to Cart](#adding-item-to-cart)
    - [Proceed to Checkout](#proceed-to-checkout)
- [General Usage](#general-usage)
  - [CommerceProvider](#commerceprovider)
  - [useCommerce](#usecommerce)
- [Hooks](#hooks)
  - [usePrice](#useprice)
  - [useAddItem](#useadditem)
  - [useRemoveItem](#useremoveitem)
  - [useUpdateItem](#useupdateitem)
- [APIs](#apis)
  - [getProduct](#getproduct)
  - [getAllProducts](#getallproducts)
  - [getAllCollections](#getallcollections)
  - [getAllPages](#getallpages)

# Vendure Storefront Data Hooks

Collection of hooks and data fetching functions to integrate Vendure in a React application. Designed to work with [Next.js Commerce](https://demo.vercel.store/).

## Getting Started

1. Install dependencies:

```
yarn install vendure-buy
yarn install -D @types/vendure-buy
```

3. Environment variables need to be set:

```
VENDURE_STORE_DOMAIN=
VENDURE_STOREFRONT_ACCESS_TOKEN=
NEXT_PUBLIC_VENDURE_STORE_DOMAIN=
NEXT_PUBLIC_VENDURE_STOREFRONT_ACCESS_TOKEN=
```

4. Point the framework to `vendure` by updating `tsconfig.json`:

```
"@framework/*": ["framework/vendure/*"],
"@framework": ["framework/vendure"]
```

### Modifications

These modifications are temporarily until contributions are made to remove them.

#### Adding item to Cart

```js
// components/product/ProductView/ProductView.tsx
const ProductView: FC<Props> = ({ product }) => {
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: product.id,
        variantId: variant ? variant.id : product.variants[0].id,
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
}
```

#### Proceed to Checkout

```js
// components/cart/CartSidebarView/CartSidebarView.tsx
import { useCommerce } from '@framework'

const CartSidebarView: FC = () => {
  const { checkout } = useCommerce()
  return (
    <Button href={checkout.webUrl} Component="a" width="100%">
      Proceed to Checkout
    </Button>
  )
}
```

## General Usage

### CommerceProvider

Provider component that creates the commerce context for children.

```js
import { CommerceProvider } from '@framework'

const App = ({ children }) => {
  return <CommerceProvider locale={locale}>{children}</CommerceProvider>
}

export default App
```

### useCommerce

Returns the configs that are defined in the nearest `CommerceProvider`. Also provides access to Vendure's `checkout` and `shop`.

```js
import { useCommerce } from 'nextjs-commerce-vendure'

const { checkout, shop } = useCommerce()
```

- `checkout`: The information required to checkout items and pay ([Documentation](https://vendure.dev/docs/storefront-api/reference/checkouts/checkout)).
- `shop`: Represents a collection of the general settings and information about the shop ([Documentation](https://vendure.dev/docs/storefront-api/reference/online-store/shop/index)).

## Hooks

### usePrice

Display the product variant price according to currency and locale.

```js
import usePrice from '@framework/product/use-price'

const { price } = usePrice({
  amount,
})
```

Takes in either `amount` or `variant`:

- `amount`: A price value for a particular item if the amount is known.
- `variant`: A vendure product variant. Price will be extracted from the variant.

### useAddItem

```js
import { useAddItem } from '@framework/cart'

const AddToCartButton = ({ variantId, quantity }) => {
  const addItem = useAddItem()

  const addToCart = async () => {
    await addItem({
      variantId,
    })
  }

  return <button onClick={addToCart}>Add To Cart</button>
}
```

### useRemoveItem

```js
import { useRemoveItem } from '@framework/cart'

const RemoveButton = ({ item }) => {
  const removeItem = useRemoveItem()

  const handleRemove = async () => {
    await removeItem({ id: item.id })
  }

  return <button onClick={handleRemove}>Remove</button>
}
```

### useUpdateItem

```js
import { useUpdateItem } from '@framework/cart'

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const updateItem = useUpdateItem(item)

  const updateQuantity = async (e) => {
    const val = e.target.value
    await updateItem({ quantity: val })
  }

  return (
    <input
      type="number"
      max={99}
      min={0}
      value={quantity}
      onChange={updateQuantity}
    />
  )
}
```

## APIs

Collections of APIs to fetch data from a Vendure store.

The data is fetched using the [Vendure JavaScript Buy SDK](https://github.com/Vendure/js-buy-sdk#readme). Read the [Vendure Storefront API reference](https://vendure.dev/docs/storefront-api/reference) for more information.

### getProduct

Get a single product by its `handle`.

```js
import getProduct from '@framework/product/get-product'
import { getConfig } from '@framework/api'

const config = getConfig()

const product = await getProduct({
  variables: { slug },
  config,
})
```

### getAllProducts

```js
import getAllProducts from '@framework/product/get-all-products'
import { getConfig } from '@framework/api'

const config = getConfig()

const { products } = await getAllProducts({
  variables: { first: 12 },
  config,
})
```

### getAllCollections

```js
import getAllCollections from '@framework/product/get-all-collections'
import { getConfig } from '@framework/api'

const config = getConfig()

const collections = await getAllCollections({
  config,
})
```

### getAllPages

```js
import getAllPages from '@framework/common/get-all-pages'
import { getConfig } from '@framework/api'

const config = getConfig()

const pages = await getAllPages({
  variables: { first: 12 },
  config,
})
```
