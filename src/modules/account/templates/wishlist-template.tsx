"use client"
import { useFetchWishlist } from "@lib/hooks/use-wishlist"
import WishlistAdd from "../components/wishlist-add"
import Spinner from "@modules/common/icons/spinner"
import WishlistCard from "../components/wishlist-card"
import { useEffect } from "react"
import { WishlistProvider } from "@lib/context/wishlist-context"
const WishlistTemplate = () => {
  const {
    data: wishlist,
    isLoading: loadingWishlist,
    refetch: refetchWishlist,
  } = useFetchWishlist()

  useEffect(() => {
    refetchWishlist()
  }, [refetchWishlist])

  return (
    <WishlistProvider>
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-y-4">
          <h1 className="text-2xl-semi">Wishlist</h1>
          <p className="text-base-regular">Manage Your Wishlist in Here</p>
        </div>
        <div className="flex flex-col mb-5">
          <h3 className="text-large-semi mb-3">Create Wishlist</h3>
          <WishlistAdd />
        </div>
        {loadingWishlist && (
          <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
            <Spinner size={24} />
          </div>
        )}
        <h3 className="text-large-semi">Your Wishlist</h3>
        <div className="flex flex-col gap-y-2 mt-3">
          <WishlistCard wishlist={wishlist} />
        </div>
      </div>
    </WishlistProvider>
  )
}

export default WishlistTemplate
