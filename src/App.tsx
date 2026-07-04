import React, { useState, useEffect, useMemo } from 'react';
import {
  Home, BookOpen, TrendingUp, Search, Award, HelpCircle, Activity, Calendar,
  Settings, ShieldAlert, Newspaper, ChevronRight, Info, Bookmark, Globe, Moon,
  Sun, Bell, Wifi, WifiOff, RotateCcw, FileText, Check, ExternalLink, Lock, Sparkles, X, Menu
} from 'lucide-react';

import { Strategy, JournalEntry, StrategyNote, WatchlistTicker } from './types';
import { DEFAULT_STRATEGIES } from './data/strategies';
import { GLOSSARY_TERMS } from './data/glossary';

import { InteractiveChart } from './components/InteractiveChart';
import { WatchlistSimulator } from './components/WatchlistSimulator';
import { JournalSection } from './components/JournalSection';
import { QuizSection } from './components/QuizSection';
import { NotesSection } from './components/NotesSection';
import { AdminPanel } from './components/AdminPanel';
import { EconomicCalendar } from './components/EconomicCalendar';
import { NewsFeed } from './components/NewsFeed';
import {
  MockAdBanner,
  MockInterstitialAd,
  MockRewardedAd,
  PremiumSubscriptionModal
} from './components/MonetizationAds';

const desktopCategories = [
  { label: 'Intraday', emoji: '⚡', category: 'Intraday Trading' },
  { label: 'Swing', emoji: '📈', category: 'Swing Trading' },
  { label: 'F&O Spreads', emoji: '📊', category: 'F&O Strategies' },
  { label: 'Options Buy', emoji: '💎', category: 'Options Buying' },
  { label: 'Options Sell', emoji: '🔥', category: 'Options Selling' },
  { label: 'Scalping', emoji: '🚀', category: 'Scalping' },
  { label: 'Price Action', emoji: '📋', category: 'Price Action' },
  { label: 'Patterns', emoji: '🕯️', category: 'Candlestick Patterns' }
];

