'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const signUpSchema = z
    .object({
        firstName: z
            .string()
            .min(2, 'First name must be at least 2 characters'),
        lastName: z.string().min(2, 'Last name must be at least 2 characters'),
        username: z.string().min(3, 'Username must be at least 3 characters'),
        email: z.string().email('Invalid email address'),
        phoneNumber: z.string().min(10, 'Invalid phone number'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
        },
    });

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = form;

    const onSubmit = (data: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        phoneNumber: string;
        password: string;
        confirmPassword: string;
    }) => {
        console.log('Sign Up Data:', data);
    };

    return (
        <section className="padding-x padding-y">
            <div className="container flex items-center justify-center flex-col gap-4">
                <div className="mx-auto w-full max-w-lg rounded-md p-6 shadow">
                    <div className="mb-6 flex flex-col items-center">
                        <a href={`/`}>
                            <img
                                src="https://www.shadcnblocks.com/images/block/block-1.svg"
                                alt="logo"
                                className="mb-7 h-10 w-auto"
                            />
                        </a>
                        <p className="mb-2 text-2xl font-bold">
                            Shadcnblocks.com
                        </p>
                        <p className="text-muted-foreground">
                            Create your account
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <FormField
                                        control={control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    First Name *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="eg: John"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors.firstName?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Last Name *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="eg: Doe"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors.lastName?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="eg: johndoe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {errors.username?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="eg: johndoe@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {errors.email?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="eg: @John*****"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {errors.password?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm Password *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="eg: @John*****"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {
                                                    errors.confirmPassword
                                                        ?.message
                                                }
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="mt-2 w-full"
                                    disabled={isSubmitting}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                        <p>Already have an account?</p>
                        <a
                            href={`/auth/sign-in`}
                            className="font-medium text-primary"
                        >
                            Sign In
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
