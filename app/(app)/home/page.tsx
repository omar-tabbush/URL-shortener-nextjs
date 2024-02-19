import ShortenForm from "@/components/home/shorten-form";

export default async function Page() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6">
          <h1 className="text-center space-y-2 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Shorten URLs with confidence
          </h1>
          <p className="text-center space-y-2 max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The most reliable URL shortener. Custom links, detailed analytics,
            and branded short domains.
          </p>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <ShortenForm />
          </div>
        </div>
      </section>
    </main>
  );
}
