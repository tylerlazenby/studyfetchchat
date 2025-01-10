import { Button } from "@/components/ui/button"
import { MessageCircle } from 'lucide-react'
import React from "react";

interface ChatToggleProps {
    isOpen: boolean;
    onClick: () => void;
}

const ChatToggle: React.FC<ChatToggleProps> = ({ isOpen, onClick }) => {
    if (isOpen) return null;

    return (
        <Button
            onClick={onClick}
            className="fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg cursor-pointer"
            size="icon"
        >
            <MessageCircle className="h-6 w-6" />
        </Button>
    )
}

export default ChatToggle

