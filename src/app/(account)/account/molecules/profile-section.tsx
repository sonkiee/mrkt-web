import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetchUserProfile } from "@/queries/user";
import { ProfileData, profileSchema } from "@/schema";
import { date } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Eye, EyeOff } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export type ProfileSectionProps = {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
  activeTab: string;
  showPassword: boolean;
  handleSaveProfile: (e: React.FormEvent) => void;
  handleSavePassword: (e: React.FormEvent) => void;
  setShowPassword: (show: boolean) => void;
};

const ProfileSection = ({
  activeTab,
  showPassword,
  handleSaveProfile,
  handleSavePassword,
  setShowPassword,
}: ProfileSectionProps) => {
  const { data } = useFetchUserProfile();

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      form.reset({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phone: data.phone || "",
        email: data.email || "",
      });
    }
  }, [data, form]);

  const abbr = data
    ? `${data.firstName?.[0] || ""}${data.lastName?.[0] || ""}`.toUpperCase()
    : "JD";

  return (
    <>
      {activeTab === "profile" && (
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4 rounded-lg border p-6 sm:flex-row">
            <Avatar className="h-20 w-20 border rounded-sm">
              <AvatarImage
                src="/placeholder.svg?height=80&width=80&text=JD"
                alt="John Doe"
              />
              <AvatarFallback>{abbr}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">
                {data?.firstName} {data?.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{data?.email}</p>
              <p className="text-sm text-muted-foreground">
                Member since {date(data?.createdAt)}
              </p>
            </div>
            <div className="ml-auto">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Change Photo
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={handleSaveProfile}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              id="first-name"
                              placeholder="John"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              id="last-name"
                              placeholder="Doe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              placeholder="john.doe@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              id="phone"
                              placeholder="(123) 456-7890"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSavePassword}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button type="submit">Update Password</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProfileSection;
