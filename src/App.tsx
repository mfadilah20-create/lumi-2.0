import React, { useState } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeScreen } from './components/HomeScreen';
import { BelajarHurufScreen } from './components/activities/BelajarHurufScreen';
import { MenulisScreen } from './components/activities/MenulisScreen';
import { BermainScreen } from './components/activities/BermainScreen';
import { MembacaScreen } from './components/activities/MembacaScreen';
import { CeritaScreen } from './components/activities/CeritaScreen';
import { ParentSettingsModal } from './components/ParentSettingsModal';
import { ActivityScreen, ChildProfile } from './types';

export default function App() {
  const [childProfile, setChildProfile] = useState<ChildProfile>(() => {
    try {
      const saved =
        localStorage.getItem('lumi_child_nickname') ||
        localStorage.getItem('lumi_child_name');
      if (saved && saved.trim().length > 0 && saved.trim().toLowerCase() !== 'adit') {
        return { nickname: saved.trim() };
      }
    } catch {
      // ignore
    }
    return { nickname: 'Izar' };
  });

  const [currentScreen, setCurrentScreen] = useState<ActivityScreen>('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isInitialized] = useState<boolean>(true);

  const handleOnboardingComplete = (name: string) => {
    const trimmed = name.trim();
    setChildProfile({ nickname: trimmed });
    try {
      localStorage.setItem('lumi_child_nickname', trimmed);
      localStorage.setItem('lumi_child_name', trimmed);
    } catch {
      // ignore
    }
    setCurrentScreen('home');
  };

  const handleUpdateNickname = (newName: string) => {
    const trimmed = newName.trim();
    setChildProfile({ nickname: trimmed });
    try {
      localStorage.setItem('lumi_child_nickname', trimmed);
      localStorage.setItem('lumi_child_name', trimmed);
    } catch {
      // ignore
    }
  };

  const handleResetProgress = () => {
    try {
      localStorage.removeItem('lumi_child_nickname');
      localStorage.removeItem('lumi_child_name');
    } catch {
      // ignore
    }
    setChildProfile({ nickname: '' });
    setCurrentScreen('home');
  };

  // Do not render before local storage check
  if (!isInitialized) {
    return (
      <div className="w-full h-screen bg-[#bbf2f6] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 1. FIRST LAUNCH: ONBOARDING FLOW (Only if no nickname at all)
  if (!childProfile.nickname && currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  const activeNickname = childProfile.nickname || 'Izar';

  // 2. MAIN APPLICATION NAVIGATION
  return (
    <div className="w-full min-h-screen bg-[#bbf2f6] text-slate-800 font-nunito selection:bg-amber-200">
      {/* HOME SCREEN */}
      {currentScreen === 'home' && (
        <HomeScreen
          childProfile={childProfile}
          childName={activeNickname}
          onSelectActivity={(act) => setCurrentScreen(act)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      {/* ACTIVITY 1: BELAJAR HURUF */}
      {currentScreen === 'belajar-huruf' && (
        <BelajarHurufScreen
          childName={activeNickname}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {/* ACTIVITY 2: MENULIS */}
      {currentScreen === 'menulis' && (
        <MenulisScreen
          childName={activeNickname}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {/* ACTIVITY 3: BERMAIN */}
      {currentScreen === 'bermain' && (
        <BermainScreen
          childName={activeNickname}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {/* ACTIVITY 4: MEMBACA */}
      {currentScreen === 'membaca' && (
        <MembacaScreen
          childName={activeNickname}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {/* ACTIVITY 5: CERITA */}
      {currentScreen === 'cerita' && (
        <CeritaScreen
          childName={activeNickname}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {/* PARENT SETTINGS MODAL */}
      <ParentSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        nickname={activeNickname}
        onUpdateNickname={handleUpdateNickname}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
