export default function Arrow({ direction = "up-right", ...props }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {direction === "down" ? (
        <path d="M12 4v16m-6-6 6 6 6-6" />
      ) : (
        <path d="M6 18 18 6M6 6h12v12" />
      )}
    </svg>
  );
}
