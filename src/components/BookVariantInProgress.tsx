import { BOOK_FORMAT, BOOK_SIZE, COVER_DESIGN, ILLUSTRATION_TYPE, LAYOUT_TYPE, PRINT_STATUS, QUERY_KEY } from "@/lib/rbac";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import React, { useState } from "react";
import { Select as ReactSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { createBookVariant, getAllBooks } from "@/lib/api-call";
import { Button } from "@/components/ui/button";
import { IBook } from "@/models/models";
import { Input } from "./ui/input";
import Select from "react-select";
import { SheetClose } from "@/components/ui/sheet";
import { bookVariantSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const BookVariantInProgress = () => {
  type TFormData = z.infer<typeof bookVariantSchema>;

  const [bookList, setBookList] = useState<IBook[]>([]);
  const { toast } = useToast();

  const form = useForm<TFormData>({
    resolver: zodResolver(bookVariantSchema),
    defaultValues: ({
      status: PRINT_STATUS.WORK_IN_PROGRESS,
      lamination: " ",
      number_of_pages: 2
    })
  });

  const onSubmit = async (input: TFormData) => {
    const { data, error, validationErrors } = await createBookVariant(input);

    if (validationErrors?.length || error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create .",
      });

      return;
    } else if (data) {
      toast({
        variant: "default",
        title: "Success",
        description: "Order created successfully!",
      });

      form.reset();
    }
  };

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BOOKS],
    queryFn: async () => {
      const { data, error, validationErrors } = await getAllBooks();

      if (data) {setBookList(data);}

      if (validationErrors?.length) {
        console.error(validationErrors);

        return;
      }

      if (error) {
        console.error(error);
      }

      return data;
    }
  });

  return (
    <div className="my-5 ">

      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit, (error)=>console.error(error))} className="form text-sm">
          <div className="py-1" >

            <div className="py-1 tester">
              <FormField
                control={form.control}
                name="book_id"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel> Book</FormLabel>
                    <ReactSelect onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl >
                        <SelectTrigger  >
                          <SelectValue  placeholder="Select a Book" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bookList?.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </ReactSelect>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>

              <FormField
                control={form.control}
                name="word_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Number of words</FormLabel>
                    <FormControl>
                      <Input placeholder="Number of words" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-1">
              <FormField
                control={form.control}
                name="current_book_format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Book Format</FormLabel>
                    <FormControl>
                      <Select
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="please choose a book format"
                        options={[
                          { value: BOOK_FORMAT.MS_WORD, label: "MS Word" },
                          { value: BOOK_FORMAT.PDF, label: "PDF" }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-1">
              <FormField
                control={form.control}
                name="portrait"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Potriat</FormLabel>
                    <FormControl>
                      <Select
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="Is the book potrait"
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-1">
              <FormField
                control={form.control}
                name="book_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Book Size</FormLabel>
                    <FormControl>
                      <Select
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="Select book size"
                        options={[
                          { value: BOOK_SIZE.A4, label: "A4" },
                          { value: BOOK_SIZE.A5, label: "A5" }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>

              <FormField
                control={form.control}
                name="no_of_books"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Number of Books</FormLabel>
                    <FormControl>
                      <Input placeholder="Number of books" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-1">
              <FormField
                control={form.control}
                name="editing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Editing</FormLabel>
                    <FormControl>
                      <Select
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="Do you require editting"
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-1">
              <FormField
                control={form.control}
                name="ISBN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Select
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="Do you require ISBN"
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-1">
              <FormField
                control={form.control}
                name="proof_reading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>proof Reading</FormLabel>
                    <FormControl>
                      <Select
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="Do you require Proof reading"
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-1">
              <FormField
                control={form.control}
                name="online_sale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Onine Sales (Amazon)</FormLabel>
                    <FormControl>
                      <Select
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="Do you require online sales"
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-1">
              <FormField
                control={form.control}
                name="cover_design"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Cover Design</FormLabel>
                    <FormControl>
                      <Select
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="Do you require cover design"
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.watch("cover_design") &&

              <div className="py-1">
                <FormField
                  control={form.control}
                  name="cover_design_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Cover Design  Type</FormLabel>
                      <FormControl>
                        <Select
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption?.value);
                          }}
                          placeholder="Which of the cover design would you prefer"
                          options={[
                            { value: COVER_DESIGN.ARTIST_ILLUSTRATED, label: "Artist Illustrated" },
                            { value: COVER_DESIGN.GRAPHICS_WITH_ONLINE_IMAGES, label: "Graphics with online images/author supplied image" },
                            { value: COVER_DESIGN.GRAPHICS_WITH_PREMIUM_IMAGES, label: "Graphics with premium paid image" },
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            }

            <div className="py-1">
              <FormField
                control={form.control}
                name="inside_layout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Do you require inside Layot design</FormLabel>
                    <FormControl>
                      <Select
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="Do you require inside layout design"
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.watch("inside_layout") &&

              <div className="py-1">
                <FormField
                  control={form.control}
                  name="inside_layout_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Inside Layout Type</FormLabel>
                      <FormControl>
                        <Select
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption?.value);
                          }}
                          placeholder="Which of the inside layout would you prefer"
                          options={[
                            { value: LAYOUT_TYPE.POETRY_LAYOUT, label: "Poetry Layout" },
                            { value: LAYOUT_TYPE.POETRY_WITH_PICTURES, label: "Poetry with Pictures" },
                            { value: LAYOUT_TYPE.SIMPLE_FICTION_WITHOUT_GRAPHICS, label: "Simple fiction/non-fiction layout (no graphics or image)" },
                            { value: LAYOUT_TYPE.SIMPLE_FICTION_WITH_GRAPHICS, label: "Simple fiction/non-fiction layout (no graphics or image)" },
                            { value: LAYOUT_TYPE.COMIC, label: "Comic" },
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            }

            <div className="py-1">
              <FormField
                control={form.control}
                name="art_illustration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Do you require art illustration</FormLabel>
                    <FormControl>
                      <Select
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="Do you require art illustration"
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" }
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.watch("art_illustration") &&

            <div className="py-1">
              <FormField
                control={form.control}
                name="art_illustration_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Art Illustration Type</FormLabel>
                    <FormControl>
                      <Select
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.value);
                        }}
                        placeholder="Which of the art llustration type do you prefer"
                        options={[
                          { value: ILLUSTRATION_TYPE.SIMPLE_BLACK_AND_WHITE_SKETCH_AND_LINKING, label: "Simple black and white sketch/inking" },
                          { value: ILLUSTRATION_TYPE.FULL_COLOR_FLAT_2D_ILLUSTRATION, label: "Full color flat 2D illustration (Children and young Adult style)" },
                          { value: ILLUSTRATION_TYPE.FULL_COLOR_FLAT_3D_ILLUSTRATION, label: "Full color 3D illustration (Adult comic book style)" },
                          { value: ILLUSTRATION_TYPE.COMIC, label: "Comic" },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            }

          </div>

          <div className="my-5">
            <Button data-cy="submit-order"
              disabled={form.formState.isSubmitting} className="bg-blue text-white py-2 px-7 rounded-md font-medium text-xs" type="submit">
              Submit
            </Button>

            <SheetClose asChild>
              <Button className="border border-danger text-danger bg-white py-2 rounded-md px-4 mx-1 font-medium text-xs">
                Cancel
              </Button>
            </SheetClose>
          </div>
        </form>
      </Form>

    </div>
  );
};

export default BookVariantInProgress;
