'use client'

import {useCallback, useEffect, useState, useRef} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormField, FormItem,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import HistoryItem from "@/app/chat/HistoryItem"
import ChatToggle from './ChatToggle'
import { X } from 'lucide-react'
import sendTextChat from "@/actions/ai/sendTextChat";
import getUserHistory from "@/actions/history/getUserHistory";

enum HistoryType {
    USER = 'user',
    ASSISTANT = 'assistant',
    THINKING = 'thinking',
    SYSTEM = 'system',
    ERROR = 'error'
}

interface HistoryItemType {
    type: HistoryType;
    content: string | null;
}

const formSchema = z.object({
    message: z.string().min(1, {
        message: "Message is required.",
    }),
})

const ChatPage = () => {
    const [history, setHistory] = useState<HistoryItemType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const closeChat = useCallback(() => {
        setIsOpen(false);
    }, []);

    const scrollToBottom = useCallback(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setHistory(prev => ([...prev, {
            type: HistoryType.USER,
            content: values.message
        }]))

        setHistory(prev => ([...prev, {
            type: HistoryType.THINKING,
            content: null
        }]))

        scrollToBottom();

        try {
            const result = await sendTextChat(values.message)

            setHistory(prev => {
                const newHistory = [...prev];
                newHistory.pop(); // Remove the 'thinking' item
                return [...newHistory, {
                    type: HistoryType.ASSISTANT,
                    content: result
                }];
            })
        } catch (error) {
            console.log(error)
            setHistory(prev => {
                const newHistory = [...prev];
                newHistory.pop(); // Remove the 'thinking' item
                return [...newHistory, {
                    type: HistoryType.ERROR,
                    content: 'An error occurred while fetching the response. Please try again.'
                }];
            })
        }

        setIsLoading(false)
        form.reset()
        scrollToBottom();
    }

    useEffect(() => {
        getUserHistory('tyler@clevoro.com')
            .then(history => {
                setHistory(history.map(item => ({
                    type: item.type as HistoryType,
                    content: item.content
                })))
                scrollToBottom();
            })
            .catch(e => console.error('Could not fetch the chat history', e))

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, scrollToBottom]);

    useEffect(() => {
        scrollToBottom();
    }, [history, scrollToBottom]);

    return (
        <>
            <ChatToggle isOpen={isOpen} onClick={() => setIsOpen(true)}/>
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"/>
            )}
            <div
                className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-background shadow-xl transition-transform duration-300 ease-in-out md:w-[400px] ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    <h1 className="text-2xl font-bold p-4 border-b relative">Chat</h1>
                    <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4">
                        {history.map((item, index) => (
                            <HistoryItem key={index} type={item.type} content={item.content}/>
                        ))}
                    </div>
                    <Button
                        onClick={closeChat}
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4 cursor-pointer"
                    >
                        <X className="h-4 w-4"/>
                        <span className="sr-only">Close</span>
                    </Button>
                    <div className="p-4 border-t">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({field}) => (
                                        <FormItem className="flex-grow">
                                            <FormControl>
                                                <Input placeholder="Type your message here..." {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Sending...' : 'Send'}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatPage;

