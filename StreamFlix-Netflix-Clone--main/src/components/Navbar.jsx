import { useEffect, useState } from 'react';
import { Search, Bell, Menu, X, Sparkles, UserRound, LogOut } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import useAuth from '../hooks/useAuth';

const links=[['/home','Home'],['/movies','Movies'],['/tvshows','TV Shows'],['/mylist','My List']];
export default function Navbar({ onSearch }) {
 const [scrolled,setScrolled]=useState(false); const [open,setOpen]=useState(false); const [profile,setProfile]=useState(false); const {user}=useAuth(); const navigate=useNavigate();
 useEffect(()=>{const fn=()=>setScrolled(scrollY>18); addEventListener('scroll',fn,{passive:true}); return()=>removeEventListener('scroll',fn)},[]);
 const logout=async()=>{await signOut(auth);setProfile(false);navigate('/')};
 return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled?'bg-[#08090b]/90 shadow-2xl shadow-black/30 backdrop-blur-xl border-b border-white/5':'bg-gradient-to-b from-black/75 to-transparent'}`}>
  <div className="mx-auto flex h-[72px] max-w-[1600px] items-center gap-6 px-5 sm:px-8 lg:px-10">
   <Link to="/home" className="shrink-0 text-2xl font-black tracking-[-.08em] text-[#e50914]">STREAMFLIX</Link>
   <nav className="hidden items-center gap-6 lg:flex">{links.map(([to,label])=><NavLink key={to} to={to} className={({isActive})=>`text-sm transition ${isActive?'font-semibold text-white':'text-white/55 hover:text-white'}`}>{label}</NavLink>)}</nav>
   <div className="ml-auto flex items-center gap-2"><button onClick={()=>onSearch?.()} className="grid size-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white" aria-label="Search"><Search size={20}/></button><Link to="/assistant" className="hidden size-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white sm:grid" aria-label="AI Assistant"><Sparkles size={18}/></Link><button className="hidden size-10 place-items-center rounded-full text-white/70 hover:bg-white/10 md:grid" aria-label="Notifications"><Bell size={18}/></button>
   <div className="relative"><button onClick={()=>setProfile(!profile)} className="grid size-9 place-items-center overflow-hidden rounded-full border border-white/15 bg-white/10" aria-label="Account">{user?.photoURL?<img src={user.photoURL} alt="" className="h-full w-full object-cover"/>:<UserRound size={17}/>}</button>{profile&&<div className="absolute right-0 top-12 w-64 rounded-2xl border border-white/10 bg-[#17181c]/95 p-3 shadow-2xl backdrop-blur-xl"><div className="border-b border-white/10 px-3 pb-3"><p className="font-semibold">{user?.displayName||'Guest'}</p><p className="mt-1 truncate text-xs text-white/40">{user?.email||'Not signed in'}</p></div>{user?<button onClick={logout} className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white"><LogOut size={16}/> Sign out</button>:<Link to="/login" className="mt-2 block rounded-xl px-3 py-3 text-sm hover:bg-white/5">Sign in</Link>}</div>}</div>
   <button onClick={()=>setOpen(!open)} className="grid size-10 place-items-center lg:hidden" aria-label="Menu">{open?<X/>:<Menu/>}</button></div>
  </div>
  {open&&<nav className="border-t border-white/10 bg-[#08090b]/95 px-5 py-5 backdrop-blur-xl lg:hidden">{links.map(([to,label])=><NavLink onClick={()=>setOpen(false)} key={to} to={to} className="block rounded-xl px-3 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white">{label}</NavLink>)}<Link onClick={()=>setOpen(false)} to="/assistant" className="block rounded-xl px-3 py-3 text-sm text-white/70 hover:bg-white/5">AI Assistant</Link></nav>}
 </header>
}
