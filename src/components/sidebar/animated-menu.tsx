import { Button } from "@/components/ui/button";
import { Menu } from "@mynaui/icons-react";
import { useState } from "react";

export default function AnimatedMenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Button
      className="flex flex-col gap-2 justify-center items-center tw:p-2"
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen(!isOpen)}
    >
      <Menu className="!w-6 !h-6" />
    </Button>
  );
}
