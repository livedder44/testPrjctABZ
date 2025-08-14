import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import UsersGrid from '@/components/UsersGrid/UsersGrid';
import SignupForm from '@/components/SignupForm/SignupForm';
import Success from '@/components/Success/Success';
import s from './App.module.scss';

export default function App() {
  const [registered, setRegistered] = useState(false);
  const [usersGridKey, setUsersGridKey] = useState(0);
  const usersGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (registered) {
      const timer = setTimeout(() => setRegistered(false), 15000);
      return () => clearTimeout(timer);
    }
  }, [registered]);

  useEffect(() => {
    if (!registered) {
      setUsersGridKey(prev => prev + 1);
      if (usersGridRef.current) {
        usersGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [registered]);

  return (
    <div className={s.app}>
      <Header />
      <main>
        <Hero />
        <div ref={usersGridRef}>
          <UsersGrid key={usersGridKey} />
        </div>

        {registered ? (
          <div onClick={() => setRegistered(false)}>
            <Success />
          </div>
        ) : (
          <SignupForm onSuccess={() => setRegistered(true)} />
        )}
      </main>
    </div>
  );
}
