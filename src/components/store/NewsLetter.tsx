import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function Newsletter() {
  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="rounded-lg bg-muted p-6 md:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="mt-2 text-muted-foreground">
              Get the latest updates on new products and upcoming deals.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-0">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none sm:rounded-r-none sm:rounded-l-lg"
              />
              <Button className="rounded-l-none sm:rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
