import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AuthState, SignUpData, SignInData, User } from '../types/auth';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    console.log('Initializing authentication flow');

    const isDevelopmentMode =
      import.meta.env.VITE_SUPABASE_URL === undefined ||
      import.meta.env.VITE_SUPABASE_URL?.includes('placeholder') ||
      import.meta.env.VITE_SUPABASE_URL?.includes('your_supabase_project_url_here');

    if (isDevelopmentMode) {
      console.log('Development mode detected. Supabase not configured.');
      // Don't auto-create a mock user - let the user manually sign in
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Auth state changed: ${event}`, session);
      if (session?.user) {
        const user = session.user;
        setAuthState(prev => ({
          ...prev,
          loading: false,
          user: {
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name || prev.user?.name,
            avatar_url: user.user_metadata?.avatar_url,
            created_at: user.created_at,
            updated_at: user.updated_at || new Date().toISOString(),
          },
        }));
        fetchUserProfile(user.id);
      } else {
        setAuthState({ user: null, loading: false, error: null });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Profile not found, using basic user data from auth session.', error.message);
        return;
      }

      if (data) {
        setAuthState(prev => ({
          ...prev,
          user: { ...prev.user!, ...data },
        }));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signUp = async ({ email, password, name }: SignUpData) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              name,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]);

        if (profileError) throw profileError;
      }

      return { success: true, error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign up';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  };

  const signIn = async ({ email, password }: SignInData) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      const isDevelopmentMode =
        import.meta.env.VITE_SUPABASE_URL === undefined ||
        import.meta.env.VITE_SUPABASE_URL?.includes('placeholder') ||
        import.meta.env.VITE_SUPABASE_URL?.includes('your_supabase_project_url_here');

      if (isDevelopmentMode) {
        console.log('Development mode: Creating mock user for sign in');
        // Create a mock user for development
        const mockUser: User = {
          id: 'dev-user-001',
          email: email,
          name: 'Demo User',
          avatar_url: undefined,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        setAuthState({
          user: mockUser,
          loading: false,
          error: null,
        });
        return { success: true, error: null };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { success: true, error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign in';
      setAuthState(prev => ({ ...prev, loading: false, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
        setAuthState(prev => ({ ...prev, loading: true }));

        const isDevelopmentMode =
            import.meta.env.VITE_SUPABASE_URL === undefined ||
            import.meta.env.VITE_SUPABASE_URL?.includes('placeholder') ||
            import.meta.env.VITE_SUPABASE_URL?.includes('your_supabase_project_url_here');

        if (isDevelopmentMode) {
            console.log('Development mode: Clearing mock user state');
            setAuthState({ user: null, loading: false, error: null });
            return;
        }

        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        setAuthState({ user: null, loading: false, error: null });
    } catch (error: any) {
        console.error('Error during sign out:', error);
        setAuthState(prev => ({ ...prev, loading: false, error: error.message || 'Failed to sign out' }));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };
}