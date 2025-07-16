'use client'

import { useState, FormEvent } from "react"
import { Send, Bot, Paperclip, Mic, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import { GoogleGenerativeAI } from "@google/generative-ai"

export function Assistant({ onInsert }: { onInsert: (content: string) => void }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "ai",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Replace with your Gemini API key
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ])
    setInput("")
    setIsLoading(true)

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
      const result = await model.generateContent(input)
      const response = result.response.text()
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: response,
          sender: "ai",
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "Sorry, I couldn't get a response from Gemini.",
          sender: "ai",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAttachFile = () => {
    console.log("Attach file clicked")
  }

  const handleMicrophoneClick = () => {
    console.log("Microphone clicked")
  }

  return (
    <div className="h-[600px] relative">
      <ExpandableChat
        size="lg"
        position="bottom-right"
        icon={<Bot className="h-6 w-6" />}
      >


        <ExpandableChatBody>
          <ChatMessageList>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                variant={message.sender === "user" ? "sent" : "received"}
              >
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  src={
                    message.sender === "user"
                      ? "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                      : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                  }
                  fallback={message.sender === "user" ? "US" : "AI"}
                />
                <ChatBubbleMessage
                  variant={message.sender === "user" ? "sent" : "received"}
                >
                  {message.content}
                  {message.sender === "ai" && (
                    <Button
                      size="sm"
                      className="ml-2 mt-2"
                      onClick={() => onInsert(message.content)}
                    >
                      Insert into editor
                    </Button>
                  )}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}
            {isLoading && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                  fallback="AI"
                />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            )}
          </ChatMessageList>
        </ExpandableChatBody>

        <ExpandableChatFooter>
          <form
            onSubmit={handleSubmit}
            className="relative rounded-lg bg-background "
          >
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
              placeholder="Type your message..."
              className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
            />

          </form>
        </ExpandableChatFooter>

      </ExpandableChat>
    </div>
  )
}
