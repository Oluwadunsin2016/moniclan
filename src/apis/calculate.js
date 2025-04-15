/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCalculateCurrencyMutation = () => {
    return useMutation({
      queryKey: ["calculateCurrency"],
      mutationFn: async (payload) => {
        if (!payload) {
          return;
        }
        const { amount, from, to } = payload;
        try {
          const response = await axios.get(
            "https://dashboard-backend-hazel-five.vercel.app/api/get-rate",
            {
              params: { fromCountryCode: from, toCountryCode: to },
            }
          );
          console.log("response:", response);
  
          if (response.data) {
            const exchangeRate = response.data.rate;
            const convertedAmount = parseFloat(amount) * exchangeRate;
            return {convertedAmount, exchangeRate};
            // return calculatedAmount.toFixed(2);
          } else {
            console.log("Exchange rate not found");
          }
        } catch (error) {
          console.log("Error fetching exchange rate");
        }
      },
    });
  };