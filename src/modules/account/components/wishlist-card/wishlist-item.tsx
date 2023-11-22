import Image from "next/image"
import Trash from "@modules/common/icons/trash"
import React from "react"
import LineItemOptions from "@modules/common/components/line-item-options"
import { useRegions } from "medusa-react"
import { formatAmount } from "medusa-react"
import { useWishlist } from "@lib/context/wishlist-context"

const WishlistItem = ({ wishlist }: any) => {
  const { regions } = useRegions()
  const { onDeleteWishlisItem } = useWishlist()

  const confirmDeleteWishlistItem = (id: any) => {
    const shouldDelete = confirm("Are You Sure")
    if (shouldDelete) {
      onDeleteWishlisItem({ id })
    }
  }
  return (
    <div className="my-3">
      <p className="text-base-regular font-medium mt-2">Item Wishlist: </p>

      {wishlist.map(
        (item: {
          products: any
          id: string
          title: string
          variant: any
          thumbnail: string
          quantity: number
        }) => (
          <div key={item.id}>
            <div className="flex gap-x-3 mt-4 justify-between">
              <div className="flex gap-x-3">
                <Image
                  src={item?.variant?.product?.thumbnail}
                  width={100}
                  height={100}
                  alt={item?.variant?.product?.title}
                  sizes=""
                />
                {item?.variant?.inventory_quantity === 0 && (
                  <div className="absolute px-4 py-1 bg-red-500 text-white text-xs">
                    Out Of Stock
                  </div>
                )}

                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium">
                      {item?.variant?.product?.title}
                    </p>
                    <LineItemOptions variant={item?.variant} />

                    {item.variant?.prices.map((price: any, index: number) => {
                      const matchingRegion = regions?.find(
                        (region) => region.currency_code === price.currency_code
                      )
                      return (
                        <div key={index}>
                          <p className="text-small-regular text-gray-700">
                            Unit Price:{" "}
                            {matchingRegion &&
                              formatAmount({
                                amount: price.amount || 0,
                                region: matchingRegion,
                                includeTaxes: false,
                              })}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                  <button
                    className="text-small-regular text-gray-700 flex items-center gap-x-2"
                    onClick={() => confirmDeleteWishlistItem(item.id)}
                  >
                    <Trash />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default WishlistItem
