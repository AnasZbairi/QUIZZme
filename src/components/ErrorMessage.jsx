export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-red-50 rounded-xl shadow-sm border border-red-100">
      <div className="text-red-600 font-medium mb-3">Error Occurred</div>
      <p className="text-gray-700 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
