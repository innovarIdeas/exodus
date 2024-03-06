import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { bookVariantSchema } from "@/models/validation-schema";
import { createUserBookVariant } from "@/lib/api-call";
import { generateVariantName } from "@/lib/uuid-helper";
import { useForm } from "react-hook-form";
import { useGetAllBook } from "@/lib/hook";
import { useGetUserBookVariants } from "@/lib/hook";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UserBookVariantReadyToPrint = () => {
  const { toast } = useToast();
  const session = useSession();

  type TFormData = z.infer<typeof bookVariantSchema>;

  const { refetch } = useGetUserBookVariants(session.data?.user.id ?? "");

  const form = useForm<TFormData>({
    resolver: zodResolver(bookVariantSchema),
    defaultValues: {
      variant_name: generateVariantName(),
      ready_to_print: true,
      inside_layout: true,
      proof_reading: true,
      cover_design: true,
      editing: true,
      ISBN: true,
      embossing: true,
      foiling: true,
      status: "Ready to Print",
    },
  });
  const books = useGetAllBook();
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (input: TFormData) => {
    const { data, error, validationErrors } = await createUserBookVariant({
      ...input,
      ISBN: !!input.ISBN,
      cover_design: !!input.cover_design,
      editing: !!input.editing,
      embossing: !!input.embossing,
      foiling: !!input.foiling,
      inside_layout: !!input.inside_layout,
      proof_reading: !!input.proof_reading,
    });

    if (data) {
      toast({
        variant: "default",
        description: "Book added successfully!",
        title: "Success",
      });

      form.reset();
      refetch();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create book.",
      });

      console.error("Failed to Create Product", error);
    }

    if (validationErrors?.length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: validationErrors[0].message,
      });

      return;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <FormField
              control={form.control}
              name="book_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Book</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a book to create a variant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {books &&
                        books.map((book) => (
                          <SelectItem key={book.id} value={book.id}>
                            {book.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paper_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Paper Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a paper type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"WHITE_PAPER_LARGE"}>White</SelectItem>

                      <SelectItem value={"CREAM_PAPER_LARGE"}>Cream</SelectItem>

                      <SelectItem value={"ART_PAPER_135"}>
                        Glossy (135gsm)
                      </SelectItem>
                      <SelectItem value={"NEWS_PRINT"}>News Print</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="binding"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Binding</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select binding type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"Paper Binding"}>
                        Paper Binding
                      </SelectItem>
                      <SelectItem value={"Staple"}>Staple</SelectItem>
                      <SelectItem value={"Hard Back"}>Hard Back</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="project_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Print Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the print type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"BW"}>BW</SelectItem>
                      <SelectItem value={"Full Color"}>Full Color</SelectItem>
                      <SelectItem value={"BW with Full Color"}>
                        BW with Full Color
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number_of_pages"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel> Number of Pages </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Please enter the number of pages"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-end justify-end my-3">
              <Button
                type="button"
                onClick={nextStep}
                className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green"
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center">
            <FormField
              control={form.control}
              name="inside_layout_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Layout Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"Portrait"}>Portrait</SelectItem>
                      <SelectItem value={"Landscape"}>Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="book_size"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Paper Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Paper Size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"A4"}>A4</SelectItem>
                      <SelectItem value={"A5"}>A5</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_of_books"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel> Number of Books </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Please enter the amount of book"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between my-3">
              <Button
                type="button"
                onClick={prevStep}
                className=" mx-5 text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green"
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="mx-5 text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green"
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <FormField
              control={form.control}
              name="ISBN"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm my-3">
                  <div className="space-y-0.5">
                    <FormLabel>ISBN</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="embossing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm my-3">
                  <div className="space-y-0.5">
                    <FormLabel>Embossing</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="foiling"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm my-3">
                  <div className="space-y-0.5">
                    <FormLabel>Foiling</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lamination"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-black">Lamination</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a paper type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"White"}>Gloss</SelectItem>

                      <SelectItem value={"Cream"}>Matte</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex justify-between my-3">
              <Button
                type="button"
                onClick={prevStep}
                className=" mx-5 text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green"
              >
                Previous
              </Button>
              <Button
                type="submit"
                className="mx-5 text-sm bg-green py-2 px-4 border border-1 border-green rounded-sm   hover:font-semibold hover:bg-blue"
              >
                Submit
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => console.error(error))}
        className="form"
      >
        <div>{renderStep()}</div>
      </form>
    </Form>
  );
};

export default UserBookVariantReadyToPrint;
