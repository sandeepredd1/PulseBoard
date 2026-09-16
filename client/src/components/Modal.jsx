import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  children,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="glass max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-gray-500 hover:bg-white"
          >
            <X size={17} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}