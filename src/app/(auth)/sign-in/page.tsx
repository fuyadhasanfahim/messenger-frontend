'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
});

export default function SignInPage() {
    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = form;

    const onSubmit = (data: {
        email: string;
        password: string;
        rememberMe?: boolean;
    }) => {
        console.log('Sign In Data:', data);
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
                        <p className="text-muted-foreground">Welcome back</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-4">
                                <FormField
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email"
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
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {errors.password?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-between">
                                    <FormField
                                        control={control}
                                        name="rememberMe"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <Checkbox
                                                        id="remember"
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel htmlFor="remember">
                                                    Remember me
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <a
                                        href="#"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <Button
                                    type="submit"
                                    className="mt-2 w-full"
                                    disabled={isSubmitting}
                                >
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                        <p>{`Don't have an account?`}</p>
                        <a
                            href={`/auth/sign-up`}
                            className="font-medium text-primary"
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
