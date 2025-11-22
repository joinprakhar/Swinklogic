'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Loader2, User, Bot as BotIcon } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface AiAssistantSheetProps {
  preDefinedInput?: string;
  conversation: Message[];
  setConversation: (conversation: Message[]) => void;
  onJsonGenerated: (json: string) => void;
}

export default function AiAssistantSheet({ preDefinedInput, conversation, setConversation, onJsonGenerated }: AiAssistantSheetProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [preDefinedText, setPreDefinedText] = useState(preDefinedInput || "")

  const handleSendMessage = async () => {
    if (input.trim() || !loading || preDefinedInput) {
      let inputText = conversation.length === 0 && preDefinedInput ? preDefinedInput : input
      const userMessage: Message = {
        role: "user",
        parts: [{ text: inputText }],
      };
            console.log(userMessage)

      const updatedConversation = [...conversation, userMessage];
      setConversation(updatedConversation);
      setInput("");
      setLoading(true);

      try {
        const genAI = new GoogleGenerativeAI(
          process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
        );
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const chat = model.startChat({
          history: updatedConversation.slice(1).map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.parts[0].text }],
          })),
        });

        const result = await chat.sendMessage(inputText);
        const response = await result.response;
        const text = response.text();

        const modelMessage: Message = {
          role: "model",
          parts: [{ text }],
        };

        const finalConversation = [...updatedConversation, modelMessage];
        setConversation(finalConversation);

        // Try to extract JSON from the response
        try {
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const jsonString = jsonMatch[0];
            JSON.parse(jsonString); // Validate it's valid JSON
            onJsonGenerated(jsonString);
          }
        } catch (e) {
          // Not valid JSON, ignore
        }
      } catch (error) {
        console.error("Error with Gemini API:", error);
        const errorMessage: Message = {
          role: "model",
          parts: [{ text: "Sorry, I encountered an error. Please try again." }],
        };
        setConversation([...updatedConversation, errorMessage]);
      } finally {
        setLoading(false);
      }
    } else {
      return;
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Configuration Assistant
          </SheetTitle>
          <SheetDescription>
            Chat with AI to generate scraping configurations
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 mt-6 mb-4">
          <div className="space-y-4">
            {conversation.slice(1).map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "user" ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <BotIcon className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {message.parts[0].text}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <BotIcon className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t pt-4 space-y-4">
          {conversation.length === 0 && preDefinedInput && (
            <div>
              <Label htmlFor="preDefinedInput">Pre-defined Input</Label>
              <Textarea
                id="preDefinedInput"
                value={preDefinedText}
                onChange={(e) => setPreDefinedText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe the website or ask for help..."
                className="min-h-[400px] resize-y"
                disabled={loading}
              />
            </div>
          )}
          <div className="flex gap-2">
            {conversation.length > 0 &&
              preDefinedText && (
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe the website or ask for help..."
                  className="max-h-[60px] resize-none text-wrap"
                  disabled={loading}
                />
              )}
            <Button
              onClick={handleSendMessage}
              disabled={
                loading || (input.trim().length === 0 && !preDefinedText)
              }
              size="icon"
              className={`self-end ${
                conversation.length === 0 && preDefinedText ? "w-full" : ""
              }`}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
