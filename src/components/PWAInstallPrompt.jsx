import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles, Share, PlusSquare } from 'lucide-react';

export default function PWAInstallPrompt({ isOpen, onClose, deferredPrompt, onPromptInstall }) {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already running as standalone PWA
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setIsStandalone(!!checkStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);
  }, []);

  if (!isOpen || isStandalone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 text-stone-900 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & App Title */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
              <span className="font-serif font-black text-amber-300 text-2xl">A</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
              Official Progressive Web App
            </span>
            <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
              Install {storeConfig?.storeName || 'Gift Shop'} App
            </h3>
            <p className="text-xs text-stone-500">Fast, offline-ready & instant ordering</p>
          </div>
        </div>

        {/* Perks list */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-2 text-xs text-stone-700">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Instant launch right from your phone or desktop home screen</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Smooth, full-screen app experience with zero browser address bar</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Instant access to new collections and WhatsApp priority ordering</span>
          </div>
        </div>

        {/* Instructions for iOS vs Direct Install for Android/Desktop */}
        {isIOS ? (
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3 text-xs text-amber-950">
            <p className="font-bold">📱 Easy 2-Step iOS Installation:</p>
            <ol className="list-decimal list-inside space-y-1.5 text-stone-700">
              <li>
                Tap the <strong className="inline-flex items-center gap-1 font-semibold text-stone-900"><Share className="w-3.5 h-3.5 text-blue-600" /> Share icon</strong> at the bottom of Safari.
              </li>
              <li>
                Scroll down and select <strong className="inline-flex items-center gap-1 font-semibold text-stone-900"><PlusSquare className="w-3.5 h-3.5 text-stone-800" /> Add to Home Screen</strong>.
              </li>
            </ol>
            <button
              onClick={onClose}
              className="w-full mt-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs"
            >
              Got it!
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            <button
              onClick={() => {
                onPromptInstall();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-lg shadow-stone-900/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Install Web App Now</span>
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 text-stone-400 hover:text-stone-600 text-xs text-center"
            >
              Maybe later
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
