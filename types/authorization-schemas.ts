import { z } from 'zod';

const avatarAllowedTypes = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);
const avatarMaxSize = 2 * 1024 * 1024;
const fullNameRegex = /^[a-zA-Z ]+$/;
const mobileRegex = /^5[0-9]{2} ?[0-9]{3} ?[0-9]{3}$/;

export const RegisterStep1Schema = z.object({
  email: z.email(),
});
export type RegisterStep1 = z.infer<typeof RegisterStep1Schema>;

const _RegisterStep2Schema = z.object({
  password: z.string().min(3, 'Password too short'),
  confirmPassword: z.string(),
});

export const RegisterStep2Schema = _RegisterStep2Schema.superRefine(({ confirmPassword, password }, context) => {
  if (confirmPassword !== password) {
    context.addIssue({
      message: 'Passwords do not match',
      path: ['confirmPassword'],
      code: 'custom',
    });
  }
});
export type RegisterStep2 = z.infer<typeof RegisterStep2Schema>;

export const RegisterStep3Schema = z.object({
  username: z.string().min(3, 'Username too short'),
  avatar: z
    .instanceof(File)
    .refine((file) => avatarAllowedTypes.has(file.type), {
      message: 'Invalid file type. Only jpg, png and WebP formats allowed',
    })
    .refine((file) => file.size <= avatarMaxSize, {
      message: 'File is too big. Max size of 2 mb permitted',
    })
    .nullish(),
});
export type RegisterStep3 = z.infer<typeof RegisterStep3Schema>;

export function MapRegisterFormToServer(step1: RegisterStep1, step2: RegisterStep2, step3: RegisterStep3) {
  const merged = { ...step1, ...step2, ...step3 };

  return mapToSnakeCase(merged);
}

export const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password required'),
});
export type LoginForm = z.infer<typeof LoginFormSchema>;

export const UserProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Name is required')
    .refine((value) => value.length >= 3, { message: 'Name must be at least 3 characters' })
    .max(50, 'Name must not exceed 50 characters')
    .refine((value) => fullNameRegex.test(value), 'Name can only include letters and spaces'),
  email: z.string(),
  mobileNumber: z
    .string()
    .min(1, 'Mobile number is required')
    .refine((value) => value[0] === '5', 'Georgian mobile numbers must start with 5')
    .refine(
      (value) => mobileRegex.test(value),
      'Please enter a valid Georgian mobile number (9 digits starting with 5)'
    )
    .refine((value) => digitCount(value) === 9, 'Mobile number must be exactly 9 digits'),
  age: z.coerce
    .number('Age is required')
    .int('Age must be a whole number')
    .min(16, 'You must be at least 16 years old to enroll')
    .max(120, 'Please enter a valid age'),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

const digitCount = (value: string) => value.replaceAll(/\D/, '').length;

function toSnakeCase(string_: string): string {
  return string_.replaceAll(/[A-Z]/, (letter) => `_${letter.toLowerCase()}`);
}

export function mapToSnakeCase(object: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [toSnakeCase(key), value]));
}
