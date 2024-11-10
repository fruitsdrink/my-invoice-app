"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  console.log("pending: ", pending);
  return (
    <Button className="w-full font-semibold relative" disabled={pending}>
      <span className={pending ? "text-transparent" : ""}>Submit</span>
      {pending && (
        <span className="flex justify-center items-center w-full h-full absolute text-gray-400">
          <LoaderCircle className="animate-spin" />
        </span>
      )}
    </Button>
  );
};
