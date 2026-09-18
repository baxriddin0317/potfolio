import { useCallback, useEffect, useRef, useState } from 'react';

// framer motion
import { AnimatePresence, motion } from 'framer-motion';

// icons
import {
  HiSparkles,
  HiXMark,
  HiPaperAirplane,
  HiArrowPath,
} from 'react-icons/hi2';
import { FaTelegramPlane } from 'react-icons/fa';
import { TbBrandFiverr, TbBrandUpwork } from 'react-icons/tb';

import { site } from '../data/site';

const STORAGE_KEY = 'portfolio-chat';

const GREETING = {
  role: 'assistant',
  content: `Hi there! 👋 I'm **${site.name}'s AI assistant**.\n\nAsk me anything about building your **AI SaaS MVP**, website or chatbot — or how to start working with ${site.name}.\n\nSalom! O'zbek yoki rus tilida ham bemalol yozing 🙂`,
};

const SUGGESTIONS = [
  'What can you build for my startup?',
  'How long does an AI SaaS MVP take?',
  'Menga sayt kerak, qanday boshlaymiz?',
  'How can I hire you?',
];

const quickLinks = [
  { label: 'Upwork', href: site.links.upwork, icon: <TbBrandUpwork /> },
  { label: 'Fiverr', href: site.links.fiverr, icon: <TbBrandFiverr /> },
  { label: 'Telegram', href: site.links.telegram, icon: <FaTelegramPlane /> },
];

// opens the chat from anywhere: window.dispatchEvent(new CustomEvent('open-chat', { detail: { message } }))
export const openChat = (message) =>
  window.dispatchEvent(new CustomEvent('open-chat', { detail: { message } }));

/* ---------- tiny, safe markdown renderer (bold, code, links, lists) ---------- */

const INLINE_RE =
  /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)\s]+\)|https?:\/\/[^\s<>()]+[^\s<>().,!?;:'"*])/g;

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='underline decoration-accent/60 underline-offset-2 text-accent hover:text-white break-all'
  >
    {children}
  </a>
);

