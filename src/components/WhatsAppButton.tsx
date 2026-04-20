import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/2348137635064?text=Hi%20Grandstyle%20Events%20%E2%80%94%20I%27d%20like%20to%20enquire%20about%20an%20event.";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Grandstyle Events on WhatsApp"
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-center justify-center w-14 h-14 md:w-[60px] md:h-[60px] rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] hover:shadow-[0_14px_34px_-8px_rgba(37,211,102,0.75)] transition-all duration-280 ease-standard hover:scale-105"
        >
          <svg
            viewBox="0 0 32 32"
            className="w-7 h-7 md:w-8 md:h-8 fill-current"
            aria-hidden="true"
          >
            <path d="M16.001 3.2C8.93.2 3.2 8.93 3.2 16.002a12.8 12.8 0 0 0 1.74 6.444L3.2 28.8l6.52-1.71a12.8 12.8 0 0 0 6.28 1.64h.005c7.07 0 12.8-5.73 12.8-12.8 0-3.42-1.33-6.64-3.75-9.06a12.72 12.72 0 0 0-9.054-3.67Zm.004 23.03h-.004a10.64 10.64 0 0 1-5.422-1.486l-.39-.23-4.028 1.056 1.076-3.928-.254-.404a10.63 10.63 0 0 1-1.63-5.652c0-5.88 4.78-10.66 10.66-10.66 2.848 0 5.524 1.11 7.538 3.124a10.59 10.59 0 0 1 3.12 7.538c0 5.88-4.78 10.66-10.666 10.66Zm5.846-7.985c-.32-.16-1.895-.936-2.188-1.042-.294-.106-.507-.16-.72.16-.213.32-.828 1.042-1.014 1.254-.186.214-.373.24-.693.08-.32-.16-1.352-.498-2.576-1.588-.953-.85-1.596-1.9-1.783-2.22-.186-.32-.02-.492.14-.651.144-.143.32-.374.48-.56.16-.187.213-.32.32-.534.107-.214.053-.4-.027-.56-.08-.16-.72-1.736-.987-2.378-.26-.625-.525-.54-.72-.55-.186-.01-.4-.012-.613-.012a1.17 1.17 0 0 0-.853.4c-.294.32-1.121 1.095-1.121 2.672 0 1.577 1.148 3.1 1.308 3.312.16.214 2.26 3.455 5.476 4.845.765.33 1.362.527 1.828.674.768.244 1.466.21 2.018.128.615-.092 1.895-.775 2.162-1.524.267-.75.267-1.39.187-1.524-.08-.133-.293-.213-.613-.373Z" />
          </svg>
          <span className="absolute right-full mr-3 hidden md:group-hover:block whitespace-nowrap bg-ink text-paper text-[11px] font-medium uppercase tracking-[0.12em] px-3 py-2">
            Chat with us
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppButton;
