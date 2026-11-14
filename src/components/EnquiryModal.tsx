import {useState,useEffect,FormEvent} from 'react'
import {X,Loader2,CheckCircle2,MessageCircle} from 'lucide-react'
import {useEnquiry} from '../ctx'
import {postToSheet,sendEmailJs,waEnquiryUrl} from '../lib/config'
import {programs} from '../data/programs'
const opt={gender:['Female','Male','Non-binary','Prefer not to say'],exp:['Beginner','Intermediate','Advanced'],freq:['1-2 days a week','3-4 days a week','5+ days a week','Not sure yet'],time:['Early morning','Morning','Afternoon','Evening'],pref:['One-to-one','Small group','Online','Hybrid']}
const empty={name:'',phone:'',email:'',age:'',gender:'',service:'',goal:'',experience:'',frequency:'',time:'',preference:'',message:'',consent:false}
type F=typeof empty
type Errs=Partial<Record<keyof F,string>>
export function validate(f:F){
 const e:Partial<Record<keyof F,string>>={}
 if(f.name.trim().length<2)e.name='Enter your full name.'
 if(!/^[6-9]\d{9}$/.test(f.phone.replace(/[\s-]/g,'').replace(/^(\+91|91|0)(?=\d{10}$)/,'')))e.phone='Enter a valid 10-digit Indian mobile number.'
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))e.email='Enter a valid email address.'
 const a=Number(f.age);if(!Number.isInteger(a)||a<14||a>100)e.age='Enter an age between 14 and 100.'
 ;(['gender','service','goal','experience','frequency','time','preference'] as const).forEach(k=>{if(!f[k])e[k]='This field is required.'})
 if(!f.consent)e.consent='Please agree so we can contact you.'
 return e}
type FP={k:keyof F;label:string;f:F;err:Errs;set:(k:keyof F,v:string|boolean)=>void}
function Sel({k,label,o,f,err,set}:FP&{o:string[]}){
 return <label className="block text-sm font-medium">{label}<select className="inp mt-1" value={f[k] as string} onChange={e=>set(k,e.target.value)} aria-invalid={!!err[k]}><option value="">Select</option>{o.map(x=><option key={x}>{x}</option>)}</select>{err[k]&&<span className="text-xs text-red-700">{err[k]}</span>}</label>}
function In({k,label,type='text',mode,f,err,set}:FP&{type?:string;mode?:'tel'|'numeric'|'email'}){
 return <label className="block text-sm font-medium">{label}<input className="inp mt-1" type={type} inputMode={mode} value={f[k] as string} onChange={e=>set(k,e.target.value)} aria-invalid={!!err[k]}/>{err[k]&&<span className="text-xs text-red-700">{err[k]}</span>}</label>}

