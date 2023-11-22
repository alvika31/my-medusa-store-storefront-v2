import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { MEDUSA_BACKEND_URL } from "@lib/config"

interface Payload {
  title: string
  customer_id: string
}

const createWishlistName = async (
  payload: Payload
): Promise<AxiosResponse<any, any>> => {
  const response = await axios.post(
    `${MEDUSA_BACKEND_URL}/store/wishlist`,
    payload,
    {
      withCredentials: true,
    }
  )
  return response
}

export const useCreateWishlistName = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  Payload,
  unknown
> => useMutation(createWishlistName)
