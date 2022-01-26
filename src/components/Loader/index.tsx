export const Loader = () => {
  return (
    <div className="flex justify-center space-x-2">
      <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      <p className="text-xl font-bold leading-10 text-gray-900">
        ローディング中...
      </p>
    </div>
  );
};
