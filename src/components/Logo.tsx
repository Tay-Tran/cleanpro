import Link from "next/link";

export function Logo({ name }: { name: string }) {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-ink">
      <span className="grid size-8 place-items-center rounded-lg bg-brand-500 text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5" aria-hidden="true">
          <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-lg">{name}</span>
    </Link>
  );
}
