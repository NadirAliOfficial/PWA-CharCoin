import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SingleNewsSheet } from "./view-exchange";
import { Button } from "../ui/button";

const newsItems = [
  {
    id: 1,
    title: "CHAR Coin donates $145,000 to Chilean earthquake victims",
    category: "GLOBAL EMERGENCIES",
    image: "/feature-image.png?height=600&width=1200",
  },
  {
    id: 2,
    title: "Community Update: Q1 2024 Highlights",
    category: "ANNOUNCEMENTS",
    image: "/feature-image.png?height=600&width=1200",
  },
  {
    id: 3,
    title: "New Partnership Announcement",
    category: "PARTNERSHIPS",
    image: "/feature-image.png?height=600&width=1200",
  },
];

export default function NewsCarousel() {
  return (
    <div className="w-full space-y-4 ">
      <h2 className="text-lg font-semibold">Latest News</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {newsItems.map((item) => (
            <CarouselItem key={item.id}>
              <SingleNewsSheet>
                <Button className="relative aspect-[2/1] h-full  w-full overflow-hidden rounded-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority={item.id === 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                  <div className="absolute text-start bottom-0 left-0 p-6 text-white">
                    <p className="mb-2 text-sm font-medium tracking-wider">
                      {item.category}
                    </p>
                    <h1 className="text-xl  font-bold  md:text-2xl">
                      {item.title}
                    </h1>
                  </div>
                </Button>
              </SingleNewsSheet>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-4 w-12 hover:bg-primary hover:text-background text-lg aspect-square h-12 !rounded-lg border-none"
          size={"icon"}
        />
        <CarouselNext
          className="right-4 w-12 hover:bg-primary hover:text-background text-lg aspect-square h-12 !rounded-lg border-none"
          size={"icon"}
        />
      </Carousel>
    </div>
  );
}
