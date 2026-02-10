import { ref, computed } from 'vue'
import { router } from '../router'
import { supabase } from '../lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface User {
    id: string
    email: string
    username: string
    avatar_url?: string
    createdAt: string
}

// Reactive auth state
const currentUser = ref<User | null>(null)
const isAuthenticated = computed(() => currentUser.value !== null)
const isLoading = ref(false)
const authError = ref<string | null>(null)

// Initialize auth state from Supabase session
async function initAuth() {
    try {
        const { data: { session } } = await supabase.auth.getSession()

        if (session) {
            // Fetch user profile from profiles table
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

            if (profile) {
                currentUser.value = {
                    id: profile.id,
                    email: session.user.email!,
                    username: profile.username,
                    avatar_url: profile.avatar_url,
                    createdAt: profile.created_at
                }
            }
        }
    } catch (error: any) {
        console.error('Error initializing auth:', error)
    }

    // Listen for auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

            if (profile) {
                currentUser.value = {
                    id: profile.id,
                    email: session.user.email!,
                    username: profile.username,
                    avatar_url: profile.avatar_url,
                    createdAt: profile.created_at
                }
            }
        } else if (event === 'SIGNED_OUT') {
            currentUser.value = null
        }
    })
}

// Sign up new user
async function signUp(email: string, password: string, username: string) {
    isLoading.value = true
    authError.value = null

    try {
        // Check if username already exists
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('username')
            .eq('username', username)
            .single()

        if (existingProfile) {
            throw new Error('Username already taken')
        }

        // Sign up with Supabase Auth
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username
                }
            }
        })

        if (signUpError) throw signUpError

        if (!authData.user) {
            throw new Error('Failed to create user')
        }

        // Create profile (this will be handled by a database trigger ideally, but we'll do it manually for now)
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: authData.user.id,
                username,
                avatar_url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`,
                xp: 0
            })

        if (profileError && profileError.code !== '23505') { // Ignore duplicate key errors
            console.error('Profile creation error:', profileError)
        }

        // Set current user
        currentUser.value = {
            id: authData.user.id,
            email: authData.user.email!,
            username,
            avatar_url: `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`,
            createdAt: new Date().toISOString()
        }

        // Navigate to dashboard
        router.push('/dashboard')

        return { success: true }
    } catch (error: any) {
        authError.value = error.message
        throw error
    } finally {
        isLoading.value = false
    }
}

// Sign in existing user
async function signIn(email: string, password: string) {
    isLoading.value = true
    authError.value = null

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) throw error

        if (!data.user) {
            throw new Error('Login failed')
        }

        // Fetch user profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single()

        if (profile) {
            currentUser.value = {
                id: profile.id,
                email: data.user.email!,
                username: profile.username,
                avatar_url: profile.avatar_url,
                createdAt: profile.created_at
            }
        }

        // Navigate to dashboard
        router.push('/dashboard')

        return { success: true }
    } catch (error: any) {
        authError.value = error.message
        throw error
    } finally {
        isLoading.value = false
    }
}

// Sign out
async function signOut() {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error

        currentUser.value = null
        router.push('/login')
    } catch (error: any) {
        console.error('Logout error:', error)
        authError.value = error.message
    }
}

// OAuth placeholder (for future implementation)
async function signInWithProvider(provider: 'github' | 'google') {
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider === 'github' ? 'github' : 'google',
            options: {
                redirectTo: window.location.origin
            }
        })

        if (error) throw error
    } catch (error: any) {
        authError.value = error.message
        console.error(`${provider} login error:`, error)
    }
}

export function useAuth() {
    return {
        // State
        currentUser,
        isAuthenticated,
        isLoading,
        authError,

        // Methods
        initAuth,
        signUp,
        signIn,
        signOut,
        signInWithProvider
    }
}
