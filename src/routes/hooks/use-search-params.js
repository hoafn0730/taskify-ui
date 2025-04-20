import { useMemo } from 'react';
import { useSearchParams as _useSearchParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export function useSearchParams() {
    const [searchParams] = _useSearchParams();

    return useMemo(() => searchParams, [searchParams]);
}

// TODO: update hook useSearchParams
// export function useSearchParams() {
//     const [_searchParams, setSearchParams] = _useSearchParams();
//
//     const memoizedSearchParams = useMemo(() => Object.fromEntries([..._searchParams]), [_searchParams]);
//
//     const setQueryParam = useCallback(
//         (key, value) => {
//             setSearchParams((prev) => {
//                 const newParams = new URLSearchParams(prev);
//                 if (value === null || value === undefined) {
//                     newParams.delete(key);
//                 } else {
//                     newParams.set(key, value);
//                 }
//                 return newParams;
//             });
//         },
//         [setSearchParams],
//     );
//
//     return { searchParams: memoizedSearchParams, setSearchParams, setQueryParam };
// }
