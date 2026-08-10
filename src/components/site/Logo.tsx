type Props = { className?: string; size?: number };

export function Logo({ className }: Props) {
  return (
    <img
      src="https://lmzpudzmdfuzrdratssn.supabase.co/storage/v1/object/public/icons/logos/logo_lab_pospichil_sem_fundo.png"
      alt="Laboratório Pospichil - Prótese Odontológica"
      className={className}
      style={{ height: 130, width: "auto" }}
    />
  );
}