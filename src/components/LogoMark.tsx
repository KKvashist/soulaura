interface Props {
  className?: string
  size?: number
}

// A simplified line-art rendering of the tree-pose figure from the SoulAura
// logo, drawn with currentColor so it can sit in the navy navbar or the
// cream footer alike. Kept intentionally light-stroke and understated —
// it's a supporting mark, not a replacement for the full logo artwork.
export default function LogoMark({ className, size = 28 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* raised arms */}
      <path d="M24 14c-2-4-6-6-9-4-2 1-1 4 1 4 2.5 0 3-2 2-3" />
      <path d="M24 14c2-4 6-6 9-4 2 1 1 4-1 4-2.5 0-3-2-2-3" />
      {/* head */}
      <circle cx="24" cy="13.5" r="2.1" />
      {/* torso */}
      <path d="M24 16v9" />
      {/* standing leg */}
      <path d="M24 25v11" />
      {/* bent leg (tree pose) */}
      <path d="M24 25c-3 2-6 2-7 5 2 0 5 0 7-2" />
    </svg>
  )
}
