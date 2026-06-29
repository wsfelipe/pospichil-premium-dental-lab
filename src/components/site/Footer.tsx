import { Instagram, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-[oklch(0.11_0.003_270)]">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10">
          <div>
            <Logo size={64} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              26 anos dedicados à prótese odontológica de alta precisão, em Taquara/RS.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/laboratoriopospichil"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-muted-foreground transition-all hover:border-accent hover:text-accent"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/5551984449117"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-muted-foreground transition-all hover:border-accent hover:text-accent"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-accent">Contato</p>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>Rua Gáspar Martins, 984<br />Centro · Taquara/RS</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+5551984449117" className="hover:text-foreground transition-colors">
                  (51) 98444-9117
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:contato@laboratoriopospichil.com.br" className="hover:text-foreground transition-colors">
                  contato@laboratoriopospichil.com.br
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-accent">Localização</p>
            <div className="overflow-hidden rounded-lg border border-hairline">
              <iframe
                title="Mapa Laboratório Pospichil"
                src="https://www.google.com/maps?q=Rua+G%C3%A1spar+Martins+984+Centro+Taquara+RS&output=embed"
                loading="lazy"
                className="h-44 w-full grayscale contrast-110 invert-[0.92]"
                style={{ filter: "invert(0.92) hue-rotate(180deg) grayscale(0.4)" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Laboratório Pospichil. Todos os direitos reservados.</p>
          <p className="tracking-wider uppercase">Prótese Odontológica · CRO/RS</p>
        </div>
      </div>
    </footer>
  );
}