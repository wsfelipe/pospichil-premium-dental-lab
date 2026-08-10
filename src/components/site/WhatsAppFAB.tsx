import { useEffect, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/5551984449117?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20o%20Laborat%C3%B3rio%20Pospichil";

export function WhatsAppFAB() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting);
    });

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={`group fixed ${footerVisible ? "bottom-[76px]" : "bottom-6"
        } right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-black transition-all duration-300 hover:-translate-y-0.5`}    >
      <img
        src="https://lmzpudzmdfuzrdratssn.supabase.co/storage/v1/object/public/icons/icons/whatsapp.png"
        alt="WhatsApp"
        className="h-5 w-5 object-contain"
      />
    </a>
  );
}