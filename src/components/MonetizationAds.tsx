import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, X, Play, Clock, Check, CreditCard, Award } from 'lucide-react';

// --- AD BANNER COMPONENT ---
interface MockAdBannerProps {
  isPremiumUser: boolean;
  onGoPremium: () => void;
}

export const MockAdBanner: React.FC<MockAdBannerProps> = ({ isPremiumUser, onGoPremium }) => {
  const [adIndex, setAdIndex] = useState(0);

  const ads = [
    { title: '📈 Open Free Demat Account', desc: 'Zero commissions on mutual funds & delivery orders. Sign up in 5 mins!', cta: 'Invest Now' },
    { title: '⚡ TradeMaster Pro Subscription', desc: 'Unlock 1-minute scalping strategies, remove ads, and access our AI coach.', cta: 'Upgrade' },
    { title: '🤖 Trade Signals Algorithm', desc: 'Sponsor: High-accuracy technical scanner with direct push notifications.', cta: 'Learn More' }
  ];

  useEffect(() => {
    if (isPremiumUser) return;
    const interval = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % ads.length);
    }, 15000); // rotate ad every 15s
    return () => clearInterval(interval);
  }, [isPremiumUser]);

  if (isPremiumUser) return null;

  const currentAd = ads[adIndex];

  return (
    <div id="admob-banner" className="bg-slate-900 border-t border-slate-800 p-2 flex items-center justify-between gap-3 text-xs">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] bg-amber-950 text-amber-400 border border-amber-800 px-1 rounded font-mono font-bold">ADBYADMOB</span>
          <span className="font-bold text-slate-200 truncate block">{currentAd.title}</span>
        </div>
        <p className="text-[10px] text-slate-400 truncate mt-0.5">{currentAd.desc}</p>
      </div>

      <button
        id="btn-admob-banner-cta"
        onClick={adIndex === 1 ? onGoPremium : undefined}
        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] px-2.5 py-1.5 rounded-lg shrink-0 transition"
      >
        {currentAd.cta}
      </button>
    </div>
  );
};


// --- FULL-SCREEN INTERSTITIAL AD ---
interface MockInterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MockInterstitialAd: React.FC<MockInterstitialAdProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isOpen) return;
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="admob-interstitial" className="fixed inset-0 bg-[#0f172a] z-50 flex flex-col justify-between p-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <span className="text-xs bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-full font-mono">
          Google AdMob Interstitial
        </span>
        
        {countdown > 0 ? (
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" /> Skip Ad in {countdown}s
          </span>
        ) : (
          <button
            id="btn-close-interstitial"
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-full transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Ad Creative Block */}
      <div className="max-w-md mx-auto text-center space-y-4 my-auto">
        <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/25">
          <Shield className="w-10 h-10 text-slate-950" />
        </div>
        
        <div className="space-y-1.5">
          <h2 className="text-xl font-black text-slate-100 tracking-tight">TradeMaster Premium Edition</h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Enjoy 100% ad-free educational flow, early releases on scalping formulas, and download offline PDF checklists.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl text-left max-w-xs mx-auto space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Remove all Banner & Interstitial ads</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Unlock advanced Options strategies</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Personal Trading Journal & Notes backups</span>
          </div>
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-600">
        Clicking close buttons helps sponsors support free stock trading educational modules.
      </div>
    </div>
  );
};


// --- FULL-SCREEN REWARDED AD ---
interface MockRewardedAdProps {
  isOpen: boolean;
  strategyName: string;
  onRewardCompleted: () => void;
  onClose: () => void;
}

