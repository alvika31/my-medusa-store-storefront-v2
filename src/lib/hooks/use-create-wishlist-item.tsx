import { MEDUSA_BACKEND_URL } from "@lib/config"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"

export const useCreateWishlistItem = () => {
  return useMutation({
    mutationFn: async ({ payload, wishlistNameId }: any) => {
      try {
        const response = await axios.post(
          `${MEDUSA_BACKEND_URL}/store/wishlist/${wishlistNameId}/wishlist-item`,
          payload,
          {
            withCredentials: true,
          }
        )
        return response.data
      } catch (error) {
        throw error
      }
    },
  })
}
