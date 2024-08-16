import { Button, Container, Toolbar, Typography, AppBar, Link, Box } from "@mui/material";
import { SignIn, SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <Container 
            maxWidth="100vw" 
            sx={{ 
                backgroundColor: '#121212', 
                color: '#ffffff', 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
            }}
        >
            <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        sx={{
                            flexGrow: 1,
                            color: '#ffffff',
                        }}
                    >
                        Flashcard Pro
                    </Typography>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref sx={{ color: '#ffffff' }}>
                            Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref sx={{ color: '#ffffff' }}>
                            Sign Up
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
                display="flex" 
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ 
                    flexGrow: 1,
                    mt: 4,
                    color: '#ffffff',
                }}
            >
                <Typography variant="h4" gutterBottom>Sign Up</Typography>
                <SignUp />
            </Box>
        </Container>
    )
}
