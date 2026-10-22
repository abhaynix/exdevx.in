import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, ArrowUpRight, RotateCcw } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { Dialog } from '../../../components/ui/dialog';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  'What services do you offer?',
  'How long does a project take?',
  'Where do you work?',
  'I want to start a project.',
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm the ExDevX assistant. What are you looking to build?",
  timestamp: 'Just now',
};

/**
 * Lightweight helper to format basic markdown (bold text, lists, linebreaks)
 * without pulling in heavy markdown parser dependencies.
 */
function FormattedMessage({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1" />;
        }

        // Bullet point line
        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ');
        const cleanContent = isBullet ? trimmed.replace(/^[-•*]\s+/, '') : trimmed;

        // Simple bold parser (**text**)
        const parts = cleanContent.split(/(\*\*[^*]+\*\*)/g);

        const renderedLine = (
          <span>
            {parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={pIdx} className="font-semibold text-[var(--dark)]">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return <span key={pIdx}>{part}</span>;
            })}
          </span>
        );

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-1.5 pl-1">
              <span className="text-[var(--text-secondary)] font-bold shrink-0 mt-0.5">•</span>
              <span>{renderedLine}</span>
            </div>
          );
        }

        return <p key={lineIdx}>{renderedLine}</p>;
      })}
    </div>
  );
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (wasOpen.current) {
      triggerRef.current?.focus();
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
    }
  }, [messages, isLoading]);

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const sendMessage = async (textToSend: string) => {
    const message = textToSend.trim();
    if (!message || isLoading) return;

    setInputValue('');
    setHasError(false);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Map history for server endpoint
      const historyPayload = newMessages.slice(1, -1).slice(-20).map((m) => ({
        role: m.role,
        content: m.content.slice(0, 2000),
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          messages: historyPayload,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Error ${res.status}`);
      }

      const replyContent =
        data.text ||
        "I'm here to help! Feel free to describe your project or connect with our team at hallo@exdevx.in.";

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      console.error('Chat request failed');
      setHasError(true);
      const errorMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          `I encountered an issue connecting right now. You can reach Abhay Jadhav directly via email at hallo@exdevx.in or on WhatsApp at ${siteConfig.contact.whatsapp}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setHasError(false);
    setInputValue('');
  };

  return (
    <div className="print:hidden font-sans">
      {/* ── Floating Chat Button ── */}
      {!isOpen && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-none rounded-tr-lg rounded-bl-lg border border-[var(--border)] bg-[var(--primary)] px-3 py-3 text-[var(--bg)] transition-colors duration-200 hover:bg-[var(--surface-hover)] sm:px-5 sm:py-3.5"
          aria-label="Open ExDevX AI assistant"
          aria-expanded={isOpen}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[var(--bg)]" />
            <span className="chat-status-indicator absolute -top-1 -right-1 size-2.5 rounded-full border border-[var(--primary)] bg-[var(--accent)]" />
          </div>
          <span className="hidden text-xs font-sans font-semibold tracking-wide sm:inline sm:text-sm">
            AI'x
          </span>
        </button>
      )}

      {/* ── Responsive Chat Panel ── */}
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="ExDevX Assistant"
          description="Chat with the ExDevX AI engineering consultant."
          className="fixed bottom-4 right-4 z-50 flex h-[560px] max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-none flex-col overflow-hidden rounded-sm border border-[var(--text)]/15 bg-[var(--surface)] p-0 shadow-none sm:bottom-6 sm:right-6 sm:w-[420px] [&>h2:first-child]:sr-only"
        >
          <div ref={panelRef} className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[var(--surface-hover)] text-[var(--text)] px-5 py-3.5 flex items-center justify-between border-b border-[var(--text)]/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[var(--border)] text-[var(--text)] flex items-center justify-center font-bold font-display text-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-semibold text-sm text-[var(--text)]">
                    ExDevX Assistant
                  </h3>
                  <span className="size-1.5 rounded-full border border-[var(--success)] inline-block" />
                </div>
                <p className="text-[10px] font-mono text-[var(--text)]/70 tracking-wider">
                  AI Engineering Consultant · Gemini Powered
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Restart conversation"
                className="p-1.5 text-[var(--text)]/70 hover:text-[var(--text)] rounded-xs focus-ring-dark transition-colors"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[var(--text)]/70 hover:text-[var(--text)] rounded-xs focus-ring-dark transition-colors"
                aria-label="Close chat panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="border-b border-[var(--text)]/10 px-4 py-2 text-[10px] leading-relaxed text-[var(--text)]/70">
            When AI chat is available, messages are sent to Google Gemini to generate replies. Please do not include sensitive information. <a href="/privacy-policy" className="text-[var(--primary)] underline focus-ring">Privacy policy</a>.
          </p>

          {/* Conversation Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--bg)]/40">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar mark */}
                  <div
                    className={`w-6 h-6 rounded-xs flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                      isUser
                        ? 'bg-[var(--surface-hover)] text-[var(--text)] border border-[var(--border)]'
                        : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--text)]/10 font-bold'
                    }`}
                    aria-hidden="true"
                  >
                    {isUser ? <User className="w-3 h-3" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] rounded-xs p-3.5 text-xs sm:text-sm ${
                      isUser
                        ? 'bg-[var(--surface-hover)] text-[var(--text)] border border-[var(--text)]/10'
                          : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--text)]/10'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <FormattedMessage text={msg.content} />
                    )}

                    <div
                      className={`text-[9px] font-mono mt-1.5 ${
                        isUser ? 'text-[var(--bg)]/70 text-right' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Suggested Prompts (Shown on first load) */}
            {messages.length === 1 && (
              <div className="pt-2 pb-1 space-y-2">
                <div className="text-[10px] font-mono tracking-wider text-[var(--text)]/50 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[var(--text-secondary)]" />
                  <span>Suggested inquiries</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handlePromptClick(prompt)}
                      className="text-left px-3 py-2 text-xs font-sans text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--text)]/10 hover:border-[var(--border)] rounded-xs transition-[border-color,background-color] focus-ring cursor-pointer flex items-center justify-between group"
                    >
                      <span>{prompt}</span>
                      <ArrowUpRight className="w-3 h-3 text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[var(--text)]/70 pl-8 font-mono">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--primary)]" />
                <span>ExDevX assistant is typing…</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Footer strip */}
          <div className="px-4 py-1.5 bg-[var(--surface)] border-t border-[var(--text)]/10 flex items-center justify-between text-[10px] font-mono text-[var(--text)]/60">
            <span>Direct WhatsApp:</span>
            <a
              href={siteConfig.contact.whatsappFormatted}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] hover:underline font-bold inline-flex items-center gap-0.5 focus-ring"
            >
              {siteConfig.contact.whatsapp}
              <ArrowUpRight className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[var(--surface)] border-t border-[var(--text)]/10">
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                maxLength={2000}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about services, timelines, pricing…"
                disabled={isLoading}
                aria-label="Message ExDevX Assistant"
                className="flex-1 bg-[var(--bg)] border border-[var(--control-border)] px-3 py-2 text-xs sm:text-sm text-[var(--text)] rounded-xs focus-ring placeholder:text-[var(--text-secondary)] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="rounded-none rounded-tr-md rounded-bl-md border border-[var(--border)] bg-[var(--primary)] p-2 font-semibold text-[var(--bg)] transition-colors hover:bg-[var(--surface-hover)] disabled:pointer-events-none disabled:opacity-40 focus-ring flex shrink-0 items-center justify-center sm:px-3 sm:py-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ChatWidget;
