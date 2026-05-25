import { Play } from "lucide-react";

const Card = ({ src ,name }) => {
  return (
    <div className="relative min-w-[300px] h-44 rounded-lg overflow-hidden cursor-pointer group">
      <img src={src} className="w-full h-full object-cover" />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <Play size={20} />

      </div>
      {/* subtle bottom label effect */}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition">
                  <p className="text-sm font-medium">{name}</p>
                </div>
    </div>
  );
};

export default Card;