import { useTheme } from 'next-themes';

export const useCurrentTheme = (): 'dark' | 'light' | undefined => {
    const { theme, systemTheme } = useTheme();
    if (theme === 'system') {
        return systemTheme === 'dark' ? 'dark' : 'light';
    }
    return theme === 'dark' ? 'dark' : 'light';
};