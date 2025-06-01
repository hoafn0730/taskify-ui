import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from '~/routes/hooks';
import { fetchBoardDetail } from '~/store/actions/kanbanAction';

export function useGetBoard() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { activeBoard: board, isLoading, isError } = useSelector((state) => state.kanban);

    useEffect(() => {
        dispatch(fetchBoardDetail(slug));
    }, [dispatch, slug]);

    const memoizedValue = useMemo(() => {
        const columns = board?.columns ?? [];

        return {
            board: board,
            boardLoading: isLoading,
            boardError: isError,
            boardValidating: false, // isValidating,
            boardEmpty: !isLoading && !columns.length,
        };
    }, [board, isError, isLoading]);

    return memoizedValue;
}
