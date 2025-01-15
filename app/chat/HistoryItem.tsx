import Markdown from "react-markdown";

enum HistoryType {
    USER = 'user',
    ASSISTANT = 'assistant',
    THINKING = 'thinking',
    SYSTEM = 'system',
    ERROR = 'error'
}

const HistoryItem = ({ type, content }: { type: HistoryType, content: string | null }) => {
    if (type === 'thinking') {
        return (
            <div className="flex justify-start">
                <div className="bg-gray-200 rounded-lg p-3 max-w-[70%]">
                    <p className="text-gray-700">Thinking...</p>
                </div>
            </div>
        );
    }

    if (type === 'error') {
        return (
            <div className="flex justify-center">
                <div className="bg-red-100 text-red-700 rounded-lg p-3 max-w-[70%]">
                    <p>{content}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-3 max-w-[70%] ${type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <Markdown>{content}</Markdown>
            </div>
        </div>
    );
}

export default HistoryItem;

