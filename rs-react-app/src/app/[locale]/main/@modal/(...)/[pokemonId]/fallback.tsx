export const FallbackPokemon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="96"
    height="96"
    fill="currentColor"
    {...props}
  >
    <circle
      cx="32"
      cy="32"
      r="30"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M24 22c0-4 3-8 8-8s8 4 8 8c0 5-4 6-6 8s-2 4-2 6"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="32" cy="48" r="3" fill="currentColor" />
  </svg>
);
