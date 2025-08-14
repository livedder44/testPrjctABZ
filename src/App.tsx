import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import UsersGrid from '@/components/UsersGrid/UsersGrid';
import SignupForm from '@/components/SignupForm/SignupForm';
import Success from '@/components/Success/Success';
import type { User } from '@/types/user';
import s from './App.module.scss';

export default function App() {
  const [registered, setRegistered] = useState(false);
  const [justRegistered, setJustRegistered] = useState<User | null>(null);
  const usersGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!registered) return;
    const t = setTimeout(() => setRegistered(false), 15000);
    return () => clearTimeout(t);
  }, [registered]);

  const prevRegistered = useRef(registered);
  useEffect(() => {
    const turnedOff = prevRegistered.current === true && registered === false;
    prevRegistered.current = registered;
    if (turnedOff) {
      usersGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [registered]);

  return (
    <div className={s.app}>
      <Header />
      <main>
        <Hero />

        <div ref={usersGridRef}>
          {}
          <UsersGrid prependUser={justRegistered} />
        </div>

        {registered ? (
          <div onClick={() => setRegistered(false)}>
            <Success />
          </div>
        ) : (
          <SignupForm
            onSuccess={(user) => {
              setJustRegistered(user);
              setRegistered(true);
            }}
          />
        )}
      </main>
    </div>
  );
}
