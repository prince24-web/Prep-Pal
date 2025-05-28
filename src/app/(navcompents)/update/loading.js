export default function Loading() {
  return (
    <div className="flex justify-center items-end h-32 w-[300px] mx-auto space-x-2">
      <div className="w-5 h-2 bg-blue-500 rounded-md animate-wave" />
      <div className="w-5 h-2 bg-blue-500 rounded-md animate-wave [animation-delay:0.1s]" />
      <div className="w-5 h-2 bg-blue-500 rounded-md animate-wave [animation-delay:0.2s]" />
      <div className="w-5 h-2 bg-blue-500 rounded-md animate-wave [animation-delay:0.3s]" />
    </div>
  );
}
