export function calculateStreak(): number {
  const today = new Date().toDateString();
  const lastLogin = localStorage.getItem('lastLoginDate');
  const currentStreak = parseInt(localStorage.getItem('streakCount') || '0');

  if (lastLogin === today) {
    return currentStreak; 
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastLogin === yesterday.toDateString()) {
    const newStreak = currentStreak + 1;
    localStorage.setItem('streakCount', newStreak.toString());
    localStorage.setItem('lastLoginDate', today);
    return newStreak;
  } else {
    localStorage.setItem('streakCount', '1');
    localStorage.setItem('lastLoginDate', today);
    return 1;
  }
}