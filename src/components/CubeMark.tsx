/** The Dcube mark: an isometric cube in hairlines, one face in the accent colour. */
export function CubeMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2 21 7v10l-9 5-9-5V7z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 7l9 5 9-5M12 12v10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 12 21 7v10l-9 5z" fill="var(--accent)" />
    </svg>
  );
}
