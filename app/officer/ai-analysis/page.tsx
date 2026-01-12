// // app/officer/ai-analysis/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getUser } from "@/lib/auth";
// import { ShieldAlert } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { Bot, Send } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// export default function AIAnalysisPage() {
//   const router = useRouter();
//   const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "assistant",
//       content:
//         "Hello! I'm your AI analyst. Ask me about reports, trends, contact messages, or any internal data analysis.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("officerToken") : null;

//   const sendMessage = async () => {
//     if (!input.trim() || loading || !token) return;

//     const userMessage = { role: "user" as const, content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:4000/api/ai/query", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ query: input }),
//       });

//       const data = await res.json();
//       const assistantMessage = {
//         role: "assistant" as const,
//         content: data.response || "No response",
//       };
//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Error: Could not connect to AI service.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const user = getUser();
//     // ONLY ALLOW SUPER_ADMIN
//     if (user?.role !== "SUPER_ADMIN") {
//       setIsAuthorized(false);
//     } else {
//       setIsAuthorized(true);
//     }
//   }, []);

//   if (isAuthorized === false) {
//     return (
//       <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
//         <ShieldAlert className="h-20 w-20 text-red-500" />
//         <h1 className="text-2xl font-bold">Access Denied</h1>
//         <p className="text-muted-foreground">
//           This AI Analysis tool is restricted to Super Admins only.
//         </p>
//         <Button onClick={() => router.push("/officer/dashboard")}>
//           Return to Dashboard
//         </Button>
//       </div>
//     );
//   }

//   if (isAuthorized === null) return <div>Loading permissions...</div>;

//   return (
//     <div className="container mx-auto p-8">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold flex items-center gap-3">
//           <Bot className="h-10 w-10 text-blue-600" />
//           AI Analysis Dashboard
//         </h1>
//         <p className="text-muted-foreground mt-2">
//           Advanced AI insights for reports, trends, and internal data
//         </p>
//       </div>

//       <Card className="h-[70vh] flex flex-col">
//         <CardHeader className="border-b">
//           <div className="flex items-center justify-between">
//             <CardTitle>AI Chat</CardTitle>
//             <Badge variant="outline">
//               Role:{" "}
//               {JSON.parse(localStorage.getItem("officerUser") || "{}").role ||
//                 "Unknown"}
//             </Badge>
//           </div>
//         </CardHeader>

//         <ScrollArea className="flex-1 p-6">
//           <div className="space-y-4">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={cn(
//                   "flex gap-4",
//                   msg.role === "user" ? "justify-end" : "justify-start"
//                 )}
//               >
//                 {msg.role === "assistant" && (
//                   <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//                     AI
//                   </div>
//                 )}
//                 <div
//                   className={cn(
//                     "max-w-2xl px-6 py-4 rounded-lg shadow",
//                     msg.role === "user"
//                       ? "bg-blue-600 text-white"
//                       : "bg-white border"
//                   )}
//                 >
//                   <p className="whitespace-pre-wrap text-lg">{msg.content}</p>
//                 </div>
//               </div>
//             ))}
//             {loading && (
//               <div className="flex gap-4">
//                 <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//                   AI
//                 </div>
//                 <div className="bg-white border px-6 py-4 rounded-lg shadow">
//                   <p>Analyzing data...</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </ScrollArea>

//         <div className="p-6 border-t">
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               sendMessage();
//             }}
//             className="flex gap-4"
//           >
//             <Input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask about reports, trends, contact messages..."
//               disabled={loading}
//               className="text-lg"
//             />
//             <Button type="submit" size="lg" disabled={loading || !input.trim()}>
//               <Send className="h-6 w-6" />
//             </Button>
//           </form>
//           <p className="text-sm text-muted-foreground mt-3">
//             Examples: "Summarize theft reports this month", "Most common contact
//             subjects", "Crime trends by location"
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BrainCircuit,
  Send,
  ShieldAlert,
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function AdminAIAnalysis() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Admin Intelligence System Online. I can analyze crime reports, contact trends, and case statuses. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Function to sync private data to Pinecone
  const syncData = async () => {
    setIsSyncing(true);
    try {
      const token = localStorage.getItem("token"); // OR use your auth state
      await fetch("http://localhost:4000/api/ai/index-private", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Private Data Synced Successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userQuery = input;
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    setInput("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/ai/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: userQuery }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response || data.error || "Analysis failed.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection Error." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-blue-600" />
            AI Intelligence Analysis
          </h1>
          <p className="text-muted-foreground">
            Internal Police Data RAG Analysis System
          </p>
        </div>
        <Button
          variant="outline"
          onClick={syncData}
          disabled={isSyncing}
          className="rounded-full border-blue-200 hover:bg-blue-50"
        >
          {isSyncing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Sync Private Database
        </Button>
      </div>

      <Card className="h-[70vh] flex flex-col shadow-2xl border-none rounded-[2rem] overflow-hidden">
        <ScrollArea className="flex-1 p-8 bg-slate-50/50">
          <div className="space-y-6">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-5 rounded-[1.5rem] shadow-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm font-medium leading-relaxed">
                    {m.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-5 rounded-[1.5rem] rounded-tl-none shadow-sm">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 bg-white border-t border-slate-100">
          <div className="flex gap-4">
            <Input
              placeholder="Ask for trends (e.g., 'Analyze the status of recent car theft reports')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="h-14 rounded-2xl border-slate-200 px-6"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading}
              className="h-14 w-14 rounded-2xl bg-slate-900"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
