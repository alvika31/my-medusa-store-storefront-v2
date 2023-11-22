import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { MEDUSA_BACKEND_URL } from "@lib/config"

interface Payload {
  id: string
  title: string
}

const updateWishlist = async (
  payload: Payload
): Promise<AxiosResponse<any, any>> => {
  const response = await axios.put(
    `${MEDUSA_BACKEND_URL}/store/wishlist/${payload.id}`,
    payload,
    {
      withCredentials: true,
    }
  )
  return response
}

export const useUpdateWishlist = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  Payload,
  unknown
> => useMutation(updateWishlist)