const renderInline = (text) =>
  text.split(INLINE_RE).map((part, i) => {
    if (i % 2 === 0) return part;
    if (part.startsWith('**')) return <strong key={i} className='font-semibold text-white'>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`')) return <code key={i} className='px-1 rounded bg-black/30 text-[0.85em]'>{part.slice(1, -1)}</code>;
    const md = part.match(/^\[([^\]]+)\]\((.+)\)$/);
    if (md) return <ExternalLink key={i} href={md[2]}>{md[1]}</ExternalLink>;
    return <ExternalLink key={i} href={part}>{part}</ExternalLink>;
  });

const Markdown = ({ text }) => {
  const blocks = [];
  let list = null;

  text.split('\n').forEach((raw, i) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)$/);
    if (bullet) {
      if (!list) {
        list = { ordered: /^\s*\d/.test(line), items: [] };
        blocks.push(list);
      }
      list.items.push(bullet[1]);
      return;
    }
    list = null;
    if (!line.trim()) return;
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    blocks.push({ heading: !!heading, text: heading ? heading[1] : line, key: i });
  });

  return (
    <div className='flex flex-col gap-2'>
      {blocks.map((block, i) => {
        if (block.items) {
          const List = block.ordered ? 'ol' : 'ul';
          return (
            <List key={i} className={`${block.ordered ? 'list-decimal' : 'list-disc'} pl-5 flex flex-col gap-1 marker:text-accent`}>
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </List>
          );
        }
        return (
          <div key={i} className={block.heading ? 'font-semibold text-white' : ''}>
            {renderInline(block.text)}
          </div>
        );
      })}
    </div>
  );
};

/* ------------------------------- widget ------------------------------- */

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // restore conversation for this browser tab
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved) && saved.length) setMessages(saved);
    } catch {}
    const timer = setTimeout(() => setShowTeaser(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages, loading]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setShowTeaser(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  const send = useCallback(
    async (text) => {
      const content = text.trim();
      if (!content || loading) return;

      const history = [...messages, { role: 'user', content }];
      setMessages([...history, { role: 'assistant', content: '' }]);
      setInput('');
      setLoading(true);

      const appendToReply = (chunk) =>
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + chunk };
          return next;
        });

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // the greeting is UI-only, don't send it to the model
          body: JSON.stringify({ messages: history.filter((m) => m !== GREETING && m.content !== GREETING.content) }),
        });
        if (!res.ok || !res.body || res.headers.get('content-type')?.includes('application/json')) {
          throw new Error();
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let received = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          received += chunk;
          appendToReply(chunk);
        }
        if (!received.trim()) throw new Error();
      } catch {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: 'assistant',
            content: `Sorry, I can't answer right now 😔\n\nPlease message ${site.name} directly on **Telegram** — he usually replies quickly: ${site.links.telegram}`,
          };
          return next;
        });
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  // allow other components (e.g. hero buttons) to open the chat
  useEffect(() => {
    const handler = (e) => {
      setOpen(true);
      if (e.detail?.message) send(e.detail.message);
    };
    window.addEventListener('open-chat', handler);
    return () => window.removeEventListener('open-chat', handler);
  }, [send]);

  const resetChat = () => {
    if (loading) return;
    setMessages([GREETING]);
  };

  const lastMessage = messages[messages.length - 1];
  const waitingForFirstToken = loading && lastMessage.role === 'assistant' && !lastMessage.content;

  return (
    <div className='fixed z-[60] bottom-24 right-4 xl:bottom-8 xl:right-[calc(2%+5rem)] flex flex-col items-end gap-3 pointer-events-none'>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{ transformOrigin: 'bottom right' }}
            className='pointer-events-auto w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100vh-9rem)] xl:h-[72vh] max-h-[620px] flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-[#15142b]/95 backdrop-blur-xl shadow-[0_20px_60px_-10px_rgba(241,48,36,0.35)]'
            role='dialog'
            aria-label='AI chat assistant'
          >
            {/* header */}
            <div className='relative flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-accent/20 via-[#4a22bd]/20 to-transparent'>
              <div className='relative w-10 h-10 rounded-full bg-gradient-to-br from-accent to-[#4a22bd] flex items-center justify-center text-xl'>
                <HiSparkles />
                <span className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#15142b]' />
              </div>
              <div className='flex-1'>
                <div className='font-semibold leading-tight'>
                  AI Assistant<span className='text-accent'>.</span>
                </div>
                <div className='text-xs text-white/50'>Online · replies instantly</div>
              </div>
              <button
                onClick={resetChat}
                disabled={loading}
                className='text-xl text-white/60 hover:text-accent disabled:opacity-30 transition-all duration-300'
                aria-label='Start a new conversation'
                title='New conversation'
              >
                <HiArrowPath />
              </button>
              <button
                onClick={() => setOpen(false)}
                className='text-2xl text-white/60 hover:text-accent transition-all duration-300'
                aria-label='Close chat'
              >
                <HiXMark />
              </button>
            </div>

            {/* messages */}
            <div
              ref={listRef}
              className='flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 text-sm scrollbar-thin scrollbar-thumb-white/10'
            >
              {messages.map((m, i) =>
                m.role === 'assistant' && !m.content ? null : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`max-w-[88%] px-4 py-2.5 rounded-2xl break-words leading-relaxed ${
                      m.role === 'user'
                        ? 'self-end bg-gradient-to-br from-accent to-[#c0261c] text-white rounded-br-md whitespace-pre-wrap'
                        : 'self-start bg-white/[0.07] border border-white/5 text-white/85 rounded-bl-md'
                    }`}
                  >
                    {m.role === 'user' ? m.content : <Markdown text={m.content} />}
                  </motion.div>
                )
              )}

              {waitingForFirstToken && (
                <div className='self-start flex gap-1 px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.07]' aria-label='Assistant is typing'>
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className='w-2 h-2 rounded-full bg-white/60 animate-bounce'
                      style={{ animationDelay: `${dot * 150}ms` }}
                    />
                  ))}
                </div>
              )}

              {/* suggested questions */}
              {messages.length === 1 && !loading && (
                <div className='flex flex-col items-start gap-2 mt-1'>
                  {SUGGESTIONS.map((question) => (
                    <button
                      key={question}
                      onClick={() => send(question)}
                      className='text-left text-xs px-3 py-2 rounded-full border border-accent/40 text-white/80 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300'
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* quick links */}
            <div className='flex gap-2 px-4 pb-2'>
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-full border border-white/15 text-white/70 hover:border-accent hover:text-accent transition-all duration-300'
                >
                  {link.icon} {link.label}
                </a>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className='flex items-center gap-2 p-3 border-t border-white/10'
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={2000}
                placeholder='Ask me anything…'
                aria-label='Message'
                className='flex-1 h-11 rounded-full bg-white/5 border border-white/15 px-4 text-sm outline-none focus:ring-1 focus:ring-accent focus:border-accent placeholder:text-white/30 transition-all duration-300'
              />
              <button
                type='submit'
                disabled={loading || !input.trim()}
                className='w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#4a22bd] hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 transition-all duration-300'
                aria-label='Send message'
              >
                <HiPaperAirplane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='flex items-center gap-3'>
        {/* teaser bubble */}
        <AnimatePresence>
          {showTeaser && !open && (
            <motion.button
              initial={{ opacity: 0, x: 16, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.9 }}
              onClick={() => setOpen(true)}
              className='pointer-events-auto hidden sm:block relative px-4 py-2 rounded-2xl rounded-br-sm bg-white text-primary text-sm font-medium shadow-xl'
            >
              Have a project idea? Ask my AI ✨
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTeaser(false);
                }}
                className='absolute -top-2 -left-2 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center'
                aria-label='Dismiss'
                role='button'
              >
                <HiXMark />
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* floating launcher */}
        <div className={`pointer-events-auto relative ${open ? '' : 'animate-float'}`}>
          {!open && (
            <>
              <span className='absolute inset-0 rounded-full bg-accent/60 animate-ping-slow' />
              <span className='absolute -inset-2 rounded-full bg-gradient-to-br from-accent/40 to-[#4a22bd]/40 blur-lg animate-pulse' />
            </>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            className='relative w-16 h-16 rounded-full bg-gradient-to-br from-accent via-[#e838cc] to-[#4a22bd] flex items-center justify-center text-3xl text-white shadow-[0_10px_30px_-5px_rgba(241,48,36,0.6)] ring-2 ring-white/20 hover:scale-110 active:scale-95 transition-transform duration-300'
            aria-label={open ? 'Close chat' : 'Open AI chat assistant'}
          >
            <motion.span
              key={open ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className='flex'
            >
              {open ? <HiXMark /> : <HiSparkles />}
            </motion.span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
