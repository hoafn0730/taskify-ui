import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import Logo from '~/components/Logo';

function NotFound() {
    return (
        <>
            <Logo sx={{ position: 'fixed', top: 20, left: 20 }} />

            <Container
                sx={{
                    py: 10,
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h3" sx={{ mb: 2 }}>
                    Sorry, page not found!
                </Typography>

                <Typography sx={{ color: 'text.secondary', maxWidth: 480, textAlign: 'center' }}>
                    Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to
                    check your spelling.
                </Typography>

                <Box
                    component="img"
                    src="/illustrations/illustration-404.svg"
                    sx={{
                        width: 320,
                        height: 'auto',
                        my: { xs: 5, sm: 10 },
                    }}
                />

                <Button component={Link} href="/" size="large" variant="contained" color="inherit">
                    Go to home
                </Button>
            </Container>
        </>
    );
}

export default NotFound;
