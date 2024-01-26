import { ModeToggle } from '@/components/mode-toggle';

export const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
            <h1 className="text-2xl font-bold">bl4ckswordsman</h1>
            <ModeToggle />
        </header>
    );
};