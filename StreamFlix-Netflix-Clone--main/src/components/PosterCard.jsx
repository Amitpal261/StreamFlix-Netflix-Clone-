import { motion } from 'framer-motion';
import { Info, Play, Plus, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { imageUrl } from '../services/tmdb';

export default function PosterCard({ item, index, onPlay, onToggleList, inList = false }) {
  const id = item.id;
  const type = item.media_type || (item.title ? 'movie' : 'tv');
  const title = item.title || item.name || 'Untitled';
  const navigate = useNavigate();

  const openDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/${type}/${id}`);
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -7 }}
      className="group relative min-w-[155px] max-w-[155px] sm:min-w-[185px] sm:max-w-[185px] md:min-w-[205px] md:max-w-[205px]"
    >
      <Link to={`/${type}/${id}`} className="block overflow-hidden rounded-xl bg-white/5 shadow-2xl shadow-black/30">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img loading="lazy" src={imageUrl(item.poster_path, 'w500')} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-transparent opacity-80" />
          {index != null && <span className="absolute bottom-2 left-2 text-5xl font-black leading-none text-white/90 drop-shadow-lg">{String(index).padStart(2, '0')}</span>}
          <div className="absolute inset-x-2 bottom-2 flex translate-y-2 gap-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPlay?.(item); }} className="grid size-9 place-items-center rounded-full bg-white text-black" aria-label={`Play ${title}`}><Play size={15} fill="currentColor" /></button>
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleList?.(item); }} className="grid size-9 place-items-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur" aria-label={inList ? `Remove ${title}` : `Add ${title}`}>{inList ? <Check size={16}/> : <Plus size={16}/>}</button>
            <button onClick={openDetails} className="grid size-9 place-items-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur" aria-label={`Details for ${title}`}><Info size={16}/></button>
          </div>
        </div>
      </Link>
      <div className="px-1 pt-3"><h3 className="truncate text-sm font-semibold text-white/90">{title}</h3><p className="mt-1 text-xs text-white/40">{item.release_date?.slice(0,4) || item.first_air_date?.slice(0,4) || '—'} · ★ {Number(item.vote_average || 0).toFixed(1)}</p></div>
    </motion.article>
  );
}
