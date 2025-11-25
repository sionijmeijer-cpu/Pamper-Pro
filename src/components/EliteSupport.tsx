import { useState } from "react";
import { Send, X, MessageCircle, Ticket, Bot, User, Paperclip, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";


interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export function EliteSupport() {
  const [activeTab, setActiveTab] = useState<"chat" | "ticket">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! 👋 Welcome to Pamper Pro Elite Support. I'm here to help answer your questions about our platform, pricing, features, and more. What can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ticket form state
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    priority: "normal",
    description: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Handle AI chat
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const aiResponses = [
        "Great question! I'd be happy to help with that. Could you provide more details about what you're trying to accomplish?",
        "That's a common question! Here's what I recommend: Start by checking your dashboard settings, then navigate to the features section. If you need further assistance, feel free to raise a support ticket.",
        "I understand your concern. Our Elite Support team is available 24/7 to help. For complex issues, I recommend submitting a ticket so our team can investigate further.",
        "Thank you for asking! You can find more information about this feature in our help center. Would you like me to explain more about it?",
        "That's a great suggestion! We're always improving our platform. For feature requests or detailed support, please submit a support ticket with your ideas.",
        "I'm here to help! Could you clarify what you mean? Are you looking for help with booking management, analytics, or something else?"
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      Array.from(files).forEach(file => {
        setUploadedFiles(prev => [...prev, {
          name: file.name,
          size: file.size,
          type: file.type
        }]);
      });
    }
    e.currentTarget.value = "";
  };

  // Remove uploaded file
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle ticket submission
  const handleSubmitTicket = () => {
    if (!ticketForm.name || !ticketForm.email || !ticketForm.subject || !ticketForm.description) {
      alert("Please fill in all required fields");
      return;
    }

    setTicketSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setTicketForm({
        name: "",
        email: "",
        subject: "",
        category: "general",
        priority: "normal",
        description: "",
      });
      setUploadedFiles([]);
      setTicketSubmitted(false);
    }, 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Elite Support Center</h1>
          <p className="text-gray-600 text-lg">Get help from our AI assistant or connect with our support team</p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chat" | "ticket")} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Chat Support
            </TabsTrigger>
            <TabsTrigger value="ticket" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Raise a Ticket
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card className="h-[600px] flex flex-col shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <div>
                    <CardTitle>AI Support Assistant</CardTitle>
                    <CardDescription className="text-blue-100">Available 24/7 to answer your questions</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-6 overflow-hidden">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      {message.type === "ai" && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-blue-600" />
                        </div>
                      )}

                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-900 rounded-bl-none"
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {message.type === "user" && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="bg-gray-100 px-4 py-3 rounded-lg rounded-bl-none">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about Pamper Pro..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Chat Tips */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">
                  💡 <strong>Tip:</strong> Ask about pricing plans, features, booking management, analytics, or any other questions about Pamper Pro. For complex issues, use the "Raise a Ticket" option to connect with our support team.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ticket Tab */}
          <TabsContent value="ticket" className="space-y-6">
            {ticketSubmitted ? (
              <Card className="border-2 border-green-500 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto">
                      <AlertCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900">Ticket Submitted Successfully!</h3>
                    <p className="text-green-700">Our support team will review your ticket and get back to you within 24 hours.</p>
                    <p className="text-sm text-green-600 font-semibold">Ticket ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <Ticket className="h-5 w-5" />
                    <div>
                      <CardTitle>Submit a Support Ticket</CardTitle>
                      <CardDescription className="text-green-100">Fill out the form below and our team will assist you</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                    />
                  </div>

                  {/* Two columns for category and priority */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <select
                        id="category"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                      >
                        <option value="general">General Question</option>
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing & Payment</option>
                        <option value="booking">Booking Related</option>
                        <option value="profile">Profile & Account</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Priority */}
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority *</Label>
                      <select
                        id="priority"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide detailed information about your issue or question"
                      rows={5}
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-3">
                    <Label htmlFor="files">Attachments (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        id="files"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="files" className="cursor-pointer">
                        <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                      </label>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Uploaded Files:</p>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Paperclip className="h-4 w-4 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFile(index)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSubmitTicket}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                    >
                      Submit Ticket
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ticket Info */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <p className="text-sm text-gray-600">
                  ⏱️ <strong>Response Time:</strong> Our support team typically responds within 24 hours for normal priority tickets.
                </p>
                <p className="text-sm text-gray-600">
                  📧 <strong>You will receive:</strong> An email confirmation with your ticket ID and regular updates on your issue status.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
