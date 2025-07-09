import { Alert } from "@/components/custom/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Like } from "@mynaui/icons-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Item = {
  id: number | string;
  image: string; 
  title:string;
  category: string;
  views:string;
  detail:string;
}

const SingleNewsSheet = ({ children, item }: { children: React.ReactNode, item:Item }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="[&>button]:left-4 [&>button]:bg-background [&>button]:w-8 [&>button]:h-8 [&>button]:flex [&>button]:justify-center [&>button]:items-center !max-w-3xl overflow-auto p-0 !w-full ">
        <VisuallyHidden>
          <SheetTitle> Vote for your cause</SheetTitle>
        </VisuallyHidden>
        <img
          src={item.image}
          alt={item.title}
          width={500}
          height={300}
          className="w-full "
        />
        <div className="p-6 flex flex-col gap-4">
          <p className="uppercase text-xs">{item.category}</p>
          <h1 className="text-2xl font-semibold ">
            {item.title}
          </h1>
          <span className="flex gap-2 text-xs font-semibold">
            Total Views: <p className="text-primary">{item.views}</p>
          </span>

          <div className="flex gap-4">
            <div className="flex min-w-3 bg-custom-slate rounded-full" />
            <div className="py-4 flex flex-col gap-8">
              <p>
               {item.detail}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button>
              Like <Like />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { SingleNewsSheet };
