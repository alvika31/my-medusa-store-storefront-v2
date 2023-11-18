import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { MEDUSA_BACKEND_URL } from "@lib/config"

export const useDeleteWishlist = ({ onSuccess }: any) => {
  return useMutation({
    mutationFn: async (id) => {
      const wishlistResponse = await axios.delete(
        `${MEDUSA_BACKEND_URL}/store/wishlist/${id}`,
        {
          withCredentials: true,
        }
      )
      return wishlistResponse
    },
    onSuccess,
  })
}
