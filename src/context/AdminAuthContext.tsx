import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AdminAuthValue {
  session: Session | null;
  email: string | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  async function checkAdmin(userId: string | undefined): Promise<boolean> {
    if (!userId) { setIsAdmin(false); return false; }
    const { data, error } = await supabase
      .from('app_admins')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();
    const ok = !error && !!data;
    setIsAdmin(ok);
    return ok;
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      await checkAdmin(data.session?.user?.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, s) => {
      setSession(s);
      await checkAdmin(s?.user?.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    const ok = await checkAdmin(data.user?.id);
    if (!ok) {
      await supabase.auth.signOut();
      throw new Error('Akun ini tidak memiliki akses admin.');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ session, email: session?.user?.email ?? null, isAdmin, loading, login, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth harus dipakai di dalam <AdminAuthProvider>');
  return ctx;
}
