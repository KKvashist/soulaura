import {createContext,useContext,useState,ReactNode} from 'react'
type C={service:string|null;open:(s?:string)=>void;close:()=>void}
const Ctx=createContext<C>({service:null,open:()=>{},close:()=>{}})
export const useEnquiry=()=>useContext(Ctx)
export function EnquiryProvider({children}:{children:ReactNode}){
 const [service,setS]=useState<string|null>(null)
 return <Ctx.Provider value={{service,open:(s='')=>setS(s),close:()=>setS(null)}}>{children}</Ctx.Provider>}
