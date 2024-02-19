export default function Component() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
          <span className="animate-typing">Page Not Found</span>
        </h2>
        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          <span className="animate-typing">
            Oops! It seems like this page is lost in the digital wilderness.
            Maybe it{"'"}s off chasing unicorns {"🦄"}
          </span>
        </p>
      </div>
    </div>
  );
}