export default function EnquiryModal(){
 const {service,close}=useEnquiry()
 const [f,setF]=useState<F>(empty);const [err,setErr]=useState<Errs>({})
 const [st,setSt]=useState<'idle'|'loading'|'ok'|'fail'>('idle');const [msg,setMsg]=useState('')
 useEffect(()=>{if(service!==null){setF({...empty,service});setErr({});setSt('idle')}},[service])
 useEffect(()=>{if(service===null)return;const k=(e:KeyboardEvent)=>e.key==='Escape'&&close();document.addEventListener('keydown',k);document.body.style.overflow='hidden';return()=>{document.removeEventListener('keydown',k);document.body.style.overflow=''}},[service,close])
 if(service===null)return null
 const set=(k:keyof F,v:string|boolean)=>setF(p=>({...p,[k]:v}))
 const submit=async(ev:FormEvent)=>{ev.preventDefault();const e=validate(f);setErr(e);if(Object.keys(e).length)return
  setSt('loading')
  try{await postToSheet({...f,type:'enquiry',source:location.pathname});await sendEmailJs({...f});setSt('ok')}
  catch(x){setMsg((x as Error).message==='not-configured'?'The enquiry service is not set up yet. Please use WhatsApp below.':'We could not send your enquiry. Check your connection and try again, or use WhatsApp.');setSt('fail')}}
 const wa=waEnquiryUrl(`Hi Soulaura, I'm ${f.name||'interested'} and would like to know more about ${f.service||'your programs'}.`)
 const p={f,err,set}
 return <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[rgba(16,28,32,0.6)] sm:items-center sm:p-4" onMouseDown={e=>e.target===e.currentTarget&&close()}>
 <div role="dialog" aria-modal="true" aria-labelledby="eq-t" className="max-h-[94dvh] w-full overflow-y-auto rounded-t-3xl bg-bg p-5 sm:max-w-2xl sm:rounded-3xl sm:p-8">
 <div className="flex items-start justify-between gap-4"><h2 id="eq-t" className="text-3xl">Start your enquiry</h2><button onClick={close} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full hover:bg-[rgba(23,38,43,0.1)]"><X/></button></div>
 {st==='ok'?<div className="py-10 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-primary"/><p className="mt-4 font-display text-2xl">Thank you, {f.name.split(' ')[0]}.</p><p className="mt-2 text-muted">Your enquiry was sent. We will contact you on {f.phone}.</p><button className="btn mt-6" onClick={close}>Close</button></div>:
 <form onSubmit={submit} noValidate className="mt-5 grid gap-4 sm:grid-cols-2">
 <In k="name" label="Full name" {...p}/><In k="phone" label="Mobile number (India)" type="tel" mode="tel" {...p}/><In k="email" label="Email" type="email" mode="email" {...p}/><In k="age" label="Age" mode="numeric" {...p}/>
 <Sel k="gender" label="Gender" o={opt.gender} {...p}/><Sel k="service" label="Interested service" o={[...new Set([...(f.service?[f.service]:[]),'4-Week Reset Program','1:1 Sessions','Digital Guides','Group Workshops','Collaborations','Group Yoga Class','Online Yoga',...programs.map(x=>x.title),'Mindfulness sessions','Not sure yet'])]} {...p}/>
 <Sel k="goal" label="Fitness goal" o={['Build strength','Lose weight','Improve mobility','Reduce stress','General fitness']} {...p}/><Sel k="experience" label="Experience level" o={opt.exp} {...p}/>
 <Sel k="frequency" label="Preferred frequency" o={opt.freq} {...p}/><Sel k="time" label="Preferred time" o={opt.time} {...p}/>
 <div className="sm:col-span-2"><Sel k="preference" label="Training preference" o={opt.pref} {...p}/></div>
 <label className="block text-sm font-medium sm:col-span-2">Additional message (optional)<textarea className="inp mt-1 py-3" rows={3} maxLength={600} value={f.message} onChange={e=>set('message',e.target.value)}/></label>
 <label className="flex items-start gap-3 text-sm sm:col-span-2"><input type="checkbox" className="mt-1 h-5 w-5 accent-primary" checked={f.consent} onChange={e=>set('consent',e.target.checked)}/>I agree to be contacted by Soulaura about my enquiry.</label>{err.consent&&<span className="text-xs text-red-700 sm:col-span-2">{err.consent}</span>}
 {st==='fail'&&<p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800 sm:col-span-2">{msg}</p>}
 <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row"><button className="btn flex-1" disabled={st==='loading'}>{st==='loading'?<><Loader2 className="h-5 w-5 animate-spin"/>Sending</>:'Send enquiry'}</button>
 {wa?<a className="btn-o flex-1" href={wa} target="_blank" rel="noreferrer"><MessageCircle className="h-5 w-5"/>Enquire on WhatsApp</a>:<button type="button" disabled className="btn-o flex-1 opacity-50" title="Set VITE_WHATSAPP_OWNER_NUMBER">WhatsApp enquiry not configured</button>}</div></form>}
 </div></div>}
