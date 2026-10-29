import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { createWhatsAppLink, generateInquiryMessage } from '../utils/whatsapp';

export default function WhatsAppInquiryWidget({ storeConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const quickPrompts = [
    '🎁 Hi! Can you suggest a gift for a special occasion?',
    '🚚 I would like to ask about gift delivery.',
    '🌸 I am interested in ordering a flower bouquet.',
    '✨ I would like to ask about custom gift branding.'
  ];

  const handleSendPrompt = (promptText) => {
    const waUrl = createWhatsAppLink(
      storeConfig?.whatsappNumber,
      generateInquiryMessage({ subject: 'Customer Inquiry', messageText: promptText, storeConfig })
    );
    window.open(waUrl, '_blank');
  };

  const handleCustomSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const waUrl = createWhatsAppLink(
      storeConfig?.whatsappNumber,
      generateInquiryMessage({ subject: 'Live Boutique Chat', messageText: message, storeConfig })
    );
    window.open(waUrl, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      
      {/* Expanded Popover Window */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[370px] bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-stone-900 rounded-full" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold leading-tight">
                  {storeConfig?.storeName} Concierge
                </h4>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span>Online</span> • <span>Replies in 5-15 mins</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-stone-50 space-y-3 max-h-[360px] overflow-y-auto">
            
            {/* Boutique greeting bubble */}
            <div className="p-3 bg-white rounded-2xl rounded-tl-sm border border-stone-200 text-xs text-stone-800 shadow-sm space-y-1">
              <p className="font-semibold text-stone-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Welcome to {storeConfig?.storeName}!</span>
              </p>
              <p className="text-stone-600">
                How can we help with your gift today? Choose a quick question or write your own:
              </p>
            </div>

            {/* Quick Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Quick Options:
              </span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendPrompt(prompt)}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-xs text-stone-700 hover:text-emerald-900 transition-all font-medium flex items-center justify-between group shadow-2xs"
                >
                  <span className="truncate pr-2">{prompt}</span>
                  <MessageCircle className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 flex-shrink-0" />
                </button>
              ))}
            </div>

          </div>

          {/* Input Footer */}
          <form onSubmit={handleCustomSend} className="p-3 bg-white border-t border-stone-200 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl transition-all transform hover:scale-105 active:scale-95 group border-2 border-white/20"
        aria-label="Open WhatsApp Chat Widget"
      >
        <MessageCircle className="w-5 h-5 fill-current animate-pulse-subtle" />
        <span className="hidden sm:inline font-sans font-semibold tracking-wide">
          {isOpen ? 'Close Concierge' : 'Chat & Order on WhatsApp'}
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping sm:block hidden" />
      </button>

    </div>
  );
}
