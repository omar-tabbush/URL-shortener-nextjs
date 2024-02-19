"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { CopyLinkModal } from "../copy-link-modal";
import { Url } from "@/types/url";
import { Toaster, toast } from "sonner";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
  longUrl: z.string().url({ message: "Please enter a valid URL" }),
  shortUrl: z
    .string()
    .startsWith(`${process.env.BASE_URL}/`, {
      message: "Custom URL must start with " + process.env.BASE_URL + "/",
    })
    .min(`${process.env.BASE_URL}/`.length + 1, {
      message: "Custom URL must be at least 1 character long",
    })
    // regex restrict special characters without what is inside `${process.env.BASE_URL}/`
    .regex(
      new RegExp(
        `^${process.env.BASE_URL}/[a-zA-Z0-9-_]+(?!.*[!@#$%^&*(),.?":{}|<>])$`
      ),
      {
        message: "Custom URL must not contain special characters",
      }
    )
    .url({ message: "Please enter a valid URL" }),
});

export default function CustomUrlForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longUrl: "",
      shortUrl: `${process.env.BASE_URL}/`,
    },
  });

  const session = useSession();
  const [response, setResponse] = React.useState<Url | false>(false);
  const [open, setOpen] = React.useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.shortUrl = values.shortUrl.replace(`${process.env.BASE_URL}/`, "");
    try {
      const request = await fetch(`${process.env.API_URL}/url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.user.access_token ?? ""}`,
        },
        body: JSON.stringify(values),
      });
      const data = await request.json();
      if (request.ok) {
        setResponse(data);
        setOpen(true);
      } else {
        setOpen(false);
        toast.error(data.message);
      }
    } catch (err) {
      console.warn(err);
      setOpen(false);
      toast.error("An error occurred");
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 justify-center"
        >
          <FormField
            control={form.control}
            name="longUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter URL to customize"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your customized url"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CopyLinkModal open={open} setOpen={setOpen} response={response} />
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
          >
            {!form.formState.isSubmitting ? (
              "Customize!"
            ) : (
              <Spinner className="" />
            )}
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
