import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export interface LeaderboardPlayer {
    id: string
    username: string
    avatar_url: string
    xp: number
    isMe: boolean
}

export function useLeaderboard() {
    const { currentUser } = useAuth()
    const leaderboard = ref<LeaderboardPlayer[]>([])
    const isLoading = ref(false)

    async function fetchLeaderboard() {
        isLoading.value = true

        try {
            // Fetch top players from Supabase
            const { data, error } = await supabase
                .from('profiles')
                .select('id, username, avatar_url, xp')
                .order('xp', { ascending: false })
                .limit(10)

            if (error) throw error

            if (data) {
                leaderboard.value = data.map(player => ({
                    ...player,
                    isMe: player.id === currentUser.value?.id
                }))
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error)
            // Fallback to demo data if database isn't set up yet
            generateDemoLeaderboard()
        } finally {
            isLoading.value = false
        }
    }

    function generateDemoLeaderboard() {
        const demoPlayers: LeaderboardPlayer[] = [
            { id: '1', username: 'Sarah Chen', xp: 12450, avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah', isMe: false },
            { id: '2', username: 'Mike Johnson', xp: 11890, avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mike', isMe: false },
            { id: '3', username: 'Emma Davis', xp: 10320, avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma', isMe: false },
            { id: '4', username: currentUser.value?.username || 'You', xp: 1250, avatar_url: currentUser.value?.avatar_url || 'https://api.dicebear.com/7.x/adventurer/svg?seed=default', isMe: true },
            { id: '5', username: 'Alex Park', xp: 8760, avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex', isMe: false },
            { id: '6', username: 'Jordan Lee', xp: 7320, avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jordan', isMe: false },
            { id: '7', username: 'Taylor Swift', xp: 6890, avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Taylor', isMe: false },
            { id: '8', username: 'Chris Brown', xp: 5420, avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Chris', isMe: false }
        ].sort((a, b) => b.xp - a.xp)

        leaderboard.value = demoPlayers
    }

    return {
        leaderboard,
        isLoading,
        fetchLeaderboard,
        generateDemoLeaderboard
    }
}
