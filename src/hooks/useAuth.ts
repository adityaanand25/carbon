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
    // Check if we're in development mode with placeholder Supabase config
    const isDevelopmentMode = import.meta.env.VITE_SUPABASE_URL === undefined || 
                              import.meta.env.VITE_SUPABASE_URL?.includes('placeholder');

    if (isDevelopmentMode) {
      // In development mode, create a mock user
      console.log('Running in development mode with mock user');
      setTimeout(() => {
        setAuthState({
          user: {
            id: 'dev-user-123',
            email: 'developer@example.com',
            name: 'Developer User',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          loading: false,
          error: null,
        });
      }, 1000);
      return;
    }

    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (authState.loading) {
        console.warn('Auth loading timeout, setting loading to false');
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    }, 10000); // 10 second timeout

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(timeout);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setAuthState({ user: null, loading: false, error: null });
      }
    }).catch((error) => {
      clearTimeout(timeout);
      console.error('Error getting session:', error);
      setAuthState({ user: null, loading: false, error: null });
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setAuthState({ user: null, loading: false, error: null });
        }
      }
    );

    return () => {
      clearTimeout(timeout);
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
        // If profiles table doesn't exist or profile not found, create basic user object
        console.warn('Profile not found, using basic user data:', error);
        const { data: userData } = await supabase.auth.getUser();
        
        setAuthState({
          user: {
            id: userId,
            email: userData.user?.email || '',
            name: userData.user?.user_metadata?.name || 'User',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          loading: false,
          error: null,
        });
        return;
      }

      setAuthState({
        user: data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Fallback to basic user data even on error
      const { data: userData } = await supabase.auth.getUser();
      
      setAuthState({
        user: {
          id: userId,
          email: userData.user?.email || '',
          name: userData.user?.user_metadata?.name || 'User',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        loading: false,
        error: null,
      });
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
      // Check if we're in development mode
      const isDevelopmentMode = import.meta.env.VITE_SUPABASE_URL === undefined || 
                                import.meta.env.VITE_SUPABASE_URL?.includes('placeholder');
      
      if (isDevelopmentMode) {
        setAuthState({ user: null, loading: false, error: null });
        return;
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
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