export function Footer() {
  return (
    <footer className="relative bg-[oklch(0.11_0.003_270)]">
      <div className="mx-auto max-w-6xl px-6 pb-5 md:px-10">
        <div className="mt-16 grid grid-cols-1 items-center gap-3 border-t border-hairline pt-5 text-xs text-muted-foreground md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <a href="https://www.linkedin.com/in/felipe-wiebke-schons-500642209/" target="_blank" rel="noopener noreferrer" className="text-center md:block">
            Desenvolvido por: Felipe Wiebke Schons
          </a>
          <p className="text-center md:text-left">© {new Date().getFullYear()} Laboratório Pospichil. Todos os direitos reservados.</p>
          <div className="flex flex-col items-center gap-1 md:items-end">
            <p className="tracking-wider uppercase text-[10px]">Prótese Odontológica · CRO/RS-TPD-1290</p>
            <p className="tracking-wider uppercase text-[10px]">Prótese Odontológica · CRO/RS-TPD-2130</p>
          </div>
        </div>
      </div>
    </footer>
  );
}