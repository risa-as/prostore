import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"

// Combine class names using clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert a value to a plain JavaScript object by serializing and deserializing it.
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

// Form Errors

 
export function formatError(error: unknown) {
  // ZOD ERRORS
  if (error instanceof ZodError) {
    return {
      success: false,
      fieldErrors: error.flatten().fieldErrors,
      formError: ""
    }
  }

  // PRISMA UNIQUE ERROR (email exists)
  if (
    error &&
    typeof error === "object" &&
    "name" in error &&
    "code" in error &&
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "23505"
  ) {
    return {
      success: false,
      fieldErrors: {},
      formError: "Email already exists",
    }
  }

  // UNKNOWN ERROR
  return {
    success: false,
    fieldErrors: {},
    formError: "An unexpected error occurred",
  }
}
