export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin">
              <div className="w-full h-full bg-white rounded-full m-1"></div>
            </div>
          </div>
          <p className="text-lg text-gray-600">hollup let me cook 🤫...</p>
        </div>
      </div>
  );
}
