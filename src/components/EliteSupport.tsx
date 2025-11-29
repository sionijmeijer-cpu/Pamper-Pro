import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, Users, Mail, Send, X, Loader } from 'lucide-react';

interface EliteSupportProps {
  onNavigate?: (page: string) => void;
}

export function EliteSupport({ onNavigate }: EliteSupportProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'live' | 'email' | null>(null);
  const [aiMessages, setAiMessages] = useState<Array<{ type: 'user' | 'ai'; text: string }>>([]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [liveStatus, setLiveStatus] = useState<'waiting' | 'connected' | null>(null);

  // AI Chat Handler
  const handleAiSubmit = async () => {
    if (!aiInput.trim()) return;

    const userMessage = aiInput;
    setAiInput('');
    setAiMessages([...aiMessages, { type: 'user', text: userMessage }]);
    setAiLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Great question! How can I help you with that?',
        'I understand. Let me provide you with the best solution.',
        'That\'s a common question! Here\'s what you need to know...',
        'I\'m here to help! Could you tell me more about what you need?',
        'Thanks for reaching out! I\'ve found some helpful information for you.',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiMessages(prev => [...prev, { type: 'ai', text: randomResponse }]);
      setAiLoading(false);
    }, 800);
  };

  // Live Chat Handler
  const handleLiveChat = () => {
    setLiveStatus('waiting');
    setTimeout(() => {
      setLiveStatus('connected');
    }, 2000);
  };

  const handleCloseLiveChat = () => {
    setActiveTab(null);
    setLiveStatus(null);
  };

  // Email Handler
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.name || !emailForm.email || !emailForm.subject || !emailForm.message) return;
    
    setEmailSubmitted(true);
    setTimeout(() => {
      setEmailSubmitted(false);
      setEmailForm({ name: '', email: '', subject: '', message: '' });
      setActiveTab(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">How Can We Help?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your preferred way to get support. We're here 24/7 to assist you.
          </p>
        </div>

        {/* Support Options Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* AI Chat Option */}
          <Card 
            onClick={() => setActiveTab(activeTab === 'ai' ? null : 'ai')}
            className={`p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 ${
              activeTab === 'ai' 
                ? 'border-teal-500 bg-teal-50 shadow-lg' 
                : 'border-gray-200 bg-white hover:border-teal-300'
            }`}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 mb-6">
              <MessageCircle className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Assistant</h3>
            <p className="text-gray-600 mb-4">Get instant answers powered by AI. Available 24/7</p>
            <Button 
              className={`w-full transition-all duration-300 ${
                activeTab === 'ai'
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : 'bg-gray-100 hover:bg-teal-500 hover:text-white text-gray-900'
              }`}
            >
              {activeTab === 'ai' ? 'Chat Active' : 'Start Chatting'}
            </Button>
          </Card>

          {/* Live Chat Option */}
          <Card 
            onClick={() => setActiveTab(activeTab === 'live' ? null : 'live')}
            className={`p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 ${
              activeTab === 'live' 
                ? 'border-teal-500 bg-teal-50 shadow-lg' 
                : 'border-gray-200 bg-white hover:border-teal-300'
            }`}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-6">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Live Chat</h3>
            <p className="text-gray-600 mb-4">Speak directly with our support team</p>
            <Button 
              className={`w-full transition-all duration-300 ${
                activeTab === 'live'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-900'
              }`}
            >
              {activeTab === 'live' ? (liveStatus === 'connected' ? 'Connected' : 'Connecting...') : 'Chat Now'}
            </Button>
          </Card>

          {/* Email Option */}
          <Card 
            onClick={() => setActiveTab(activeTab === 'email' ? null : 'email')}
            className={`p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 ${
              activeTab === 'email' 
                ? 'border-teal-500 bg-teal-50 shadow-lg' 
                : 'border-gray-200 bg-white hover:border-teal-300'
            }`}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 mb-6">
              <Mail className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us a detailed message</p>
            <Button 
              className={`w-full transition-all duration-300 ${
                activeTab === 'email'
                  ? 'bg-slate-600 hover:bg-slate-700 text-white'
                  : 'bg-gray-100 hover:bg-slate-500 hover:text-white text-gray-900'
              }`}
            >
              {activeTab === 'email' ? 'Compose Email' : 'Send Email'}
            </Button>
          </Card>
        </div>

        {/* Active Panel */}
        {activeTab && (
          <Card className="p-8 bg-white shadow-2xl border-2 border-teal-200 animate-fade-in">
            {/* AI Chat Panel */}
            {activeTab === 'ai' && (
              <div className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold text-gray-900">AI Assistant Chat</h4>
                  <button
                    onClick={() => setActiveTab(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="bg-gray-50 rounded-lg p-6 h-80 overflow-y-auto mb-6 border border-gray-200">
                  {aiMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <p>Start a conversation...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {aiMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                              msg.type === 'user'
                                ? 'bg-teal-600 text-white rounded-br-none'
                                : 'bg-gray-200 text-gray-900 rounded-bl-none'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {aiLoading && (
                        <div className="flex justify-start">
                          <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                            <Loader size={16} className="animate-spin" />
                            Thinking...
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                  />
                  <button
                    onClick={handleAiSubmit}
                    disabled={!aiInput.trim() || aiLoading}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 transition-all duration-200 flex items-center gap-2"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Live Chat Panel */}
            {activeTab === 'live' && (
              <div className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold text-gray-900">Live Chat Support</h4>
                  <button
                    onClick={handleCloseLiveChat}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {liveStatus === null ? (
                  <div className="text-center py-12">
                    <button
                      onClick={handleLiveChat}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      Connect with Agent
                    </button>
                  </div>
                ) : liveStatus === 'waiting' ? (
                  <div className="text-center py-12">
                    <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={40} />
                    <p className="text-lg font-semibold text-gray-900 mb-2">Connecting you with an agent...</p>
                    <p className="text-gray-600">Typical wait time: less than 2 minutes</p>
                  </div>
                ) : (
                  <div className="h-96 bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <Users size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Support Agent</p>
                        <p className="text-sm text-green-600">● Online</p>
                      </div>
                    </div>
                    <div className="flex-1 mb-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-gray-900">Hello! How can I assist you today?</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Email Panel */}
            {activeTab === 'email' && (
              <div className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold text-gray-900">Send us an Email</h4>
                  <button
                    onClick={() => setActiveTab(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {emailSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Mail className="text-green-600" size={32} />
                    </div>
                    <h5 className="text-2xl font-bold text-gray-900 mb-2">Email Sent!</h5>
                    <p className="text-gray-600">We'll get back to you within 24 hours</p>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                      <input
                        type="text"
                        value={emailForm.name}
                        onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                      <input
                        type="email"
                        value={emailForm.email}
                        onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Subject</label>
                      <input
                        type="text"
                        value={emailForm.subject}
                        onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                        placeholder="What is this about?"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                      <textarea
                        value={emailForm.message}
                        onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                        placeholder="Please describe your issue..."
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      Send Email
                    </button>
                  </form>
                )}
              </div>
            )}
          </Card>
        )}

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What are your support hours?</h3>
              <p className="text-gray-600">We offer 24/7 support through AI chat and email. Live chat is available Monday-Sunday, 8 AM - 10 PM Nigerian Time.</p>
            </div>
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How quickly will I get a response?</h3>
              <p className="text-gray-600">AI responses are instant. Live chat average response time is under 2 minutes. Email support responds within 24 hours.</p>
            </div>
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I track my support ticket?</h3>
              <p className="text-gray-600">Yes! You will receive a ticket number via email that you can use to track your issue status.</p>
            </div>
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do you charge for support?</h3>
              <p className="text-gray-600">Support is completely free for all Pamper Pro members. No hidden charges!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
