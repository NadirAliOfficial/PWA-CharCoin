
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SingleNewsSheet } from "./view-exchange";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { getData } from "../const";


import { useRouter } from 'next/navigation'

export default function NewsCarousel() {

interface ItemType {
  id: number | string;
  image: string; 
  title:string;
  category: string;
  views:string;
  detail:string;
}

const[newsItems, setNewsItems] = useState<ItemType[]>();

const router = useRouter();

let isBusy = false;
const getNewsItems=async()=>{
     if(isBusy) return;
     isBusy = true;
    const result = await getData("/api/news");
    if(result.statusCode != 200) 
    {
      router.push("/login");
    }
    // @ts-expect-error no such issue. 
    setNewsItems(result.data);
    isBusy = false;
};



useEffect(()=>{ 
  getNewsItems();
}, []);




  return (
    <div className="w-full space-y-4 ">
      <h2 className="text-lg font-semibold">Latest News</h2>
      <Carousel className="w-full">
        <CarouselContent>
         {newsItems && newsItems.length>0 && newsItems?.map((item) => (
            <CarouselItem className="show" key={item.id}>
              <SingleNewsSheet  item={item}>
                <Button className="relative aspect-[2/1] h-full  w-full overflow-hidden rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="object-cover"
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