export const MockRewardedAd: React.FC<MockRewardedAdProps> = ({
  isOpen,
  strategyName,
  onRewardCompleted,
  onClose
}) => {
  const [countdown, setCountdown] = useState(10);
  const [isVideoFinished, setIsVideoFinished] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setCountdown(10);
    setIsVideoFinished(false);
    
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsVideoFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleClaimReward = () => {
    onRewardCompleted();
  };

  if (!isOpen) return null;

  return (
    <div id="admob-rewarded" className="fixed inset-0 bg-[#070b19] z-50 flex flex-col justify-between p-6 animate-fadeIn text-slate-100">
      <div className="flex justify-between items-center">
        <span className="text-xs bg-amber-950 text-amber-400 border border-amber-900 px-3 py-1 rounded-full font-mono font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Google AdMob Rewarded Video
        </span>
        
        {!isVideoFinished ? (
          <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full flex items-center gap-1">
            Reward unlocks in {countdown}s
          </span>
        ) : (
          <button
            id="btn-close-rewarded"
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-full transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Video Sandbox Simulator */}
      <div className="max-w-md mx-auto w-full my-auto flex flex-col items-center space-y-6">
        <div className="relative w-full aspect-video bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex items-center justify-center group shadow-2xl">
          {/* Simulated Video Playback */}
          {!isVideoFinished ? (
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mx-auto animate-pulse">
                <Play className="w-5 h-5 text-emerald-400 fill-current ml-0.5" />
              </div>
              <p className="text-xs text-slate-400">Simulating Sponsor Video Advertisement...</p>
              <div className="w-48 bg-slate-900 h-1.5 rounded-full overflow-hidden mx-auto">
                <div
                  style={{ width: `${(10 - countdown) * 10}%` }}
                  className="h-full bg-emerald-500 transition-all duration-1000"
                />
              </div>
            </div>
          ) : (
            <div className="text-center space-y-3 p-4 animate-scaleUp">
              <Award className="w-12 h-12 text-yellow-400 mx-auto" />
              <div>
                <h3 className="text-sm font-bold text-slate-100">Video Finished!</h3>
                <p className="text-xs text-slate-400 mt-1">Your reward is ready to be claimed.</p>
              </div>
              <button
                id="btn-claim-reward"
                onClick={handleClaimReward}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-6 py-2 rounded-xl transition shadow-lg shadow-emerald-950/20"
              >
                Unlock {strategyName}
              </button>
            </div>
          )}
        </div>

        <div className="text-center space-y-1.5 max-w-xs">
          <h4 className="text-sm font-bold text-slate-300">Unlocking Strategy:</h4>
          <p className="text-xs text-slate-500">{strategyName}</p>
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-600">
        By watching this brief 10-second sponsor clip, you unlock premium advanced educational blueprints at no financial cost.
      </div>
    </div>
  );
};


// --- PREMIUM UPGRADE MODAL ---
interface PremiumSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribeSuccess: () => void;
}

export const PremiumSubscriptionModal: React.FC<PremiumSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubscribeSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleClaimPremium = () => {
    onSubscribeSuccess();
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl text-slate-100 relative overflow-hidden">
        
        {/* Top Close Button */}
        {!success && (
          <button
            id="btn-close-premium-modal"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {success ? (
          <div className="text-center py-6 space-y-4 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            
            <div>
              <h3 className="text-lg font-black text-slate-100">Upgrade Successful!</h3>
              <p className="text-xs text-slate-400 mt-1.5">You are now a premium member of TradeMaster.</p>
            </div>

            <button
              id="btn-claim-premium-success"
              onClick={handleClaimPremium}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-2.5 w-full rounded-xl transition shadow-lg shadow-emerald-950/20"
            >
              Get Started (Ad-free)
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-100">TradeMaster Premium</h3>
                <p className="text-[10px] text-slate-500">The Ultimate Learning Environment</p>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-850 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-black">ONE TIME LIFETIME LICENSE</span>
              <div className="text-2xl font-black text-slate-100 mt-1">₹399 <span className="text-xs text-slate-500 font-normal">($4.99 USD)</span></div>
            </div>

            <div className="space-y-2 pb-2">
              {[
                'Remove 100% of banner & interstitial ads',
                'Instantly unlock all 20+ strategy classes',
                'Activate full personal journal & study backups',
                'Offline study material local storage optimization'
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button
              id="btn-checkout-premium"
              onClick={handleCheckout}
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-slate-950 font-black text-xs py-3 w-full rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/20"
            >
              {isLoading ? (
                <span>Securing payment gateway...</span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Unlock Ad-Free Premium
                </>
              )}
            </button>

            <p className="text-[9px] text-slate-500 text-center leading-relaxed">
              Secure simulation. Your credit cards will not be charged. Clicking completes a simulation of successful Google Play Purchase flows.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
