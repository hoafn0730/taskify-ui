import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { SearchNotFound } from '~/components/search-not-found';

// ----------------------------------------------------------------------

export function ChatNavSearchResults({ query, results, onClickResult }) {
    console.log('🚀 ~ ChatNavSearchResults ~ results:', results);
    const totalResults = results.length;

    const notFound = !totalResults && !!query;

    const renderNotFound = (
        <SearchNotFound
            query={query}
            sx={{
                p: 3,
                mx: 'auto',
                width: `calc(100% - 40px)`,
                bgcolor: 'background.neutral',
            }}
        />
    );

    const renderResults = (
        <nav>
            <Box component="ul">
                {results.map((result) => (
                    <Box key={result.id} component="li" sx={{ display: 'flex' }}>
                        <ListItemButton
                            onClick={() => onClickResult(result)}
                            sx={{ gap: 2, py: 1.5, px: 2.5, typography: 'subtitle2' }}
                        >
                            <Avatar alt={result.displayName} src={result.avatar} />
                            {result.displayName}
                        </ListItemButton>
                    </Box>
                ))}
            </Box>
        </nav>
    );

    return (
        <>
            <Typography variant="h6" sx={{ px: 2.5, mb: 2 }}>
                Contacts ({totalResults})
            </Typography>

            {notFound ? renderNotFound : renderResults}
        </>
    );
}
