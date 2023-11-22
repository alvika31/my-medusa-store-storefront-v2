import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { MEDUSA_BACKEND_URL } from "@lib/config"

// export const useDeleteWishlistItem = ({ onSuccess }: any) => {
//   return useMutation({
//     mutationFn: async (id) => {
//       const wishlistResponse = await axios.delete(
//         `${MEDUSA_BACKEND_URL}/store/wishlist-item/${id}`,
//         {
//           withCredentials: true,
//         }
//       )
//       return wishlistResponse
//     },
//     onSuccess,
//   })
// }

const deleteWishlistItem = async (
  id: string
): Promise<AxiosResponse<any, any>> => {
  const response = await axios.delete(
    `${MEDUSA_BACKEND_URL}/store/wishlist-item/${id}`,
    {
      withCredentials: true,
    }
  )
  return response
}

export const useDeleteWishlistItem = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  string,
  unknown
> => useMutation(deleteWishlistItem)
