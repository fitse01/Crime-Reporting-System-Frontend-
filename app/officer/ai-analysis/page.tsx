// app/officer/ai-analysis/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAnalysisPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI analyst. Ask me about reports, trends, contact messages, or any internal data analysis.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("officerToken") : null;

  const sendMessage = async () => {
    if (!input.trim() || loading || !token) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/ai/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      const assistantMessage = {
        role: "assistant" as const,
        content: data.response || "No response",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error: Could not connect to AI service.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Bot className="h-10 w-10 text-blue-600" />
          AI Analysis Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Advanced AI insights for reports, trends, and internal data
        </p>
      </div>

      <Card className="h-[70vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>AI Chat</CardTitle>
            <Badge variant="outline">
              Role:{" "}
              {JSON.parse(localStorage.getItem("officerUser") || "{}").role ||
                "Unknown"}
            </Badge>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-4",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-2xl px-6 py-4 rounded-lg shadow",
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  )}
                >
                  <p className="whitespace-pre-wrap text-lg">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <div className="bg-white border px-6 py-4 rounded-lg shadow">
                  <p>Analyzing data...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-4"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about reports, trends, contact messages..."
              disabled={loading}
              className="text-lg"
            />
            <Button type="submit" size="lg" disabled={loading || !input.trim()}>
              <Send className="h-6 w-6" />
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-3">
            Examples: "Summarize theft reports this month", "Most common contact
            subjects", "Crime trends by location"
          </p>
        </div>
      </Card>
    </div>
  );
}
