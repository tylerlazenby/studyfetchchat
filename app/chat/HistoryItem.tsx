import Markdown from "react-markdown";

const HistoryItem = ({ type, content }: { type: 'message' | 'response' | 'thinking' | 'error', content: string | null }) => {
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
        <div className={`flex ${type === 'message' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-3 max-w-[70%] ${type === 'message' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <Markdown>{content}</Markdown>
            </div>
        </div>
    );
}

export default HistoryItem;

