import { useProductActions } from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Button from "@modules/common/components/button"
import OptionSelect from "@modules/products/components/option-select"
import clsx from "clsx"
import Link from "next/link"
import React, { useMemo } from "react"
import { useMeCustomer } from "medusa-react"
import useToggleState from "@lib/hooks/use-toggle-state"
import WishlistItemAdd from "../wishlist-item-add"

type ProductActionsProps = {
  product: PricedProduct
  wishlist: any
  refetch: any
}

interface FormValues {
  wishlist_name_id: string
}
const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  wishlist,
  refetch,
}) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  const { customer } = useMeCustomer()
  const price = useProductPrice({ id: product.id!, variantId: variant?.id })
  const { state, open, close } = useToggleState(false)
  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const addtoWishlistItem = () => {
    if (!customer) {
      return alert("You Must Login!")
    } else if (!variant) {
      return alert("You Must Select Variant!")
    } else {
      refetch()
      open()
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      {product.collection && (
        <Link
          href={`/collections/${product.collection.handle}`}
          className="text-small-regular text-gray-700"
        >
          {product.collection.title}
        </Link>
      )}
      <h3 className="text-xl-regular">{product.title}</h3>

      <p className="text-base-regular">{product.description}</p>

      {product.variants.length > 1 && (
        <div className="my-8 flex flex-col gap-y-6">
          {(product.options || []).map((option) => {
            return (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                  title={option.title}
                />
              </div>
            )
          })}
        </div>
      )}

      <div className="mb-4">
        {selectedPrice ? (
          <div className="flex flex-col text-gray-700">
            <span
              className={clsx("text-xl-semi", {
                "text-rose-600": selectedPrice.price_type === "sale",
              })}
            >
              {selectedPrice.calculated_price}
            </span>
            {selectedPrice.price_type === "sale" && (
              <>
                <p>
                  <span className="text-gray-500">Original: </span>
                  <span className="line-through">
                    {selectedPrice.original_price}
                  </span>
                </p>
                <span className="text-rose-600">
                  -{selectedPrice.percentage_diff}%
                </span>
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <Button onClick={addToCart}>
        {!inStock ? "Out of stock" : "Add to cart"}
      </Button>

      <Button variant="secondary" onClick={() => addtoWishlistItem()}>
        Add to Wishlist
      </Button>
      <WishlistItemAdd
        isOpen={state}
        close={close}
        wishlist={wishlist}
        refetch={refetch}
        product={product}
        variant={variant}
      />
    </div>
  )
}

export default ProductActions
