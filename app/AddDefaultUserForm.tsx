'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {createUser} from "@/actions/user/createUser";

const addDefaultFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
})

const AddDefaultUserForm = () => {
    const form = useForm<z.infer<typeof addDefaultFormSchema>>({
        resolver: zodResolver(addDefaultFormSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof addDefaultFormSchema>) => {
        const result = await createUser(values)
        console.log(result)
    }

    return (<Form  {...form}>
        <form className={'w-[900px] space-y-8'} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Email"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                type={'password'}
                                {...field}
                                placeholder="***"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Your Name"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Button type="submit">Create User</Button>
        </form>
    </Form>)
}

export default AddDefaultUserForm