export default function App() {
  // --- LAYOUT VIEWS & SIMULATOR OPTIONS ---
  const [usePhoneFrame, setUsePhoneFrame] = useState<boolean>(true);
  const [activeScreen, setActiveScreen] = useState<string>('home'); // home, strategies, journal, watchlist, quiz, notes, glossary, calendar, news, admin, settings, strategy-detail
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);

  // --- LOCAL PERSISTENCE STATE ENGINE ---
  const [strategies, setStrategies] = useState<Strategy[]>(() => {
    const cached = localStorage.getItem('trademaster_custom_strategies');
    const parsedCustom = cached ? JSON.parse(cached) : [];
    return [...DEFAULT_STRATEGIES, ...parsedCustom];
  });

  const [journal, setJournal] = useState<JournalEntry[]>(() => {
    const cached = localStorage.getItem('trademaster_journal');
    return cached ? JSON.parse(cached) : [];
  });

  const [notes, setNotes] = useState<StrategyNote[]>(() => {
    const cached = localStorage.getItem('trademaster_notes');
    return cached ? JSON.parse(cached) : [];
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const cached = localStorage.getItem('trademaster_bookmarks');
    return cached ? JSON.parse(cached) : [];
  });

  const [isPremiumUser, setIsPremiumUser] = useState<boolean>(() => {
    const cached = localStorage.getItem('trademaster_premium');
    return cached === 'true';
  });

  // --- PHONE CONFIGS & PREFERENCES ---
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const cached = localStorage.getItem('trademaster_theme');
    return (cached as 'dark' | 'light') || 'dark';
  });

  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('trademaster_lang') || 'English';
  });

  const [isPushEnabled, setIsPushEnabled] = useState<boolean>(true);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  // --- REAL-TIME NOTIFICATION BROADCASTS ---
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; message: string; time: string }>>([
    { id: 'n1', title: '🚀 Welcome to TradeMaster!', message: 'Explore 20 free strategies to learn intraday, options, and risk protection secrets.', time: 'Just now' }
  ]);
  const [showNotificationsModal, setShowNotificationsModal] = useState<boolean>(false);
  const [latestNotificationToast, setLatestNotificationToast] = useState<{ title: string; message: string } | null>(null);

  // --- SEARCH INDEXES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

  // --- ADMOB POPUPS CONTROLLERS ---
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [showRewarded, setShowRewarded] = useState(false);
  const [rewardStrategyTarget, setRewardStrategyTarget] = useState<Strategy | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // --- TIME DISPLAY FOR PHONE STATUS BAR ---
  const [currentTime, setCurrentTime] = useState('');

  // Synchronize Live Clock for top status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Sync state mutations back to localStorage
  useEffect(() => {
    localStorage.setItem('trademaster_journal', JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    localStorage.setItem('trademaster_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('trademaster_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('trademaster_premium', String(isPremiumUser));
  }, [isPremiumUser]);

  useEffect(() => {
    localStorage.setItem('trademaster_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('trademaster_lang', language);
  }, [language]);

  // --- TRADING TIPS & PSYCHOLOGY QUOTES ---
  const quotes = useMemo(() => [
    { quote: "Rule No. 1: Never lose money. Rule No. 2: Never forget Rule No. 1.", author: "Warren Buffett" },
    { quote: "Amateurs think about how much money they can make. Professionals think about how much money they can lose.", author: "Jack Schwager" },
    { quote: "The key to trading success is emotional discipline. If intelligence were the key, there would be a lot more people making money.", author: "Victor Sperandeo" },
    { quote: "It’s not whether you’re right or wrong that’s important, but how much money you make when you’re right and how much you lose when you’re wrong.", author: "George Soros" }
  ], []);

  const learningTips = useMemo(() => [
    "Volume expansion combined with a breakout confirms structural buyers are committing capital.",
    "Exponential Moving Averages place higher weight on recent prices, providing faster signals than Simple Moving Averages.",
    "Option buying during extremely high implied volatility (IV) exposes you to rapid volatility crush (IV crush) when the event finishes.",
    "Support zones are areas where demand is concentrated, but once broken, they frequently turn into resistance ceilings."
  ], []);

  const [currentTipIdx] = useState(() => Math.floor(Math.random() * learningTips.length));
  const [currentQuoteIdx] = useState(() => Math.floor(Math.random() * quotes.length));

  // --- CATEGORY GROUPS ---
  const categoriesList = [
    'Intraday Trading', 'Swing Trading', 'F&O Strategies', 'Options Buying', 'Options Selling',
    'Scalping', 'Price Action', 'Candlestick Patterns', 'Chart Patterns', 'Support & Resistance',
    'Breakout Strategies', 'Trend Following', 'Moving Average Strategies', 'RSI Strategies',
    'MACD Strategies', 'VWAP Strategies', 'Bollinger Bands', 'Volume Analysis', 'Risk Management',
    'Trading Psychology'
  ];

  // --- STRATEGY MUTATION EMITTERS ---
  const handleAddStrategy = (newStrat: Omit<Strategy, 'id' | 'isCustom'>) => {
    const constructed: Strategy = {
      ...newStrat,
      id: `custom-${Date.now()}`,
      isCustom: true
    };
    const updated = [...strategies, constructed];
    setStrategies(updated);

    const customOnly = updated.filter(s => s.isCustom);
    localStorage.setItem('trademaster_custom_strategies', JSON.stringify(customOnly));
  };

  const handleDeleteStrategy = (id: string) => {
    const updated = strategies.filter(s => s.id !== id);
    setStrategies(updated);

    const customOnly = updated.filter(s => s.isCustom);
    localStorage.setItem('trademaster_custom_strategies', JSON.stringify(customOnly));

    if (selectedStrategy?.id === id) {
      setSelectedStrategy(null);
      setActiveScreen('strategies');
    }
  };

  // --- JOURNAL MUTATION EMITTERS ---
  const handleAddJournalEntry = (newEntry: Omit<JournalEntry, 'id' | 'status' | 'pnl'>) => {
    let pnl = 0;
    if (newEntry.type === 'BUY') {
      pnl = (newEntry.exitPrice - newEntry.entryPrice) * newEntry.quantity;
    } else {
      pnl = (newEntry.entryPrice - newEntry.exitPrice) * newEntry.quantity;
    }

    let status: 'WIN' | 'LOSS' | 'BREAKEVEN' = 'BREAKEVEN';
    if (pnl > 0.01) status = 'WIN';
    else if (pnl < -0.01) status = 'LOSS';

    const entry: JournalEntry = {
      ...newEntry,
      id: `trade-${Date.now()}`,
      pnl: Number(pnl.toFixed(2)),
      status,
    };

    setJournal([entry, ...journal]);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournal(journal.filter((j) => j.id !== id));
  };

  const handleClearJournal = () => {
    setJournal([]);
  };

  // --- NOTE MUTATION EMITTERS ---
  const handleAddNote = (newNote: Omit<StrategyNote, 'id' | 'updatedAt'>) => {
    const note: StrategyNote = {
      ...newNote,
      id: `note-${Date.now()}`,
      updatedAt: new Date().toLocaleDateString()
    };
    setNotes([note, ...notes]);
  };

  const handleEditNote = (id: string, updates: Partial<StrategyNote>) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, ...updates, updatedAt: new Date().toLocaleDateString() } : n)));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  // --- BOOKMARKS EMITTERS ---
  const handleToggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((b) => b !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  // --- PUSH ALERT BROADCAST SIMULATOR ---
  const handleBroadcastPush = (title: string, message: string) => {
    const alertItem = {
      id: `alert-${Date.now()}`,
      title,
      message,
      time: 'Just now'
    };
    setNotifications([alertItem, ...notifications]);
    
    if (isPushEnabled) {
      setLatestNotificationToast({ title, message });
      setTimeout(() => {
        setLatestNotificationToast(null);
      }, 5000);
    }
  };

  // --- STRATEGY CLICK / AD FILTER GATE ---
  const handleSelectStrategyClick = (strat: Strategy) => {
    // Check if strategy is premium and user is not premium
    if (strat.isPremium && !isPremiumUser) {
      setRewardStrategyTarget(strat);
      setShowRewarded(true);
      return;
    }

    // Standard non-premium transition. Trigger random 10% chance Interstitial ad to simulate real monetization
    if (!isPremiumUser && Math.random() < 0.2) {
      setShowInterstitial(true);
    }

    setSelectedStrategy(strat);
    setActiveScreen('strategy-detail');
  };

  // --- REWARD AD COMPLETION ---
  const handleRewardAdCompleted = () => {
    setShowRewarded(false);
    if (rewardStrategyTarget) {
      setSelectedStrategy(rewardStrategyTarget);
      setActiveScreen('strategy-detail');
      setRewardStrategyTarget(null);
    }
  };

  // --- PAPER TRADE FROM WATCHLIST TRIGGER ---
  const handlePaperTradeFromWatchlist = (symbol: string, price: number, type: 'BUY' | 'SELL') => {
    // Auto-calculate exit at slightly different prices for easy mock journaling
    const tickDiff = price * 0.05; // 5% profit target mock
    const targetExit = type === 'BUY' ? price + tickDiff : price - tickDiff;

    handleAddJournalEntry({
      date: new Date().toISOString().split('T')[0],
      ticker: symbol,
      type,
      strategyId: 'watchlist-sim',
      strategyName: 'Watchlist Practice Trade',
      entryPrice: price,
      exitPrice: Number(targetExit.toFixed(2)),
      quantity: 10,
      notes: 'Executed paper order instantly from Real-Time Watchlist Panel.'
    });

    // Notify user
    handleBroadcastPush('📝 Trade Logged to Journal!', `${type} position for 10 units of ${symbol} filled at ₹${price}.`);
  };

  // --- SEARCH & CATEGORY CLASSIFIERS ---
  const filteredStrategies = useMemo(() => {
    return strategies.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategoryFilter === 'ALL' || s.category === selectedCategoryFilter;
      return matchSearch && matchCategory;
    });
  }, [strategies, searchQuery, selectedCategoryFilter]);

  // Notes linked to active strategy detail
  const activeStrategyNotes = useMemo(() => {
    if (!selectedStrategy) return [];
    return notes.filter((n) => n.strategyId === selectedStrategy.id);
  }, [notes, selectedStrategy]);

  return (
    <div className={`min-h-screen bg-slate-950 flex flex-col items-center justify-start py-6 px-4 ${theme === 'light' ? 'bg-[#f8fafc]' : 'bg-[#0b0f19]'}`}>
      
      {/* Top Controller Bar - Toggle frame and screen size */}
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-3.5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-xl">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-slate-100 flex items-center gap-1.5">
              TradeMaster Free <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-900/50">PREVIEW SANDBOX</span>
            </h1>
            <p className="text-xs text-slate-400">Interact with monetization simulators, push notifications, and paper charts.</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            id="btn-toggle-viewport"
            onClick={() => setUsePhoneFrame(!usePhoneFrame)}
            className="text-xs font-bold py-2 px-3.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:text-slate-100 hover:border-slate-700 transition"
          >
            {usePhoneFrame ? '🖥️ Desktop Web Layout' : '📱 Android Phone Layout'}
          </button>
          
          <button
            id="btn-sandbox-premium"
            onClick={() => {
              if (isPremiumUser) {
                setIsPremiumUser(false);
                handleBroadcastPush('🚫 Subscription Reset', 'Switched back to standard Ad-Supported account.');
              } else {
                setShowPremiumModal(true);
              }
            }}
            className={`text-xs font-bold py-2 px-3.5 rounded-xl transition ${
              isPremiumUser
                ? 'bg-amber-950 text-amber-400 border border-amber-900/40'
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
            }`}
          >
            {isPremiumUser ? '👑 Premium Active (Reset)' : '🌟 Unlock Premium'}
          </button>
        </div>
      </div>

      {/* Main Container Core */}
      <div className={`w-full transition-all duration-300 flex justify-center items-stretch ${
        usePhoneFrame ? 'max-w-[410px]' : 'max-w-6xl'
      }`}>
        
        {/* --- ANDROID SMARTPHONE SIMULATOR FRAME --- */}
        <div className={`w-full flex flex-col justify-between overflow-hidden shadow-2xl relative ${
          usePhoneFrame
            ? 'border-[10px] border-slate-900 rounded-[42px] aspect-[9/19] h-[820px] bg-slate-950'
            : 'border border-slate-800 rounded-3xl bg-slate-950 min-h-[750px]'
        } ${theme === 'light' ? 'bg-[#f1f5f9]' : 'bg-[#0a0f1d]'}`}>
          
          {/* Punch Hole Camera Cutout (Only shown in mobile viewport) */}
          {usePhoneFrame && (
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-slate-950 rounded-full z-50 border border-slate-900/60" />
          )}

          {/* Android Status Bar (with battery, time, signal, wifi) */}
          <div className="bg-slate-950 text-slate-400 px-5 pt-3.5 pb-1.5 flex justify-between items-center text-[10px] font-mono select-none z-40">
            <span>{currentTime || '09:20 AM'}</span>
            
            <div className="flex items-center gap-2">
              <button
                id="btn-toggle-network-offline"
                onClick={() => {
                  setIsOfflineMode(!isOfflineMode);
                  handleBroadcastPush(
                    !isOfflineMode ? '📡 Offline Mode Enabled' : '🌐 Network Online',
                    !isOfflineMode ? 'Offline reading active. Local cache displayed.' : 'Sponsor streams and ads reconnected.'
                  );
                }}
                className="hover:text-slate-200 transition"
                title="Toggle Network Offline Simulation"
              >
                {isOfflineMode ? (
                  <span className="flex items-center gap-0.5 text-rose-400 font-bold bg-rose-950/20 px-1 rounded">
                    <WifiOff className="w-3 h-3" /> OFFLINE
                  </span>
                ) : (
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>
              
              <div className="flex items-center gap-1">
                <span>4G</span>
                <div className="w-5 h-2.5 border border-slate-500 rounded-sm p-0.5 flex items-center">
                  <div className="bg-slate-400 h-full w-4/5 rounded-2xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Android Dynamic Alert Toast Overlay */}
          {latestNotificationToast && (
            <div className="absolute top-12 left-3 right-3 bg-slate-900/95 border border-emerald-500/40 rounded-2xl p-3 shadow-2xl z-50 animate-slideDown text-slate-100 flex items-start gap-2.5">
              <div className="p-1.5 bg-emerald-950 rounded-xl border border-emerald-900">
                <Bell className="w-4 h-4 text-emerald-400 animate-swing" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-[11px] font-bold text-emerald-400">Push notification</h5>
                <h4 className="text-xs font-black text-slate-100 mt-0.5 truncate">{latestNotificationToast.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{latestNotificationToast.message}</p>
              </div>
              <button onClick={() => setLatestNotificationToast(null)} className="text-slate-500 hover:text-slate-300">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* --- APPLICATION HEADER & NAVIGATION DRAWER --- */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-3 sticky top-0 backdrop-blur z-30 h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow">
                <TrendingUp className="w-4 h-4 text-slate-950 stroke-[3]" />
              </div>
              <div>
                <h2 className="text-xs font-black text-slate-100 tracking-wider uppercase">TradeMaster Free</h2>
                <span className="text-[9px] text-slate-400 flex items-center gap-1 font-mono uppercase">
                  {language}
                </span>
              </div>
            </div>

            {/* Compact centered Search bar on Desktop */}
            {!usePhoneFrame && (
              <div className="flex-1 max-w-sm mx-4">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search 20+ trading strategy blueprints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-full pl-9 pr-4 py-1 text-[11px] text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              {/* Notification Bell */}
              <button
                id="btn-open-notifications"
                onClick={() => setShowNotificationsModal(true)}
                className="relative bg-slate-950 text-slate-400 hover:text-slate-100 p-2 rounded-xl border border-slate-800 transition"
              >
                <Bell className="w-3.5 h-3.5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                )}
              </button>

              <button
                id="btn-header-premium"
                onClick={() => setShowPremiumModal(true)}
                className={`bg-slate-950 p-2 rounded-xl border transition ${
                  isPremiumUser ? 'text-amber-400 border-amber-900/50' : 'text-slate-400 hover:text-slate-100 border-slate-800'
                }`}
                title="Monetization and membership"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* --- CORE WRAPPER BODY (Sidebar + Scroller) --- */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar on Desktop Viewport */}
            {!usePhoneFrame && (
              <aside className="w-56 shrink-0 border-r border-slate-800 bg-slate-950 flex flex-col justify-between py-6 px-3 select-none">
                <div className="space-y-6">
                  <div className="text-[10px] text-slate-500 uppercase font-black pl-2 tracking-widest">
                    Core Dashboard
                  </div>
                  
                  <nav className="space-y-1">
                    {[
                      { id: 'home', label: 'Home', icon: Home, elementId: 'btn-nav-home' },
                      { id: 'strategies', label: 'Blueprints', icon: BookOpen, elementId: 'btn-nav-blueprints' },
                      { id: 'watchlist', label: 'Watchlist', icon: Activity, elementId: 'btn-nav-watchlist' },
                      { id: 'journal', label: 'Trading Journal', icon: TrendingUp, elementId: 'btn-nav-journal' },
                      { id: 'calendar', label: 'Events & News', icon: Calendar, elementId: 'btn-nav-calendar' },
                      { id: 'notes', label: 'Study Notes', icon: FileText, elementId: 'btn-nav-notes' },
                      { id: 'glossary', label: 'Glossary', icon: Globe, elementId: 'btn-nav-glossary' },
                      { id: 'admin', label: 'Admin Hub', icon: ShieldAlert, elementId: 'btn-nav-admin' },
                      { id: 'settings', label: 'Options', icon: Settings, elementId: 'btn-nav-settings' },
                    ].map((item) => {
                      const IconComponent = item.icon;
                      const isActive = activeScreen === item.id || (item.id === 'strategies' && activeScreen === 'strategy-detail');
                      return (
                        <button
                          key={item.id}
                          id={item.elementId}
                          onClick={() => {
                            if (item.id === 'home' || item.id === 'strategies') {
                              if (!isPremiumUser && Math.random() < 0.15) setShowInterstitial(true);
                            }
                            setActiveScreen(item.id);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                            isActive
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-900">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-center">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono font-bold block">Simulation Account</span>
                    <span className="text-xs font-extrabold text-slate-200 mt-1 block">
                      {isPremiumUser ? '👑 PREMIUM' : 'Standard (Free)'}
                    </span>
                  </div>
                </div>
              </aside>
            )}

            {/* --- VIEW SCREEN CONTENT SCROLLER --- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Offline Cache Warning */}
              {isOfflineMode && (
                <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-2.5 text-center text-xs text-rose-400 font-medium">
                  Offline study mode active. No ads or online assets loaded. Showing offline local cache catalog.
                </div>
              )}

              {/* SCREEN: HOME (DASHBOARD) */}
              {activeScreen === 'home' && (
                <div className={usePhoneFrame ? "space-y-4" : "grid grid-cols-12 gap-6 items-start animate-fadeIn"}>
                  {/* Left Column Pane (Core features) */}
                  <div className={usePhoneFrame ? "space-y-4" : "col-span-8 flex flex-col gap-5"}>
                    {/* Simulated Market indices */}
                    <div className="bg-slate-950 border border-slate-900 rounded-2xl p-3">
                      <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono font-bold block mb-2">Simulated Live Indices</span>
                      <div className={usePhoneFrame ? "flex gap-4 overflow-x-auto scrollbar-none pr-2" : "grid grid-cols-3 gap-3"}>
                        {[
                          { symbol: 'NIFTY 50', val: '24,345.50', chg: '+1.25%', up: true },
                          { symbol: 'BANK NIFTY', val: '52,480.20', chg: '-0.38%', up: false },
                          { symbol: 'SENSEX', val: '79,210.80', chg: '+1.02%', up: true }
                        ].map((idx, i) => (
                          <div key={i} className="flex flex-col justify-between bg-slate-900 border border-slate-800/80 p-3 rounded-xl min-w-[120px]">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{idx.symbol}</span>
                            <div className="flex items-baseline gap-1.5 mt-1">
                              <span className="font-mono text-xs font-bold text-slate-100">{idx.val}</span>
                              <span className={`font-mono text-[9px] font-semibold ${idx.up ? 'text-emerald-400' : 'text-rose-400'}`}>{idx.chg}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dashboard Segment Shortcuts */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest pl-1 block">Study Blueprints Segment</span>
                      <div className={usePhoneFrame ? "grid grid-cols-2 gap-2" : "grid grid-cols-4 gap-3"}>
                        {desktopCategories.map((cat, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setSelectedCategoryFilter(cat.category);
                              setActiveScreen('strategies');
                            }}
                            className="bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl p-3.5 text-center transition flex flex-col items-center justify-center gap-2 group cursor-pointer shadow-sm"
                          >
                            <span className="text-xl group-hover:scale-110 transition duration-300">{cat.emoji}</span>
                            <span className="text-[11px] font-bold text-slate-200 block truncate w-full">{cat.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Spotlight Hero Banner Card */}
                    <div className="bg-gradient-to-br from-emerald-950/20 to-slate-900 border border-emerald-900/30 p-5 rounded-2xl relative overflow-hidden group">
                      <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition duration-500" />
                      <div className="flex flex-col gap-2 relative z-10">
                        <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-widest bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-900/50 self-start">Hot Strategy Spotlight</span>
                        <h3 className="text-sm font-black text-slate-100 mt-1">5-EMA Reversal Strategy</h3>
                        <p className="text-[11px] text-slate-400 max-w-md leading-relaxed mt-1">
                          Learn how to identify trend fatigue and capture powerful intraday reversals on tight 5-minute timeframes. Configured study patterns included.
                        </p>
                        <div className="flex gap-2.5 mt-2 text-[10px] font-mono">
                          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900/30">Timeframe: 5M</span>
                          <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-850 text-slate-400">Win Rate: ~62%</span>
                        </div>
                      </div>
                      <div className="absolute right-[-15px] bottom-[-25px] opacity-10 text-[90px] font-black tracking-tighter text-emerald-400 select-none font-display">EMA</div>
                    </div>

                    {/* Saved Bookmarks List */}
                    {bookmarks.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Saved Bookmarks</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {strategies
                            .filter((s) => bookmarks.includes(s.id))
                            .map((s) => (
                              <div
                                key={s.id}
                                onClick={() => handleSelectStrategyClick(s)}
                                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-xl p-3 flex justify-between items-center cursor-pointer transition text-xs font-bold text-slate-200"
                              >
                                <span className="truncate pr-2">{s.name}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column Pane (Learning aids & daily details) */}
                  <div className={usePhoneFrame ? "space-y-4 animate-fadeIn" : "col-span-4 flex flex-col gap-5"}>
                    {/* Today's Learning Tip */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2">
                        <span className="text-base">💡</span>
                        <span>Learning Tip</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{learningTips[currentTipIdx]}"
                      </p>
                    </div>

                    {/* Critical Risk Rule */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center gap-2 text-[10px] text-rose-400 font-bold uppercase tracking-wider mb-2">
                        <span className="text-base">⚠️</span>
                        <span>Critical Risk Rule</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        "Never risk more than 1-2% of trading capital on a single trade. Stop Loss coordinates represent structural invalidations, not optional boundaries."
                      </p>
                    </div>

                    {/* Daily Challenge Card (Indigo themed) */}
                    <div className="bg-indigo-600/90 border border-indigo-500/20 p-4 rounded-2xl shadow-lg shadow-indigo-900/20 flex items-center justify-between text-slate-100">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold uppercase text-indigo-200 tracking-wider">Daily Challenge</span>
                        <span className="text-xs font-black">Trade Pattern Quiz</span>
                      </div>
                      <button
                        onClick={() => setActiveScreen('quiz')}
                        className="bg-white text-indigo-600 hover:bg-indigo-50 px-3.5 py-1.5 rounded-xl text-xs font-black shadow transition shrink-0"
                      >
                        Solve
                      </button>
                    </div>

                    {/* Trading Psychology Quote */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 italic shadow-sm">
                      <p className="text-xs text-slate-400 leading-relaxed">
                        "{quotes[currentQuoteIdx].quote}"
                      </p>
                      <span className="text-[10px] text-slate-500 mt-2 block text-right font-bold not-italic">
                        — {quotes[currentQuoteIdx].author}
                      </span>
                    </div>
                  </div>
                </div>
              )}

            {/* SCREEN: STRATEGIES LIST */}
            {activeScreen === 'strategies' && (
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    id="input-strategies-search"
                    type="text"
                    placeholder="Search 20+ trading strategy blueprints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Category Quick Filter */}
                <div className="space-y-1.5">
                  <span className="text-[9px] text-slate-500 uppercase font-black pl-1">Filter by category</span>
                  <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1.5">
                    <button
                      id="btn-category-all"
                      onClick={() => setSelectedCategoryFilter('ALL')}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-lg shrink-0 transition ${
                        selectedCategoryFilter === 'ALL'
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-900 text-slate-400 border border-slate-800/60'
                      }`}
                    >
                      ALL ({strategies.length})
                    </button>
                    {categoriesList.map((cat) => {
                      const count = strategies.filter((s) => s.category === cat).length;
                      return (
                        <button
                          key={cat}
                          id={`btn-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setSelectedCategoryFilter(cat)}
                          className={`text-[10px] font-bold px-3 py-1.5 rounded-lg shrink-0 transition ${
                            selectedCategoryFilter === cat
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-900 text-slate-400 border border-slate-800/60'
                          }`}
                        >
                          {cat} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Strategy Cards */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Trading Blueprints</h3>
                  {filteredStrategies.map((strat) => {
                    const isBookmarked = bookmarks.includes(strat.id);
                    return (
                      <div
                        key={strat.id}
                        onClick={() => handleSelectStrategyClick(strat)}
                        className="bg-slate-900 hover:bg-slate-850 border border-slate-800/80 rounded-2xl p-3.5 transition cursor-pointer flex justify-between items-center gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            {strat.isPremium && (
                              <span className="text-[8px] bg-amber-950 text-amber-400 border border-amber-800/60 px-1.5 py-0.2 rounded font-mono font-bold flex items-center gap-0.5">
                                <Lock className="w-2.5 h-2.5" /> PREMIUM
                              </span>
                            )}
                            <span className="text-xs font-bold text-slate-100 truncate block">{strat.name}</span>
                          </div>
                          
                          <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                            <span className="bg-slate-950 text-slate-500 px-1.5 py-0.5 rounded uppercase font-mono text-[9px]">
                              {strat.category}
                            </span>
                            <span>•</span>
                            <span>{strat.timeframe}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          {isBookmarked && <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-current" />}
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </div>
                      </div>
                    );
                  })}

                  {filteredStrategies.length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-500">
                      No strategies match your active filters. Go to Admin to publish custom structures!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SCREEN: STRATEGY DETAIL PAGE */}
            {activeScreen === 'strategy-detail' && selectedStrategy && (
              <div className="space-y-4">
                {/* Top Control Links */}
                <div className="flex justify-between items-center">
                  <button
                    id="btn-back-to-strats"
                    onClick={() => setActiveScreen('strategies')}
                    className="text-xs font-bold text-slate-400 hover:text-slate-200"
                  >
                    ← Back to List
                  </button>

                  <button
                    id="btn-toggle-strat-bookmark"
                    onClick={() => handleToggleBookmark(selectedStrategy.id)}
                    className="text-slate-400 hover:text-slate-200 transition p-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-1 text-xs"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarks.includes(selectedStrategy.id) ? 'text-amber-400 fill-current' : ''}`} />
                    <span>{bookmarks.includes(selectedStrategy.id) ? 'Saved' : 'Bookmark'}</span>
                  </button>
                </div>

                {/* Strategy Header Info */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-slate-100">{selectedStrategy.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                      {selectedStrategy.category}
                    </span>
                    <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                      Timeframe: {selectedStrategy.timeframe}
                    </span>
                    <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                      R:R Expectancy: {selectedStrategy.riskReward}
                    </span>
                  </div>
                </div>

                {/* Legal educational disclaimer (Mandatory on every strategy page!) */}
                <div className="bg-amber-950/20 border border-amber-900/40 p-3 rounded-xl text-[10px] text-amber-400 leading-relaxed flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Educational Disclaimer:</strong> Trading in stocks, futures, and options involves significant risk. This strategy page is for educational purposes only and does not provide investment advice. Users should conduct their own research and consult a qualified financial advisor before making investment decisions.
                  </p>
                </div>

                {/* Technical Conditions */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase font-black">Market Conditions & Setup</span>
                  <p className="text-xs text-slate-200 leading-relaxed">{selectedStrategy.marketConditions}</p>
                </div>

                {/* Interactive Chart Canvas Overlay */}
                <InteractiveChart chartType={selectedStrategy.chartType} strategyName={selectedStrategy.name} />

                {/* Entry Rules List */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5 space-y-2">
                  <span className="text-[9px] text-slate-500 uppercase font-black block">How to Enter (Rules)</span>
                  <ol className="list-decimal pl-4 space-y-1.5 text-xs text-slate-300">
                    {selectedStrategy.entryRules.map((rule, index) => (
                      <li key={index} className="leading-relaxed">{rule}</li>
                    ))}
                  </ol>
                </div>

                {/* Exit Rules List */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5 space-y-2">
                  <span className="text-[9px] text-slate-500 uppercase font-black block">How to Exit & Protect Capital</span>
                  <ol className="list-decimal pl-4 space-y-1.5 text-xs text-slate-300">
                    {selectedStrategy.exitRules.map((rule, index) => (
                      <li key={index} className="leading-relaxed">{rule}</li>
                    ))}
                  </ol>
                </div>

                {/* Sizing & Targets boundaries */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5">
                    <span className="text-[9px] text-slate-500 uppercase font-black block">Stop Loss Level</span>
                    <p className="text-xs text-slate-200 mt-1 leading-relaxed">{selectedStrategy.stopLoss}</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5">
                    <span className="text-[9px] text-slate-500 uppercase font-black block">Target Projection</span>
                    <p className="text-xs text-slate-200 mt-1 leading-relaxed">{selectedStrategy.target}</p>
                  </div>
                </div>

                {/* Advantages vs Disadvantages Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5 space-y-1.5">
                    <span className="text-[9px] text-emerald-400 uppercase font-black block">Advantages (Pros)</span>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300">
                      {selectedStrategy.advantages.map((adv, idx) => (
                        <li key={idx}>{adv}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5 space-y-1.5">
                    <span className="text-[9px] text-rose-400 uppercase font-black block">Disadvantages (Cons)</span>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300">
                      {selectedStrategy.disadvantages.map((dis, idx) => (
                        <li key={idx}>{dis}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Common Mistakes */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-3.5 space-y-1.5">
                  <span className="text-[9px] text-red-400 uppercase font-black block">Common Trading Mistakes</span>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300">
                    {selectedStrategy.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="leading-relaxed">{mistake}</li>
                    ))}
                  </ul>
                </div>

                {/* Linked Personal Study Notes section */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                    <span className="text-xs font-bold text-slate-200">Linked Personal Study Notes</span>
                    <button
                      id="btn-quick-create-note"
                      onClick={() => {
                        setNotes([
                          {
                            id: `note-${Date.now()}`,
                            strategyId: selectedStrategy.id,
                            strategyName: selectedStrategy.name,
                            title: `Study note for ${selectedStrategy.name}`,
                            content: 'Record details about chart triggers, personal trades, or backtest results here.',
                            updatedAt: new Date().toLocaleDateString()
                          },
                          ...notes
                        ]);
                        handleBroadcastPush('📝 Study Note Created', `Note linked to ${selectedStrategy.name} created. You can edit this in the Notebook screen.`);
                      }}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold"
                    >
                      + Create Study Note
                    </button>
                  </div>

                  {activeStrategyNotes.length === 0 ? (
                    <p className="text-[11px] text-slate-500 italic">No notes linked to this strategy yet. Keeping notes aids visual retention.</p>
                  ) : (
                    <div className="space-y-2 max-h-[150px] overflow-y-auto">
                      {activeStrategyNotes.map((note) => (
                        <div key={note.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-900 text-xs">
                          <h5 className="font-bold text-slate-300">{note.title}</h5>
                          <p className="text-[11px] text-slate-400 mt-1">{note.content}</p>
                          <span className="text-[8px] text-slate-500 font-mono block mt-1.5">Last updated: {note.updatedAt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SCREEN: WATCHLIST */}
            {activeScreen === 'watchlist' && (
              <WatchlistSimulator onPaperTrade={handlePaperTradeFromWatchlist} />
            )}

            {/* SCREEN: TRADING JOURNAL */}
            {activeScreen === 'journal' && (
              <JournalSection
                entries={journal}
                strategies={strategies}
                onAddEntry={handleAddJournalEntry}
                onDeleteEntry={handleDeleteJournalEntry}
                onClearJournal={handleClearJournal}
              />
            )}

            {/* SCREEN: QUIZ */}
            {activeScreen === 'quiz' && (
              <QuizSection />
            )}

            {/* SCREEN: STUDY NOTES */}
            {activeScreen === 'notes' && (
              <NotesSection
                notes={notes}
                strategies={strategies}
                onAddNote={handleAddNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            )}

            {/* SCREEN: GLOSSARY */}
            {activeScreen === 'glossary' && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Search Dictionary</span>
                  <input
                    id="input-glossary-search"
                    type="text"
                    placeholder="Search terms (e.g. Theta, Option, Margin)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  {GLOSSARY_TERMS.filter((g) =>
                    g.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    g.definition.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((term, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-200">{term.term}</span>
                        <span className="text-[9px] bg-slate-950 text-slate-500 border border-slate-900/60 px-1.5 rounded font-mono">
                          {term.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{term.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCREEN: CALENDAR & NEWS */}
            {activeScreen === 'calendar' && (
              <div className="space-y-4">
                <EconomicCalendar />
                <NewsFeed />
              </div>
            )}

            {/* SCREEN: ADMIN PANEL */}
            {activeScreen === 'admin' && (
              <AdminPanel
                strategies={strategies}
                onAddStrategy={handleAddStrategy}
                onDeleteStrategy={handleDeleteStrategy}
                onSendPush={handleBroadcastPush}
              />
            )}

            {/* SCREEN: SETTINGS */}
            {activeScreen === 'settings' && (
              <div className="space-y-4">
                {/* Language Select */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex justify-between items-center gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">App Language</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Select instructional language</span>
                  </div>
                  <select
                    id="select-app-language"
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      handleBroadcastPush('🌐 Language Updated', `Strategy terminology loaded in ${e.target.value}.`);
                    }}
                    className="bg-slate-950 text-xs font-bold text-slate-300 border border-slate-800 rounded-lg p-1.5 outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">हिंदी (Hindi)</option>
                    <option value="Spanish">Español (Spanish)</option>
                    <option value="Marathi">मराठी (Marathi)</option>
                  </select>
                </div>

                {/* Push Toggle */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex justify-between items-center gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">Simulate Push Notifications</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Toggle alert banner broadcasts</span>
                  </div>
                  <input
                    id="checkbox-settings-push"
                    type="checkbox"
                    checked={isPushEnabled}
                    onChange={(e) => setIsPushEnabled(e.target.checked)}
                    className="w-4 h-4 text-emerald-500 bg-slate-950 border-slate-850 rounded"
                  />
                </div>

                {/* Dark Mode Theme toggle */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex justify-between items-center gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">Dark / Light UI Theme</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Swap general interface presets</span>
                  </div>
                  <button
                    id="btn-settings-toggle-theme"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="text-slate-400 hover:text-slate-200 p-2 bg-slate-950 rounded-xl border border-slate-800 transition"
                  >
                    {theme === 'dark' ? <Moon className="w-4 h-4 text-emerald-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  </button>
                </div>

                {/* Regulatory / Legal Info Documents */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs text-slate-300">
                  <h4 className="font-bold text-slate-100 border-b border-slate-800 pb-1.5">Compliance documents</h4>
                  
                  <div className="space-y-2.5">
                    <div>
                      <span className="font-bold text-slate-200 block text-[11px]">Privacy Policy</span>
                      <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                        TradeMaster Free operates with absolute user privacy. We store 100% of journal logs, study notes, and catalog creations offline on your client device’s local browser cache (localStorage). No credit cards, personal identifiers, or emails are synced to public database buckets.
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-200 block text-[11px]">Terms & Conditions</span>
                      <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                        By studying strategies inside TradeMaster Free, you acknowledge that all materials are simulated blueprints. Options, futures, and stock trading represent high capital risks. This tool does not guarantee financial returns.
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-200 block text-[11px]">About App</span>
                      <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                        TradeMaster Free v1.2.0 is a leading simulation application designed to build strong mechanical setups for intraday scalpers, swing traders, and derivatives operators globally.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reset all data */}
                <button
                  id="btn-factory-reset"
                  onClick={() => {
                    if (window.confirm('WARNING: This will delete all customized study notes, journal logs, and custom strategies!')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="w-full bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 text-rose-400 font-bold text-xs py-2.5 rounded-xl transition"
                >
                  Factory Reset (Delete Local Logs)
                </button>
              </div>
            )}
          </div>
        </div>

          {/* --- SPONSOR BANNER AD GATEWAY (Google AdMob Mock) --- */}
          <MockAdBanner
            isPremiumUser={isPremiumUser}
            onGoPremium={() => setShowPremiumModal(true)}
          />

          {/* --- ANDROID OS SYSTEM BOTTOM NAVIGATION NAVIGATION RAIL --- */}
          <div className={`bg-slate-950 border-t border-slate-900 px-4 py-2 flex items-center justify-around text-slate-500 select-none z-20 ${usePhoneFrame ? 'flex' : 'hidden'}`}>
            <button
              id="btn-nav-home"
              onClick={() => {
                if (!isPremiumUser && Math.random() < 0.15) setShowInterstitial(true);
                setActiveScreen('home');
              }}
              className={`flex flex-col items-center gap-0.5 transition ${
                activeScreen === 'home' ? 'text-emerald-400' : 'hover:text-slate-300'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[9px] font-medium font-sans">Home</span>
            </button>

            <button
              id="btn-nav-blueprints"
              onClick={() => {
                if (!isPremiumUser && Math.random() < 0.15) setShowInterstitial(true);
                setActiveScreen('strategies');
              }}
              className={`flex flex-col items-center gap-0.5 transition ${
                activeScreen === 'strategies' || activeScreen === 'strategy-detail' ? 'text-emerald-400' : 'hover:text-slate-300'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-[9px] font-medium font-sans">Classes</span>
            </button>

            <button
              id="btn-nav-watchlist"
              onClick={() => {
                setActiveScreen('watchlist');
              }}
              className={`flex flex-col items-center gap-0.5 transition ${
                activeScreen === 'watchlist' ? 'text-emerald-400' : 'hover:text-slate-300'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span className="text-[9px] font-medium font-sans">Ticks</span>
            </button>

            <button
              id="btn-nav-journal"
              onClick={() => setActiveScreen('journal')}
              className={`flex flex-col items-center gap-0.5 transition ${
                activeScreen === 'journal' ? 'text-emerald-400' : 'hover:text-slate-300'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-[9px] font-medium font-sans">Journal</span>
            </button>

            <button
              id="btn-nav-calendar"
              onClick={() => setActiveScreen('calendar')}
              className={`flex flex-col items-center gap-0.5 transition ${
                activeScreen === 'calendar' ? 'text-emerald-400' : 'hover:text-slate-300'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-[9px] font-medium font-sans">Events</span>
            </button>

            <button
              id="btn-nav-notes"
              onClick={() => setActiveScreen('notes')}
              className={`flex flex-col items-center gap-0.5 transition ${
                activeScreen === 'notes' ? 'text-emerald-400' : 'hover:text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="text-[9px] font-medium font-sans">Notes</span>
            </button>

            <button
              id="btn-nav-glossary"
              onClick={() => setActiveScreen('glossary')}
              className={`flex flex-col items-center gap-0.5 transition ${
                activeScreen === 'glossary' ? 'text-emerald-400' : 'hover:text-slate-300'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-[9px] font-medium font-sans">Glossary</span>
            </button>

            <button
              id="btn-nav-admin"
              onClick={() => setActiveScreen('admin')}
              className={`flex flex-col items-center gap-0.5 transition ${
                activeScreen === 'admin' ? 'text-emerald-400' : 'hover:text-slate-300'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[9px] font-medium font-sans">Admin</span>
            </button>

            <button
              id="btn-nav-settings"
              onClick={() => setActiveScreen('settings')}
              className={`flex flex-col items-center gap-0.5 transition ${
                activeScreen === 'settings' ? 'text-emerald-400' : 'hover:text-slate-300'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="text-[9px] font-medium font-sans">Options</span>
            </button>
          </div>

          {/* Android hardware-like navigation buttons at very bottom (Back, Home, Recents) inside phone frame */}
          {usePhoneFrame && (
            <div className="bg-slate-950 py-2.5 flex items-center justify-around border-t border-slate-900 select-none z-10">
              <button
                id="btn-hardware-back"
                onClick={() => {
                  if (activeScreen === 'strategy-detail') {
                    setActiveScreen('strategies');
                  } else {
                    setActiveScreen('home');
                  }
                }}
                className="text-slate-500 hover:text-slate-300 transition"
                title="Android Back Button"
              >
                <div className="w-0.5 h-3.5 bg-slate-500 rounded -rotate-45 relative left-1" />
                <div className="w-0.5 h-3.5 bg-slate-500 rounded rotate-45 relative -top-1 left-1" />
              </button>

              <button
                id="btn-hardware-home"
                onClick={() => setActiveScreen('home')}
                className="w-3.5 h-3.5 border-2 border-slate-500 rounded-full hover:border-slate-300 transition"
                title="Android Home Button"
              />

              <button
                id="btn-hardware-recents"
                onClick={() => setActiveScreen('admin')}
                className="w-3 h-3 border-2 border-slate-500 rounded-xs hover:border-slate-300 transition"
                title="Android Recents Button"
              />
            </div>
          )}

        </div>
      </div>

      {/* --- NOTIFICATIONS BELL DRAWER / MODAL OVERLAY --- */}
      {showNotificationsModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl text-slate-100 space-y-3 relative">
            <button
              id="btn-close-notifications-modal"
              onClick={() => setShowNotificationsModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-1.5 border-b border-slate-850 pb-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              Notification Inbox
            </h3>

            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
              {notifications.map((notif) => (
                <div key={notif.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-900 space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-200">{notif.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{notif.message}</p>
                  <span className="text-[8px] text-slate-500 font-mono block text-right pt-1">{notif.time}</span>
                </div>
              ))}
            </div>

            <button
              id="btn-clear-notifications"
              onClick={() => {
                setNotifications([]);
                setShowNotificationsModal(false);
              }}
              className="w-full bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-300 text-xs font-bold py-2 rounded-xl transition"
            >
              Clear All Alerts
            </button>
          </div>
        </div>
      )}

      {/* --- ADMOB MODAL OVERLAYS (Interstitial, Rewarded, Premium) --- */}
      <MockInterstitialAd
        isOpen={showInterstitial}
        onClose={() => setShowInterstitial(false)}
      />

      <MockRewardedAd
        isOpen={showRewarded}
        strategyName={rewardStrategyTarget ? rewardStrategyTarget.name : 'Premium Strategy'}
        onRewardCompleted={handleRewardAdCompleted}
        onClose={() => {
          setShowRewarded(false);
          setRewardStrategyTarget(null);
        }}
      />

      <PremiumSubscriptionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSubscribeSuccess={() => {
          setIsPremiumUser(true);
          handleBroadcastPush('👑 Premium License Unlocked!', 'Welcome to TradeMaster Premium. Ads disabled, options active!');
        }}
      />

    </div>
  );
}
