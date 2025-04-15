import { persist } from 'zustand/middleware';
import { create } from 'zustand';

const useTransaction = create(
  persist(
    (set) => ({
      data: {
        from:2,
        to:4,
      },
      updateData: (payload) => set((state) => ({ data: { ...state.data, ...payload } })),
    }),
    { name: 'transaction', version: 8 }
  )
);


export const useDataStore =create((set)=>({
    data:{},
    editMode:{status:false, fieldName:''},
    bank:{},
    updateData: (payload) => set((state) => ({ data: {...state.data,...payload } })),
    clearData: () => set((state) => ({ data: {exchangeRate:state.data.exchangeRate} })),
    setEditMode:(payload) => set(() => ({ editMode: payload })),
    setBank:(payload) => set(() => ({ bank: payload })),
}   
))

export const useUsersStore=create(persist((set)=>({
  users:[],
  setUsers:(payload)=>set(()=>({users:payload})),
  clearUsers:()=>set(()=>({users:[]}))
}),{
  name:'user'
}))

export const useUserStore=create(persist((set)=>({
  user:{},
  setUser:(payload)=>set(()=>({user:payload})),
  clearUser:()=>set(()=>({user:{}}))
}),{
  name:'user'
}))

export const useServiceStore=create(persist((set)=>({
  service:{},
  setService:(payload)=>set(()=>({service:payload})),
  clearService:()=>set(()=>({service:{}}))
}),{
  name:'service'
}))


export default useTransaction;
