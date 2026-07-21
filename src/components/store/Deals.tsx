import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function DealsSection() {
  return (
    <section className="bg-muted py-8 md:py-12">
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Hot Deals
          </h2>
          <Link
            href="/deals"
            className="flex items-center text-sm font-medium text-primary"
          >
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="overflow-hidden">
            <div className="relative">
              <Badge className="absolute right-2 top-2 z-10 bg-rose-500 hover:bg-rose-600">
                Save 20%
              </Badge>
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Wireless Earbuds"
                width={400}
                height={200}
                className="h-48 w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">Wireless Earbuds Pro</h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-bold">$79.99</span>
                <span className="text-sm text-muted-foreground line-through">
                  $99.99
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden">
            <div className="relative">
              <Badge className="absolute right-2 top-2 z-10 bg-rose-500 hover:bg-rose-600">
                Save 15%
              </Badge>
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Smart Watch"
                width={400}
                height={200}
                className="h-48 w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">Smart Watch Series 5</h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-bold">$169.99</span>
                <span className="text-sm text-muted-foreground line-through">
                  $199.99
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden">
            <div className="relative">
              <Badge className="absolute right-2 top-2 z-10 bg-rose-500 hover:bg-rose-600">
                Save 30%
              </Badge>
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Bluetooth Speaker"
                width={400}
                height={200}
                className="h-48 w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">Portable Bluetooth Speaker</h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-bold">$49.99</span>
                <span className="text-sm text-muted-foreground line-through">
                  $69.99
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
