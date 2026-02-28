import { SPINNER_SIZE, SPINNER_COLOR } from "../config/constants";

export default function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`${SPINNER_SIZE} animate-spin rounded-full border-2 ${SPINNER_COLOR} border-t-transparent`}
      />
    </div>
  );
}
