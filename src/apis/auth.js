import { useMutation, useQuery } from "@tanstack/react-query"
import http from "./http"
import axios from "axios";

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      // Clone payload to avoid mutation
      const finalPayload = { ...payload };
      
      // Handle business image upload if exists
      if (payload.isMerchant && payload.merchantInfo?.businessImageFile) {
        const formData = new FormData();
        formData.append("media", payload.merchantInfo.businessImageFile);
        
        try {
          // Upload business image
          const imageResponse = await axios.post(
            "https://backendurl.cittis.co/user/upload_media", 
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          );
          
          // Extract image URL from response
          const imageUrl = imageResponse.data.data;
          
          // Add image URL to merchantInfo
          finalPayload.merchantInfo = {
            ...finalPayload.merchantInfo,
            businessImageUrl: imageUrl
          };
          
          // Remove the file object
          delete finalPayload.merchantInfo.businessImageFile;
        } catch (error) {
          console.error("Business image upload failed:", error);
          throw new Error("Failed to upload business image");
        }
      }
      
      // Perform registration with final payload
      return http.post("/auth/register", finalPayload);
    }
  });
};

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