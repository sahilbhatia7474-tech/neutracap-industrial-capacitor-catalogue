import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Check } from 'lucide-react';

const PWA_DISMISSED_KEY = 'neutracap_pwa_dismissed_v1';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function PWAInstallBanner() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState<boolean>(true);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [showManualModal, setShowManualModal] = useState<boolean>(false);

  useEffect(() => {
    // Check if already installed in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    // Check if previously dismissed in this session/storage
    const dismissed = localStorage.getItem(PWA_DISMISSED_KEY);
    if (!dismissed) {
      setIsDismissed(false);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      // If not previously dismissed, reveal subtle prompt banner
      const isDismissedStored = localStorage.getItem(PWA_DISMISSED_KEY);
      if (!isDismissedStored) {
        setIsDismissed(false);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setIsDismissed(true);
    };

    const handleManualTrigger = () => {
      handleInstallClick();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('neutracap:open-pwa-install', handleManualTrigger);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('neutracap:open-pwa-install', handleManualTrigger);
    };
  }, [installPrompt]);

  const handleInstallClick = async () => {
    if (installPrompt) {
      // Trigger the native browser install prompt
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setInstallPrompt(null);
      setIsDismissed(true);
    } else {
      // Browser does not support or expose install prompt (e.g. iOS Safari or desktop Chrome without prompt)
      setShowManualModal(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem(PWA_DISMISSED_KEY, 'true');
    } catch {
      // ignore
    }
  };

  // Don't render if already installed or dismissed and no prompt active
  if (isInstalled || (isDismissed && !showManualModal)) {
    return null;
  }

  return (
    <>
      {/* Subtle Floating Bottom-Left / Top Industrial Install Affordance */}
      {!isDismissed && installPrompt && (
        <aside
          aria-label="App installation banner"
          className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 max-w-sm w-[calc(100vw-1.5rem)] sm:w-auto p-3 sm:p-3.5 rounded-xl bg-[#071426]/95 backdrop-blur-md border border-[#173A5E] hover:border-[#35C6E8]/60 shadow-2xl transition-all animate-fade-in text-white"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#35C6E8]/15 border border-[#35C6E8]/30 flex items-center justify-center shrink-0 text-[#35C6E8]">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide truncate">
                  Install NeutraCap App
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono truncate">
                  Fast offline catalogue &amp; specs
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleInstallClick}
                className="px-2.5 py-1.5 rounded-lg bg-[#35C6E8] hover:bg-[#35C6E8]/90 text-[#071426] text-[10px] sm:text-xs font-bold font-mono transition-all flex items-center gap-1 shadow-md active:scale-95 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                Install
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss installation prompt"
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Manual Instructions Contextual Modal / Toast when triggered manually on iOS / unsupported */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md p-5 rounded-2xl bg-[#071426] border border-[#173A5E] shadow-2xl text-white">
            <div className="flex items-center justify-between mb-3 border-b border-[#173A5E] pb-2.5">
              <div className="flex items-center gap-2 text-[#35C6E8]">
                <Smartphone className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide text-white">Install NeutraCap</span>
              </div>
              <button
                type="button"
                onClick={() => setShowManualModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed font-sans">
              To install NeutraCap, use your browser menu and choose <strong className="text-white">Add to Home Screen</strong>.
            </p>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1.5 font-mono mb-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant home screen launch</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>490 baseline capacitor specifications</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero app-store download required</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowManualModal(false)}
              className="w-full py-2 rounded-lg bg-[#173A5E] hover:bg-[#35C6E8] hover:text-[#071426] text-white font-bold text-xs font-mono transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
