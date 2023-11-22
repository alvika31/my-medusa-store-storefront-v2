import { useQuery } from "@tanstack/react-query"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import axios from "axios"

export const useFetchWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const wishlistResponse = await axios.get(
        `${MEDUSA_BACKEND_URL}/store/wishlist/customer`,
        {
          withCredentials: true,
        }
      )
      return wishlistResponse.data
    },
  })
}
