import Modal from "@modules/common/components/modal"
import Button from "@modules/common/components/button"
import NativeSelect from "@modules/common/components/native-select"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useFetchWishlist } from "@lib/hooks/use-wishlist"
import { useProductActions } from "@lib/context/product-context"
import React from "react"

type WishlistItemAddProps = {
  isOpen: boolean
  close: () => void
  variant: any
}

interface FormValues {
  wishlist_name_id: string
}

const WishlistItemAdd = ({ isOpen, close, variant }: WishlistItemAddProps) => {
  const { data: wishlist } = useFetchWishlist()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>()
  const selectWishlistName = watch("wishlist_name_id")

  const { onCreateWishlistItem } = useProductActions()

  const onSubmit = async (data: any) => {
    const wishlistNameId = data.wishlist_name_id
    const payload = {
      variant_id: variant?.id,
    }
    onCreateWishlistItem({
      wishlist_name_id: wishlistNameId,
      variant_id: payload.variant_id,
    })
    reset()
    close()
  }

  const isProductInWishlist = () => {
    if (!wishlist?.wishlist) return false

    for (const item of wishlist?.wishlist) {
      const matchingWishlistItems = item.wishlists.filter(
        (wishlistitem: any) =>
          wishlistitem.variant_id === variant?.id &&
          wishlistitem.wishlist_name_id === selectWishlistName
      )

      if (matchingWishlistItems.length > 0) {
        return true
      }
    }

    return false
  }

  return (
    <Modal
      size="small"
      isOpen={isOpen}
      close={() => {
        close()
        reset()
      }}
    >
      <Modal.Title>Choose Wishlist</Modal.Title>

      <Modal.Body>
        <div className="grid grid-cols-1 gap-y-2">
          <form
            className="flex flex-col gap-y-5 mb-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <NativeSelect
              {...register("wishlist_name_id", {
                required: "Wishlist is required",
              })}
              required
              errors={errors}
            >
              {wishlist?.wishlist &&
                wishlist?.wishlist.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
            </NativeSelect>
            {isProductInWishlist() ? (
              <div className="bg-red-200 text-red-500 p-3 rounded">
                Product has been added to wishlist
              </div>
            ) : (
              <Button type="submit">Save</Button>
            )}
          </form>
          <Link
            href="/account/wishlist"
            className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
          >
            <Button variant="secondary" className="font-semibold">
              Or Create WishlistName
            </Button>
          </Link>
        </div>
        {errors &&
          Object.values(errors).map((error, index) => (
            <div key={index} className="text-rose-500 text-small-regular py-2">
              {error.message}
            </div>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WishlistItemAdd
