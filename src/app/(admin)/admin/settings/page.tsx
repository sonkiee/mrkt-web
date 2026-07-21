"use client";

import { inviteAdmin } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleActionError } from "@/lib/handle-error";
import { InviteAdminData, inviteAdminSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

export default function AdminSettingsPage() {
  const form = useForm<InviteAdminData>({
    resolver: zodResolver(inviteAdminSchema),
    defaultValues: {
      email: "",
    },
  });

  const { execute } = useAction(inviteAdmin, {
    onSuccess: () => {
      console.log("Invite sent successfully");
    },
    onError: (error) => {
      handleActionError(error, "Invite Admin Action");
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p>Here you can manage your store settings.</p>
      </div>

      <Card title="General Settings" className="p-4">
        <h1 className="text-lg font-semibold mb-2">Invite Administrator</h1>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(execute)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. admin@example.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" variant={"default"}>
              Send Invite
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
