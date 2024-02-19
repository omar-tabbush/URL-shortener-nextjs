/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YZ7z1NHPRsf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh]">
      <div className="animate-pulse bg-gray-200 h-20 w-20 rounded-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-8 w-8 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V2.5"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
