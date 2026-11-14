export const SCRIPT_URL=import.meta.env.VITE_GOOGLE_SCRIPT_URL as string|undefined
export const OWNER_WA=(import.meta.env.VITE_WHATSAPP_OWNER_NUMBER as string|undefined)?.replace(/\D/g,'')
export const COMMUNITY_URL='https://chat.whatsapp.com/FZRQukbByYwC9grUPCA2Zn?mode=gi_t'
export const waEnquiryUrl=(msg:string)=>OWNER_WA?`https://wa.me/${OWNER_WA}?text=${encodeURIComponent(msg)}`:null
// Apps Script web apps do not return CORS headers; a text/plain no-cors POST is the standard workaround.
export async function postToSheet(payload:Record<string,unknown>){
 if(!SCRIPT_URL) throw new Error('not-configured')
 await fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)})
}
export async function sendEmailJs(params:Record<string,unknown>){
 const s=import.meta.env.VITE_EMAILJS_SERVICE_ID,t=import.meta.env.VITE_EMAILJS_TEMPLATE_ID,k=import.meta.env.VITE_EMAILJS_PUBLIC_KEY
 if(!s||!t||!k) return false // not configured: skipped
 const r=await fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({service_id:s,template_id:t,user_id:k,template_params:params})})
 return r.ok
}
export const usePageTitleEffect=(t:string)=>{document.title=t?`${t} | Soulaura`:'Soulaura | Move Better. Feel Deeper. Live Fully.'}
