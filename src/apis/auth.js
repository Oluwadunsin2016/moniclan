import { useMutation, useQuery } from "@tanstack/react-query"
import http from "./http"

export const useSignupMutation=()=>{
  return useMutation({
    mutationFn:(body)=>{
      return http.post('/auth/register',body)
    }
  })
}
export const useVerifyMutation=()=>{
  return useMutation({
    mutationFn:(body)=>{
      return http.post('/auth/verify',body)
    }
  })
}
export const useResenOtpMutation=()=>{
  return useMutation({
    mutationFn:(body)=>{
      return http.post('/auth/verify/resend',body)
    }
  })
}
export const useLoginMutation=()=>{
  return useMutation({
    mutationFn:(body)=>{
      return http.post('/auth/login',body)
    }
  })
}

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await http.get("/auth/profile");
    },
  });
};