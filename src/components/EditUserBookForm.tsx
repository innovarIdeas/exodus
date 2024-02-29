import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { editUserBook } from "@/lib/api-call";
import { updateBookSchema } from "@/models/validation-schema";
import { useForm } from "react-hook-form";
import { useGetUserBooks } from "@/lib/hook";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IEditBookFormProps {
  id: string;
  title: string;
  description?: string;
  author: string;
}

export const EditUserBookForm = ({ id, title, description, author }: IEditBookFormProps) => {
  const { toast } = useToast();
  const session = useSession();

  type TFormData = z.infer<typeof updateBookSchema>;

  const form = useForm<TFormData>({
    resolver: zodResolver(updateBookSchema),
    defaultValues: { title, description, author },
  });

  const { refetch } = useGetUserBooks(session.data?.user.id ?? "");

  const onSubmit = async (input: TFormData) => {
    const { data, error, validationErrors } = await editUserBook(id, input);

    if (data) {
      toast({
        variant: "default",
        description: "Book updated successfully!",
        title: "Success",
      });

      form.reset();
      refetch();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update book.",
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        <div className="py-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Title </FormLabel>
                <FormControl>
                  <Input placeholder="Please enter a Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="py-1">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Author </FormLabel>
                <FormControl>
                  <Input placeholder="Please enter author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about the book"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-5 py-1">
          <div className="py-2 ">
            <Button
              type="button"
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
              className="text-sm bg-blue py-2 px-4 create-button border border-1 border-blue rounded-sm   hover:font-semibold hover:bg-green"
            >
              {" "}
              Update Book
            </Button>
          </div>

          <DialogClose>
            <div className="py-2 ">
              <Button
                type="button"
                className="text-sm  py-2 px-4 text-black rounded-sm delete-button border border-1 border-red  hover:font-semibold hover:bg-red"
              >
                Cancel
              </Button>
            </div>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default EditUserBookForm;
