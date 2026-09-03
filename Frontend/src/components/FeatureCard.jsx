export default function FeatureCard({ icon, title, text }) {
  return (
    // 1. Change card color here (e.g., bg-zinc-900 for dark gray, or bg-white)
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg">
      <div className="mb-4 text-emerald-500">{icon}</div>
      
      {/* 2. Change title text color here (e.g., text-emerald-400) */}
      <h3 className="text-xl font-semibold text-emerald-400 mb-2">{title}</h3>
      
      {/* 3. Change body text color here (e.g., text-zinc-300) */}
      <p className="text-zinc-300 text-sm">{text}</p>
    </div>
  );
}