import path from "path/win32";
import * as z from "zod";
import { fi } from "zod/v4/locales";

export const signinSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const deleteImageSchema = z.object({
  productId: z.uuid().min(1, "Product ID is required"),
  imageId: z.uuid().min(1, "Image ID is required"),
});

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    consent: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
      path: ["consent"],
    }),
    confirmPassword: z
      .string("Confirm password is required")
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Set the error on the confirmPassword field
  });

export const productImageSchema = z.object({
  file: z.instanceof(File),
});

export const productVariantSchema = z.object({
  sku: z.string().max(80, "SKU cannot exceed 80 characters").optional(),

  attributes: z.record(z.string(), z.string()).default({}),

  price: z.coerce.number().positive("Price must be a positive number"),

  compareAtPrice: z.coerce
    .number()
    .positive("Compare price must be positive")
    .optional(),

  stockQty: z.coerce.number().int().min(0, "Stock must be ≥ 0"),

  isActive: z.boolean().optional(),
});

export const createProductSchema = z.object({
  title: z
    .string()
    .min(1, "Product title is required")
    .max(200, "Title cannot exceed 200 characters"),

  slug: z
    .string()
    .min(1, "Slug is required")
    .max(220, "Slug cannot exceed 220 characters"),

  categoryId: z.uuid("Invalid category ID"),

  brandId: z.uuid("Invalid brand ID").optional(),

  model: z.string().max(160, "Model cannot exceed 160 characters").optional(),

  series: z.string().max(160, "Series cannot exceed 160 characters").optional(),

  description: z.string().min(1, "Product description is required"),

  specs: z.record(z.string(), z.any()).optional(),

  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),

  files: z
    .array(z.instanceof(File))
    .min(1, "At least one product image is required"),

  variants: z
    .array(productVariantSchema)
    .min(1, "At least one product variant is required"),
});

export const updateProductSchema = createProductSchema.extend({
  id: z.uuid("Invalid product ID"),
});

export const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),

  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  saveToAddressBook: z.boolean().optional(), // ✅ add
});

const base = z.object({
  items: z.array(
    z.object({
      variantId: z.string(),
      qty: z.number().min(1),
    }),
  ),
  deliveryMethod: z.enum(["pickup", "delivery"]),
  saveToAddressBook: z.boolean().optional(),
});

export const createOrderSchema = z.union([
  base.extend({
    addressId: z.string().min(1),
    shippingAddress: shippingSchema.optional(),
  }),
  base.extend({
    addressId: z.string().optional(),
    shippingAddress: shippingSchema,
  }),
]);

export const initPaymentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
});

export const inviteAdminSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
});

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.email("Invalid email address").optional(),
});

export const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export const vendorOnboardingSchema = z.object({
  // Step 1: Account Info
  fullName: z.string().min(2, "Full name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),

  // Step 2: Storefront Details
  storeName: z.string().min(2, "Storefront name is required"),
  category: z.string().min(1, "Primary business category is required"),
  storeBio: z.string().min(10, "Store bio must be at least 10 characters"),
  address: z.string().min(5, "Store address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),

  // Step 3: Settlement Bank & Identity Verification
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z.string().length(10, "Account number must be 10 digits"),
  accountName: z.string().min(2, "Account name is required"),
  businessType: z.enum(["individual", "corporate"]),
  cacNumber: z.string().optional(),
  idNumber: z.string().min(5, "Government ID or NIN is required"),
});

export type VendorOnboardingData = z.infer<typeof vendorOnboardingSchema>;

export type ProfileData = z.infer<typeof profileSchema>;
export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;

export type InviteAdminData = z.infer<typeof inviteAdminSchema>;

export type CreateProductData = z.input<typeof createProductSchema>;
export type UpdateProductData = z.infer<typeof updateProductSchema>;

export type ProductVariantData = z.infer<typeof productVariantSchema>;
export type SigninData = z.infer<typeof signinSchema>;
export type SignupData = z.infer<typeof signupSchema>;

export type ShippingData = z.infer<typeof shippingSchema>;
export type CreateOrderData = z.infer<typeof createOrderSchema>;

export const createBrandSchema = z.object({
  name: z.string().min(1, "Brand name is required").max(100),
});

export type CreateBrandData = z.infer<typeof createBrandSchema>;

export const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(100),
  description: z.string().optional(),
  parentId: z.string().uuid().optional().nullable(),
  allowedAttributes: z.object({
    variantOptions: z.array(z.string()).default([]),
    specFields: z.array(z.string()).default([]),
  }).default({ variantOptions: [], specFields: [] }),
});

export type CreateCategoryData = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.extend({
  id: z.string().uuid("Invalid category ID"),
});

export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;

export const vendorProfileSchema = z.object({
  businessName: z.string().min(2, "Store name is required"),
  businessEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().min(10, "Valid phone number is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: z.string().min(5, "Address is required"),
});

export type VendorProfileData = z.infer<typeof vendorProfileSchema>;
