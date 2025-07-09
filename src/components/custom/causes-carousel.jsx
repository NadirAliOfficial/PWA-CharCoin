
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toNaturalFormat } from "@/components/const";
import { useCausesStore } from "@/stores/causes-store";


export default function CausesCarousel() {
  const { news } = useCausesStore();
  return (
    <Carousel className="flex flex-col  w-full h-full     mt-auto ">
      <CarouselContent className="h-full   relative mt-auto ">
        {news.map((item) => (
          <CarouselItem
            key={item.id}
            className="h-full justify-center  my-auto relative mb-5   items-stretch flex   w-full"
          >
            <div className="flex max-xl:flex-col p-4">
              {" "}
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title.slice(0, 30)}
                width={46}
                height={80}
                className="min-w-24 object-cover  rounded-xl h-full "
              />
            </div>
            <div>
              <h1 className="text-lg font-bold">{item?.title.slice(0, 45)}</h1>
              <h2 className="text-xs text-custom-light_text">
                {item?.detail.slice(0, 310)}
              </h2>
              <span className="text-[10px] mb-5">
                
                {item?.start_date ? " Posted on "+toNaturalFormat(item?.start_date) : "" }
              </span>
            </div>
            {/* <p className="mb-2 ">{item.category}</p> */}
            {/* <h3 className="text-2xl font-bold leading-tight md:text-3xl">
              {item.title}
            </h3> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      <hr className="bg-custom-slate mx-4" />
      <div className="flex relative justify-between mt-8 w-full ">
        {" "}
        <CarouselPrevious
          className=" left-4 w-12 relative bg-custom-slate hover:bg-primary hover:text-background text-lg aspect-square h-12 !rounded-lg border-none"
          size={"icon"}
        />
        <CarouselNext
          className=" right-4   w-12 !text-xl bg-custom-slate relative  hover:bg-primary hover:text-background  aspect-square h-12 !rounded-lg border-none"
          size={"icon"}
        />
      </div>
    </Carousel>
  );
}
