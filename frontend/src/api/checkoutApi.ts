import axios from "axios";
import { ICheckoutResponse } from "./types";
import { CheckoutInput } from "../components/checkout/main.checkout";

const BASE_URL = "http://localhost:8080/api/checkout";

export const checkoutApi = axios.create({
  baseURL: BASE_URL,
});

checkoutApi.defaults.headers.common["Content-Type"] = "application/json";

/**
 * @author YAKUBU
 * @dateCreated 23/09/2023
 * @description Calls the checkout endpoint
 *
 * @param checkout The request body
 */
export const checkoutFn = async (checkout: CheckoutInput) => {
  const response = await checkoutApi.post<ICheckoutResponse>("", checkout);
  return response.data;
};
