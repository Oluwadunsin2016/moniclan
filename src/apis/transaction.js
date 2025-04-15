import { useMutation } from "@tanstack/react-query"
import http from "./http"

export const useMakeTransaction=()=>{
return useMutation({
    mutationFn:(payload)=>{
        return http.post('/transactions',payload)
    }
})
}