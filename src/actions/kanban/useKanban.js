import { useContext } from 'react';
import { KanbanContext } from './KanbanProvider';

export const useKanban = () => {
    const context = useContext(KanbanContext);
    if (!context) throw new Error('useKanban must be used within a KanbanProvider');
    return context;
};
