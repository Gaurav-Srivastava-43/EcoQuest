import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ECOQUEST_SYSTEM_INSTRUCTION } from "../ecoquestContext";
import {
  Bot,
  MessageSquareText,
  CircleX,
  CircleUser,
  SendHorizonal,
} from 'lucide-react';

const apiKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || '';
const ai = new GoogleGenAI({ apiKey });

function Chatbox() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState(
        () => JSON.parse(localStorage.getItem('Chats')) || [
            { role: 'assistant', text: 'Hello, I am EcoPal! How can I help you ?' }
        ]
    );
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);
    
    const handleMessage = async (e) => {
        e.preventDefault();
        const userText = currentMessage.trim();
        if (!userText || isLoading) return;

        if (!apiKey) {
            console.error('API Key is missing. Check VITE_GEMINI_API_KEY.');
            return;
        }

        // Add user message to UI immediately
        const updatedWithUser = [...messages, { role: 'user', text: userText }];
        setMessages(updatedWithUser);
        setCurrentMessage('');
        setIsLoading(true);

        let updatedWithBot = updatedWithUser;

        try {
            // Map history for Gemini API (assistant -> model)
            const formattedHistory = updatedWithUser.slice(0, -1).map((msg) => ({
                role: msg.role === 'assistant' ? 'model' : msg.role,
                parts: [{ text: msg.text }],
            }));
            
            const chat = ai.chats.create({
                model: 'gemini-3.5-flash-lite', 
                config: {
                    systemInstruction: ECOQUEST_SYSTEM_INSTRUCTION,
                    temperature: 0.7,
                },
                history: formattedHistory,
            });

            const response = await chat.sendMessage({ message: userText });
            const botReply = response.text || "I'm having trouble responding right now. Please try again.";
            
            updatedWithBot = [...updatedWithUser, { role: 'assistant', text: botReply }];
        } catch (error) {
            console.error('Error generating response:', error);
            updatedWithBot = [
                ...updatedWithUser,
                {
                    role: 'assistant',
                    text: 'Oops! Something went wrong while connecting to EcoPal. Please try again.',
                },
            ];
        } finally {
            setIsLoading(false);
            setMessages(updatedWithBot);
            localStorage.setItem('Chats', JSON.stringify(updatedWithBot));
        }
    };

    return (
        <>
        {isOpen ? (
            <div className="fixed flex flex-col bottom-4 right-4 p-3 bg-amber-200 border-2 border-teal-600 h-[520px] w-[90vw] sm:w-[400px] rounded-2xl shadow-lg z-50">
                {/* Header */}
                <div className="flex justify-between items-center pb-2 border-b border-teal-700/20">
                    <div className="flex items-center gap-2">
                        <Bot size={28} className="text-teal-700" />
                        <span className="font-bold text-lg text-teal-800">EcoPal</span>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="text-teal-800 hover:text-teal-950 transition-colors"
                        aria-label="Close chat"
                    >
                        <CircleX size={26} />
                    </button>
                </div>

                {/* Messages Body */}
                <div className="p-3 my-2 overflow-y-auto flex-1 flex flex-col gap-3 bg-amber-50 rounded-xl">
                    {messages.map((item, index) => (
                        <div 
                            key={index}
                            className={`flex items-start gap-2 max-w-[88%] ${item.role === 'assistant' ? 'self-start' : 'self-end flex-row-reverse'}`}
                        >
                            <div className="shrink-0 mt-1">
                                {item.role === 'assistant' ? (
                                    <Bot size={20} className="text-teal-600" />
                                ) : (
                                    <CircleUser size={20} className="text-blue-600" />
                                )}
                            </div>

                            <div 
                                className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm break-words ${
                                    item.role === 'assistant'
                                        ? 'bg-teal-600 text-white rounded-tl-none'
                                        : 'bg-blue-600 text-white rounded-tr-none'
                                }`}
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        p: ({ node, ...props }) => <p className="mb-1.5 last:mb-0" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold text-amber-100" {...props} />,
                                        em: ({ node, ...props }) => <em className="italic" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-1 space-y-0.5" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-1 space-y-0.5" {...props} />,
                                        li: ({ node, ...props }) => <li className="my-0.5 leading-snug" {...props} />,
                                        code: ({ node, inline, ...props }) => (
                                            inline 
                                                ? <code className="bg-black/20 px-1 py-0.5 rounded text-xs font-mono" {...props} />
                                                : <pre className="bg-black/30 p-2 rounded text-xs my-1 overflow-x-auto"><code {...props} /></pre>
                                        ),
                                    }}
                                >
                                    {item.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex items-center gap-2 self-start text-xs text-teal-800 bg-white/70 border border-teal-600/30 px-3 py-2 rounded-xl italic animate-pulse">
                            <Bot size={16} className="text-teal-600" />
                            EcoPal is thinking...
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={handleMessage} className="flex items-center gap-2 pt-1">
                    <input 
                        type="text" 
                        value={currentMessage} 
                        placeholder="Enter your queries..." 
                        disabled={isLoading}
                        className="rounded-full px-4 py-2 text-sm w-full font-medium bg-white text-gray-800 border border-teal-600/40 focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-60" 
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <button 
                        type="submit"
                        disabled={isLoading || !currentMessage.trim()}
                        className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shrink-0 shadow transition-colors"
                        aria-label="Send Message"
                    >
                        <SendHorizonal size={20} />
                    </button>
                </form>
            </div>
        ) : (
            <div className="fixed bottom-4 right-4 z-50">
                <MessageSquareText 
                    className="absolute right-0 bottom-14 text-teal-600 size-8 lg:size-10 pointer-events-none drop-shadow" 
                    fill="white"
                />
                <button 
                    className="bg-amber-200 p-3 rounded-full shadow-md border-2 border-teal-600 hover:scale-105 active:scale-95 transition-transform" 
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chat"
                >
                    <Bot className="text-teal-600 size-9 lg:size-10" />
                </button>
            </div>
        )}
        </>
    );
}

export default Chatbox;