import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import http from "./http"

export const useMakeTransaction = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload) => http.post('/transactions', payload),
      onSuccess: (_, payload) => {
        if (payload?.senderDetails?._id) {
          queryClient.invalidateQueries({
            queryKey: ['activeSubscription', payload.senderDetails._id,'transactions',payload?.senderDetails?.email],
          });
        }
      },
    });
  };

export const useCreateStripePayment = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async(payload) => await http.post('/transactions/stripe-payment', payload),
      onSuccess: (_, payload) => {
        if (payload?.senderDetails?._id) {
          queryClient.invalidateQueries({
            queryKey: ['activeSubscription', payload.senderDetails._id,'transactions',payload?.senderDetails?.email],
          });
        }
      },
    });
  };
  

  export const useGetUserTransactions=(email)=>{
    return useQuery({
        queryKey:['transactions',email],
        queryFn:async()=>{
            const res=await http.get(`/transactions/by-email/${email}`)
            return res.data
        },
        enabled:!!email,
    })
}


  export const useCancelSubscription = (userId) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id) => http.put(`/transactions/cancel-subscription/${id}`),
      onSuccess: () => {
        if (userId) {
          queryClient.invalidateQueries({
            queryKey: ['activeSubscription', userId],
          });
        }
      },
    });
  };

  export const useGetActiveSubscription = (userId) => {
    return useQuery({
      queryKey: ['activeSubscription', userId],
      queryFn: () => http.get(`/transactions/active-subscriptions/${userId}`),
      enabled: !!userId,
    });
  };
  