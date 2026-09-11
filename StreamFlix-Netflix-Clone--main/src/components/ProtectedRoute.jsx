import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
export default function ProtectedRoute({children}){const {user,loading}=useAuth();const loc=useLocation();if(loading)return <div className="grid min-h-screen place-items-center bg-[#08090b]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-red-500"/></div>;return user?children:<Navigate to={`/login?next=${encodeURIComponent(loc.pathname)}`} replace/>}
