import { MEDUSA_BACKEND_URL } from "@lib/config"
import axios, { AxiosResponse } from "axios"
import { useMutation, UseMutationResult } from "@tanstack/react-query"

interface Payload {
  wishlist_name_id: string
  variant_id: string
}

const createWishlistItem = async ({
  wishlist_name_id,
  variant_id,
}: Payload): Promise<AxiosResponse<any, any>> => {
  const response = await axios.post(
    `${MEDUSA_BACKEND_URL}/store/wishlist/${wishlist_name_id}/wishlist-item`,
    { variant_id },
    {
      withCredentials: true,
    }
  )
  return response.data
}
export const useCreateWishlistItem = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  Payload,
  unknown
> => useMutation(createWishlistItem)
