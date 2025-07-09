import React from "react";
import { AlertCircle, X } from "lucide-react";

const Alert = ({
  children,
  closeHide = false,
}) => {
  return (
    <div className="bg-[#E8FF37] text-background flex text-start text-xs px-4 py-2 items-center justify-center gap-4 rounded-lg">
      <AlertCircle className="w-5 h-5 shrink-0" />
      <p> {children}</p>
      {closeHide ? null : (
        <hr className="min-w-[1px] h-full bg-custom-slate border-none" />
      )}
      {closeHide ? null : <X className="shrink-0 max-md:w-4 max-md:h-4" />}
    </div>
  );
};

export { Alert };
