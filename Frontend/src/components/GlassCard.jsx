function GlassCard({ children, className = "" }) {

  return (

    <div

      className={`
        backdrop-blur-xl
        bg-white/70
        border
        border-white/30
        dark:bg-gray-800
        shadow-2xl
        rounded-2xl
        p-6
        transition
        duration-300
        hover:shadow-green-200
        hover:scale-[1.02]
        ${className}
      `}

    >

      {children}

    </div>

  );

}

export default GlassCard;