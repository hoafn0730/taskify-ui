import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export function SearchNotFound({ query, sx, ...other }) {
    const { t } = useTranslation('header');
    if (!query) {
        return (
            <Typography variant="body2" sx={sx}>
                {t('header.search.enterKeywords')}
            </Typography>
        );
    }

    return (
        <Box sx={{ textAlign: 'center', borderRadius: 1.5, ...sx }} {...other}>
            <Box sx={{ mb: 1, typography: 'h6' }}>{t('header.search.notFound.title')}</Box>

            <Typography variant="body2">
                {t('header.search.notFound.noResults')} <strong>&quot;{query}&quot;</strong>.
                <br />
                {t('header.search.notFound.suggestions')}
            </Typography>
        </Box>
    );
}
