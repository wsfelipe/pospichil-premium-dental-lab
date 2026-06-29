import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5551984449117?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20o%20Laborat%C3%B3rio%20Pospichil.";

export function WhatsAppFAB() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-medium text-black shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] transition-all duration-300 hover:shadow-[0_14px_40px_-10px_rgba(37,211,102,0.85)] hover:-translate-y-0.5"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={2.2} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}