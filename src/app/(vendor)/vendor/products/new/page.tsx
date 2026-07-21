"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { createProductSchema, CreateProductData } from "@/schema";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { createProduct } from "@/actions/admin";
import { useListBrands, useListCategories } from "@/queries/admin";
import { toast } from "sonner";
import { useRef, useState } from "react";
import Image from "next/image";
import FileUploadThing from "@/components/file-upload-thing";
import ProductForm from "../molecules/product-form";

export default function CreateProduct() {
  return <ProductForm />;
}
