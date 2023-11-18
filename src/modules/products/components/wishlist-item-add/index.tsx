import Modal from "@modules/common/components/modal"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import NativeSelect from "@modules/common/components/native-select"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useCreateWishlistItem } from "@lib/hooks/use-create-wishlist-item"

type WishlistItemAddProps = {
  isOpen: boolean
  close: () => void
  wishlist: any
  refetch: any
  product: any
  variant: any
}

interface FormValues {
  wishlist_name_id: string
}

const WishlistItemAdd = ({
  isOpen,
  close,
  wishlist,
  refetch,
  product,
  variant,
}: WishlistItemAddProps) => {
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const { mutate } = useCreateWishlistItem()

  const onSubmit = async (data: any) => {
    try {
      const wishlistNameId = data.wishlist_name_id
      const payload = {
        product_id: product.id,
        variant_id: variant?.id,
      }

      await mutate(
        { payload, wishlistNameId },
        {
          onSuccess: () => {
            reset()
            refetch()
            close()
            alert("Product successfully added to wishlist")
            setSubmitting(false)
          },
          onError: (error: any) => {
            reset()
            if (
              error?.response?.status === 400 &&
              error?.response?.data?.message === "Wishlist already exists"
            ) {
              alert("Wishlist already exists")
            } else {
              alert("Failed to add product to wishlist")
              console.log(error)
            }
          },
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal size="small" isOpen={isOpen} close={close}>
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
            <Button disabled={submitting}>
              Save
              {submitting && <Spinner />}
            </Button>
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
