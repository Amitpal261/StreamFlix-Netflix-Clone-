const SkeletonRow = () => {
  return (
    <div>
      <div className="h-6 w-40 bg-gray-700 rounded mb-4 animate-pulse" />

      <div className="flex gap-4 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="min-w-[150px] h-24 bg-gray-800 rounded-lg animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default SkeletonRow;