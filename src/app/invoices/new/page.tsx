"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import Form from "next/form";
import { Container } from "@/components/container";

export default function New() {
  // const handleOnSubmit = async (event: SyntheticEvent) => {
  //   event.preventDefault();

  //   if (state === "pending") return;
  //   setState("pending");

  //   const target = event.target as HTMLFormElement;

  //   startTransition(async () => {
  //     const formData = new FormData(target);
  //     await createAction(formData);
  //   });
  // };

  return (
    <main className="my-12">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">Create Invoice</h1>
        </div>

        <Form action={createAction} className="grid gap-4 max-w-xs">
          <div>
            <Label htmlFor="name" className="block mb-2 font-semibold text-sm">
              Billing Name
            </Label>
            <Input id="name" name="name" type="text" />
          </div>
          <div>
            <Label htmlFor="email" className="block mb-2 font-semibold text-sm">
              Billing Email
            </Label>
            <Input id="email" name="email" type="email" />
          </div>
          <div>
            <Label htmlFor="value" className="block mb-2 font-semibold text-sm">
              Value
            </Label>
            <Input id="value" name="value" type="text" />
          </div>
          <div>
            <Label htmlFor="desc" className="block mb-2 font-semibold text-sm">
              Description
            </Label>
            <Textarea id="desc" name="desc" />
          </div>
          <div>
            <SubmitButton />
          </div>
        </Form>
      </Container>
    </main>
  );
}
