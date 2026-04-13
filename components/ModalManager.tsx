'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

export const transitionDuration = 300;

export type ModalKey = 'login' | 'register' | 'profile';

export type BaseModalProperties = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ModalRegistry: Record<ModalKey, React.ComponentType<BaseModalProperties>> = {
  login: dynamic(() => import('./authorization/LoginDialog'), { ssr: false }),
  register: dynamic(() => import('./authorization/RegistrationDialog'), { ssr: false }),
  profile: dynamic(() => import('./authorization/ProfileDialog'), { ssr: false }),
};

type ModalManagerProperties = {
  isTransitioning: boolean;
  setIsTransitioning: (bool: boolean) => void;
  activeKey: ModalKey | undefined;
};

export default function ModalManager({ setIsTransitioning, activeKey }: ModalManagerProperties) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentKey, setCurrentKey] = useState<ModalKey | undefined>();

  const guard = useRef<boolean>(false);

  useEffect(() => {
    if (guard.current) return;
    (async () => {
      guard.current = true;
      if (currentKey === activeKey) return;
      console.log('currentKey', currentKey, 'activeKey', activeKey);

      setIsTransitioning(true);

      if (currentKey !== undefined && isVisible) {
        setIsVisible(false);

        console.log('should pause');
        await new Promise<void>((resolve) =>
          setTimeout(() => {
            console.log('pause lifted');
            resolve();
          }, transitionDuration)
        );
      }

      console.log('opening new modal');
      setCurrentKey(activeKey);
      if (activeKey !== undefined) {
        setIsVisible(true);
      }

      setIsTransitioning(false);
    })().finally(() => (guard.current = false));
  }, [activeKey, currentKey, isVisible, setIsTransitioning]);

  return Object.entries(ModalRegistry).map(([key, Component]) => {
    return currentKey && currentKey === key && <Component key={key} open={isVisible} onOpenChange={setIsVisible} />;
  });
}
