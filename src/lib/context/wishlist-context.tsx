"use client"
import React, { createContext, useContext, useState } from "react"
import { useCreateWishlistName } from "@lib/hooks/use-create-wishlist-name"
import { useFetchWishlist } from "@lib/hooks/use-wishlist"
import { useDeleteWishlist } from "@lib/hooks/use-delete-wishlist"
import { useUpdateWishlist } from "@lib/hooks/use-update-wishlist"
import { useDeleteWishlistItem } from "@lib/hooks/use-delete-wishlist-item"

interface VariantInfoProps {
  title: string
  customer_id: string
}
interface wishlistInfoProps {
  id: string
}
interface UpdateInfoProps {
  id: string
  title: string
}
interface wishlistItemInfoProps {
  id: string
}

interface WishlistContext {
  addWishlistName: (item: VariantInfoProps) => void
  isSuccess: {
    type: string
    status: boolean
  }
  onDeleteWishlistName: (item: wishlistInfoProps) => void
  onUpdateWishlistName: (item: UpdateInfoProps) => void
  onDeleteWishlisItem: (item: wishlistItemInfoProps) => void
}

const WishlistContext = createContext<WishlistContext | null>(null)

export const useWishlist = (): WishlistContext => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

interface WishlistProviderProps {
  children: React.ReactNode
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const { refetch } = useFetchWishlist()
  const [isSuccess, setIsSuccess] = useState({
    type: "",
    status: false,
  })
  const createWishlistNameMutation = useCreateWishlistName()
  const { mutate: deleteWishlistNameMutation } = useDeleteWishlist()
  const { mutate: deleteWishlistItemMutation } = useDeleteWishlistItem()
  const { mutate: updateWishlistMutation } = useUpdateWishlist()

  const addWishlistName = async ({ title, customer_id }: VariantInfoProps) => {
    try {
      await createWishlistNameMutation.mutate(
        { title, customer_id },
        {
          onSuccess: () => {
            refetch()
            setIsSuccess({
              type: "create",
              status: true,
            })
            setTimeout(() => {
              setIsSuccess({
                type: "create",
                status: false,
              })
            }, 2000)
          },
        }
      )
    } catch (error) {
      console.error(error)
      setIsSuccess({
        type: "create",
        status: false,
      })
    }
  }

  const onDeleteWishlistName = async ({ id }: wishlistInfoProps) => {
    try {
      await deleteWishlistNameMutation(id, {
        onSuccess: () => {
          refetch()
          setIsSuccess({
            type: "delete",
            status: true,
          })
          setTimeout(() => {
            setIsSuccess({
              type: "delete",
              status: false,
            })
          }, 2000)
        },
        onError: (error: any) => {
          setIsSuccess({
            type: "delete",
            status: false,
          })
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
  const onDeleteWishlisItem = async ({ id }: wishlistItemInfoProps) => {
    try {
      await deleteWishlistItemMutation(id, {
        onSuccess: () => {
          refetch()
          setIsSuccess({
            type: "delete-item",
            status: true,
          })
          setTimeout(() => {
            setIsSuccess({
              type: "delete-item",
              status: false,
            })
          }, 2000)
        },
        onError: (error: any) => {
          setIsSuccess({
            type: "delete-item",
            status: false,
          })
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onUpdateWishlistName = async ({ id, title }: UpdateInfoProps) => {
    try {
      await updateWishlistMutation(
        { id, title },
        {
          onSuccess: () => {
            refetch()
            setIsSuccess({
              type: "update",
              status: true,
            })

            setTimeout(() => {
              setIsSuccess({
                type: "update",
                status: false,
              })
            }, 2000)
          },
        }
      )
    } catch (error) {
      console.error(error)
      setIsSuccess({
        type: "update",
        status: false,
      })
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        addWishlistName,
        isSuccess,
        onDeleteWishlistName,
        onUpdateWishlistName,
        onDeleteWishlisItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
