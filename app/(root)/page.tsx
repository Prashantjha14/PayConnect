"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  upiId: z
    .string()
    .min(5, "UPI ID must be at least 5 characters long.")
    .regex(
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/,
      "UPI ID must be in a valid format (e.g., user@upi)."
    ),
  amount: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const MainPage = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upiId: "",
      amount: undefined,
    },
  });

  const onSubmit = (values: FormValues) => {
    const baseUrl = "/payment";
    const params = new URLSearchParams();

    params.append("upiId", values.upiId);
    if (values.amount) {
      params.append("amount", values.amount.toString());
    }

    router.push(`${baseUrl}?${params.toString()}`);
  };

  return (
    <div className="container max-w-md mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            UPI Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="upiId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="input_required">UPI ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Merchant UPI ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="101"
                          className="pl-10"
                          value={value || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            onChange(value ? parseFloat(value) : undefined);
                          }}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary" className="w-full">
                Generate QR Code
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainPage;
