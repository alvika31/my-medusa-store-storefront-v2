import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { MEDUSA_BACKEND_URL } from "@lib/config"

const deleteWishlistName = async (
  id: string
): Promise<AxiosResponse<any, any>> => {
  const response = await axios.delete(
    `${MEDUSA_BACKEND_URL}/store/wishlist/${id}`,
    {
      withCredentials: true,
    }
  )
  return response
}

export const useDeleteWishlist = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  string,
  unknown
> => useMutation(deleteWishlistName)
