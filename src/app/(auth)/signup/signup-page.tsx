"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SignupData, signupSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useAction } from "next-safe-action/hooks";
import { signup } from "@/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      consent: false,
    },
  });

  const { execute, isExecuting } = useAction(signup, {
    onSuccess(data) {
      console.log("Action Success:", data);
      toast.success("Account created successfully! Please sign in.");
      router.replace("/signin");
    },
    onError(error) {
      if (error.error.serverError) {
        toast.error(error.error.serverError ?? "An error occurred during signup");
      }
      if (error.error.validationErrors) {
        console.log("Validation Errors:", error.error.validationErrors);
      }
    },
  });

  return (
    <main className="flex min-h-screen w-full bg-[#f8f9ff]">
      {/* ── Left Panel: Hero Image (desktop only) ── */}
      <section className="hidden md:flex w-1/2 relative overflow-hidden">
        {/* Background image with gradient fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
          style={{
            backgroundImage:
              "url('https://placehold.co/900x1080/00685f/FFFFFF?text=Lumina'), linear-gradient(135deg,#00685f 0%,#003d38 100%)",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent flex flex-col justify-end p-12 text-white">
          {/* Glassmorphism card */}
          <div
            className="p-8 rounded-xl max-w-lg border border-white/20"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <h1 className="text-[28px] leading-[34px] font-bold tracking-tight mb-4">
              Welcome to Lumina
            </h1>
            <p className="text-[16px] leading-relaxed opacity-90">
              Experience the next generation of premium tech solutions and
              repairs. Trust, precision, and excellence delivered in every
              service.
            </p>
            {/* Social proof */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#89f5e7]" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#dae2fd]" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#ffdbce]" />
              </div>
              <span className="text-[12px] font-semibold tracking-wide">
                Joined by 10k+ tech enthusiasts
              </span>
            </div>
          </div>
        </div>
        {/* Floating logo */}
        <div className="absolute top-12 left-12">
          <span className="text-[28px] font-extrabold tracking-tight text-white drop-shadow-md">
            Lumina
          </span>
        </div>
      </section>

      {/* ── Right Panel: Auth Form ── */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-6 bg-[#f8f9ff]">
        <div
          className="w-full max-w-md"
          style={{ animation: "fadeIn 0.6s ease-out" }}
        >
          {/* Mobile branding */}
          <div className="md:hidden flex justify-center mb-8">
            <span className="text-[28px] font-extrabold tracking-tight text-primary">
              Lumina
            </span>
          </div>

          {/* Form header */}
          <div className="text-center mb-8">
            <h2 className="text-[22px] leading-[28px] font-bold tracking-tight text-[#0b1c30]">
              Create your Lumina Account
            </h2>
            <p className="text-[14px] leading-[20px] text-[#3d4947] mt-2">
              Join the Lumina community today
            </p>
          </div>

          {/* Tab toggle */}
          <div className="bg-[#eff4ff] p-1 rounded-xl flex mb-8">
            <Link
              href="/signin"
              className="w-1/2 py-2 text-[12px] font-semibold tracking-wide rounded-lg transition-all text-center text-[#3d4947] hover:text-[#0b1c30]"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="w-1/2 py-2 text-[12px] font-semibold tracking-wide rounded-lg transition-all text-center bg-white text-primary shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(execute)}
            >
              {/* First + Last Name row */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-[11px] font-medium tracking-widest uppercase text-[#3d4947] mb-1 ml-1">
                        First Name
                      </label>
                      <FormControl>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a77] text-[20px]">
                            person
                          </span>
                          <input
                            type="text"
                            placeholder="John"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-[#bcc9c6] rounded-xl text-[14px] leading-[20px] text-[#0b1c30] placeholder:text-[#6d7a77] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                            {...field}
                          />
                        </div>
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
                      <label className="block text-[11px] font-medium tracking-widest uppercase text-[#3d4947] mb-1 ml-1">
                        Last Name
                      </label>
                      <FormControl>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a77] text-[20px]">
                            person
                          </span>
                          <input
                            type="text"
                            placeholder="Doe"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-[#bcc9c6] rounded-xl text-[14px] leading-[20px] text-[#0b1c30] placeholder:text-[#6d7a77] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-[11px] font-medium tracking-widest uppercase text-[#3d4947] mb-1 ml-1">
                      Email Address
                    </label>
                    <FormControl>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a77] text-[20px]">
                          mail
                        </span>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-[#bcc9c6] rounded-xl text-[14px] leading-[20px] text-[#0b1c30] placeholder:text-[#6d7a77] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-[11px] font-medium tracking-widest uppercase text-[#3d4947] mb-1 ml-1">
                      Password
                    </label>
                    <FormControl>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a77] text-[20px]">
                          lock
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-12 py-3 bg-white border border-[#bcc9c6] rounded-xl text-[14px] leading-[20px] text-[#0b1c30] placeholder:text-[#6d7a77] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7a77] hover:text-[#0b1c30] transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-[11px] font-medium tracking-widest uppercase text-[#3d4947] mb-1 ml-1">
                      Confirm Password
                    </label>
                    <FormControl>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a77] text-[20px]">
                          lock
                        </span>
                        <input
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-12 py-3 bg-white border border-[#bcc9c6] rounded-xl text-[14px] leading-[20px] text-[#0b1c30] placeholder:text-[#6d7a77] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7a77] hover:text-[#0b1c30] transition-colors"
                          onClick={() => setShowConfirm(!showConfirm)}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showConfirm ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms consent */}
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="consent"
                          checked={field.value ?? false}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          className="mt-0.5 border-[#bcc9c6] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label
                          htmlFor="consent"
                          className="text-[12px] leading-[18px] text-[#3d4947] cursor-pointer"
                        >
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary hover:underline font-semibold">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-primary hover:underline font-semibold">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={isExecuting}
                className="w-full py-3 bg-primary text-white text-[12px] font-semibold tracking-wide rounded-xl flex items-center justify-center gap-2 mt-2 hover:opacity-95 active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(0,0,0,0.04)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{isExecuting ? "Creating Account…" : "Get Started"}</span>
                {!isExecuting && (
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                )}
              </button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#bcc9c6]/30" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-[#f8f9ff] text-[11px] font-medium uppercase tracking-widest text-[#6d7a77]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social logins */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-white border border-[#bcc9c6] rounded-xl hover:bg-[#eff4ff] transition-colors group"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-[12px] font-semibold text-[#0b1c30]">
                Google
              </span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-white border border-[#bcc9c6] rounded-xl hover:bg-[#eff4ff] transition-colors group"
            >
              <span className="material-symbols-outlined text-[20px] text-[#0b1c30] group-hover:scale-110 transition-transform">
                phone_iphone
              </span>
              <span className="text-[12px] font-semibold text-[#0b1c30]">
                Phone
              </span>
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-[14px] text-[#3d4947]">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
