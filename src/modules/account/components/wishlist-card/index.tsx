import Trash from "@modules/common/icons/trash"
import Edit from "@modules/common/icons/edit"
import Package from "@modules/common/icons/package"
import { useState } from "react"
import { Disclosure } from "@headlessui/react"
import clsx from "clsx"
import useToggleState from "@lib/hooks/use-toggle-state"
import { useForm } from "react-hook-form"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import WishlistItem from "./wishlist-item"
import Link from "next/link"
import { useWishlist } from "@lib/context/wishlist-context"

type FormValues = {
  title: string
}
const defaultFormValues = {
  title: undefined,
}
const WishlistCard = ({ wishlist }: any) => {
  const { state, open, close } = useToggleState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState<string | undefined>(undefined)
  const { isSuccess, onDeleteWishlistName, onUpdateWishlistName } =
    useWishlist()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
  })

  const onEditClik = (item: any) => {
    setValue("title", item.title || undefined)
    setId(item.id)
    open()
  }

  const submit = handleSubmit(async (data: FormValues) => {
    setError(undefined)

    const payload = {
      title: data.title,
      id: id,
    }
    onUpdateWishlistName(payload)
    close()
  })

  const confirmDeleteWishlist = (id: any) => {
    const shouldDelete = confirm("Are You Sure?")
    if (shouldDelete) {
      onDeleteWishlistName({ id })
    }
  }

  return (
    <>
      {wishlist?.wishlist.length === 0 && (
        <div className="bg-red-200 text-red-500 p-3 rounded">
          Wishlist Is Empty
        </div>
      )}
      {isSuccess.type === "delete" && isSuccess.status === true && (
        <Disclosure>
          <Disclosure.Panel
            static
            className={clsx(
              "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
              {
                "max-h-[1000px] opacity-100": isSuccess,
                "max-h-0 opacity-0": !isSuccess,
              }
            )}
          >
            <div className="bg-green-100 text-green-500 p-4 my-4">
              <span>Wishlist deleted succesfully</span>
            </div>
          </Disclosure.Panel>
        </Disclosure>
      )}
      {isSuccess?.type === "delete-item" && isSuccess?.status === true && (
        <Disclosure>
          <Disclosure.Panel
            static
            className={clsx(
              "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
              {
                "max-h-[1000px] opacity-100": isSuccess,
                "max-h-0 opacity-0": !isSuccess,
              }
            )}
          >
            <div className="bg-green-100 text-green-500 p-4 my-4">
              <span>Wishlist item deleted succesfully</span>
            </div>
          </Disclosure.Panel>
        </Disclosure>
      )}
      {isSuccess.type === "update" && isSuccess.status === true && (
        <Disclosure>
          <Disclosure.Panel
            static
            className={clsx(
              "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
              {
                "max-h-[1000px] opacity-100": isSuccess,
                "max-h-0 opacity-0": !isSuccess,
              }
            )}
          >
            <div className="bg-green-100 text-green-500 p-4 my-4">
              <span>Wishlist updated succesfully</span>
            </div>
          </Disclosure.Panel>
        </Disclosure>
      )}
      {wishlist?.wishlist.map(
        (
          item: {
            id: string
            title: string
            wishlists: any
            total: number
          },
          index: number
        ) => (
          <div key={item.id}>
            <div className="bg-gray-100 p-3 rounded flex flex-col sm:flex-row justify-between sm:items-center gap-y-3">
              <p className="text-base-regular font-medium">
                {" "}
                {index + 1}. {item.title}
              </p>
              <div className="flex items-center gap-x-4">
                <Link
                  href="/store"
                  className="text-small-regular text-gray-700 flex items-center gap-x-2"
                >
                  <Package size={16} />
                  Add Product
                </Link>
                <button
                  onClick={() => onEditClik(item)}
                  className="text-small-regular text-gray-700 flex items-center gap-x-2"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  className="text-small-regular text-gray-700 flex items-center gap-x-2"
                  onClick={() => confirmDeleteWishlist(item.id)}
                >
                  <Trash />
                  Remove
                </button>
              </div>
            </div>
            <WishlistItem wishlist={item.wishlists} />
            {item.wishlists.length === 0 && (
              <div className="bg-red-200 text-red-500 p-3 rounded">
                Wishlist Items Is Empty
              </div>
            )}
          </div>
        )
      )}
      <Modal isOpen={state} close={close}>
        <Modal.Title>Edit Wishlist</Modal.Title>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-y-2">
            <Input
              label="Title"
              {...register("title", {
                required: "Title is required",
              })}
              required
              errors={errors}
              autoComplete="given-name"
            />
          </div>
          {error && (
            <div className="text-rose-500 text-small-regular py-2">{error}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button onClick={submit}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default WishlistCard
