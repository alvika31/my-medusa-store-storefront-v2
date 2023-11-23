import Input from "@modules/common/components/input"
import Button from "@modules/common/components/button"
import { useForm, SubmitHandler } from "react-hook-form"
import { Disclosure } from "@headlessui/react"
import clsx from "clsx"
import { useWishlist } from "@lib/context/wishlist-context"

interface FormValues {
  title?: string
}

const WishlistAdd: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()
  const { addWishlistName, isSuccess } = useWishlist()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = {
      title: data?.title || "",
    }
    addWishlistName(payload)
    reset()
  }

  return (
    <>
      {isSuccess?.type === "create" && isSuccess?.status === true && (
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
              <span>Wishlist created succesfully</span>
            </div>
          </Disclosure.Panel>
        </Disclosure>
      )}
      <form
        className="w-full flex flex-col gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Wishlist"
          {...register("title", {
            required: "Wishlist is required",
          })}
          required
          errors={errors}
          autoComplete="given-wishlist"
        />
        <Button type="submit" className="w-full small:max-w-[140px]">
          Save
        </Button>
      </form>
    </>
  )
}

export default WishlistAdd
