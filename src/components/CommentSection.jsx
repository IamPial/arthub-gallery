import { FiMessageSquare } from "react-icons/fi";

const  CommentSection=()=> {
  return (
    <div className="mt-8 border-t border-white/5 pt-8 w-full">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <FiMessageSquare size={20} className="text-[#a78bfa]" />
        <span>Comments</span>
        <span className="text-xs bg-[#6f4ff2]/20 text-[#a78bfa] px-2.5 py-0.5 rounded-full font-bold">
          0
        </span>
      </h2>

      <div className="text-center p-6 bg-[#131129]/40 border border-white/5 rounded-2xl mb-8">
        <p className="text-sm text-slate-400 mb-3">
          You must be brought this artworks for leave a comment.
        </p>
      </div>
    </div>
  );
}

export default CommentSection
