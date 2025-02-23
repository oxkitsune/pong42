"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User, Upload } from "lucide-react";
import { toast } from "sonner";
import { userSettingsSchema } from "@/lib/userSettingsSchema";
import { updateSettings, UserSettingsUpdate } from "@/lib/actions";
import { useSession } from "next-auth/react";
import TableTennisPaddle from "@/components/table-tennis-paddle";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const form = useForm<UserSettingsUpdate>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      displayName: "",
      paddleColor: "#DD2E44",
      handleColor: "#D99E82",
      accentColor: "#FFCC4D",
      avatarUrl: "",
    },
  });

  useEffect(() => {
    if (session?.user) {
      form.reset({
        displayName: session.user.name || "",
        paddleColor: "#DD2E44",
        handleColor: "#D99E82",
        accentColor: "#FFCC4D",
        avatarUrl: session.user.image || "",
      });
    }
  }, [session, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("avatarUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: UserSettingsUpdate) {
    try {
      setLoading(true);
      console.log("got data:", data);
      const response = await updateSettings(data);
      if (response.success) {
        toast("Settings updated", {
          description: "Your profile settings have been saved successfully.",
        });
      } else {
        toast.error("Error", {
          description: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Customize your table tennis profile and equipment preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={form.watch("avatarUrl")} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Label htmlFor="avatar" className="cursor-pointer">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Upload className="h-4 w-4" />
                      Upload Profile Picture
                    </div>
                  </Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <p className="text-sm text-muted-foreground">
                    Recommended: Square image, at least 400x400px
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your display name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Paddle Colors</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="paddleColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paddle Head Color</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            type="color"
                            className="w-16 h-10 p-1"
                            {...field}
                          />
                        </FormControl>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="handleColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Handle Color</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            type="color"
                            className="w-16 h-10 p-1"
                            {...field}
                          />
                        </FormControl>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accentColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accent Color</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            type="color"
                            className="w-16 h-10 p-1"
                            {...field}
                          />
                        </FormControl>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-center mt-6">
                <TableTennisPaddle
                  width={192}
                  height={192}
                  paddleColor={form.watch("paddleColor")}
                  handleColor={form.watch("handleColor")}
                  accentColor={form.watch("accentColor")}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
