// 'use client'

// import { useUser } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
// import { db } from "@/firebase";
// import { CardActionArea, Button, Card, Box, Grid, CardContent, Container, Typography, AppBar, Toolbar } from "@mui/material";
// import { useSearchParams } from "next/navigation";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// export default function Flashcard() {
//     const { isLoaded, isSignedIn, user } = useUser();
//     const [flashcards, setFlashcards] = useState([]);
//     const [flipped, setFlipped] = useState([]);
//     const searchParams = useSearchParams();
//     const search = searchParams.get('id');

//     useEffect(() => {
//         async function getFlashcard() {
//             if (!search || !user) return;
//             const colRef = collection(doc(collection(db, 'users'), user.id), search);
//             const docs = await getDocs(colRef);
//             const flashcards = [];

//             docs.forEach((doc) => {
//                 flashcards.push({ id: doc.id, ...doc.data() });
//             });
//             setFlashcards(flashcards);
//         }
//         getFlashcard();
//     }, [user, search]);

//     const handleCardClick = (id) => {
//         setFlipped((prev) => ({
//             ...prev,
//             [id]: !prev[id],
//         }));
//     };

//     if (!isLoaded || !isSignedIn) {
//         return <></>;
//     }

//     return (
//         <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
//             <AppBar position="static" sx={{ backgroundColor: '#121212', padding: 1 }}>
//                 <Toolbar>
//                     <Typography variant="h6" style={{ flexGrow: 1 }}>
//                         Flashcard Pro
//                     </Typography>
//                     <SignedOut>
//                         <Button color="inherit" href="/sign-in">
//                             Login
//                         </Button>
//                         <Button color="inherit" href="/sign-up">
//                             Sign Up
//                         </Button>
//                     </SignedOut>
//                     <SignedIn>
//                         <UserButton />
//                     </SignedIn>
//                 </Toolbar>
//             </AppBar>
            
//             <Container maxWidth="100vw">
//                 <Grid container spacing={3} sx={{ mt: 4 }}>
//                     {flashcards.map((flashcard, index) => (
//                         <Grid item xs={12} sm={6} md={4} key={index}>
//                             <Card 
//                                 sx={{
//                                     backgroundColor: '#333333',
//                                     color: '#ffffff',
//                                     '&:hover': {
//                                         backgroundColor: '#444444',
//                                     }
//                                 }}
//                             >
//                                 <CardActionArea onClick={() => handleCardClick(index)}>
//                                     <CardContent>
//                                         <Box 
//                                             sx={{
//                                                 perspective: '1000px',
//                                                 '& > div': {
//                                                     transition: 'transform 0.6s',
//                                                     transformStyle: 'preserve-3d',
//                                                     position: 'relative',
//                                                     width: '100%',
//                                                     height: '200px',
//                                                     boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                                                     transform: flipped[index]
//                                                         ? 'rotateY(180deg)'
//                                                         : 'rotateY(0deg)',
//                                                 },
//                                                 '& > div > div': {
//                                                     position: 'absolute',
//                                                     width: '100%',
//                                                     height: '100%',
//                                                     backfaceVisibility: 'hidden',
//                                                     display: 'flex',
//                                                     justifyContent: 'center',
//                                                     alignItems: 'center',
//                                                     padding: 2,
//                                                     boxSizing: 'border-box',
//                                                 },
//                                                 '& > div > div:nth-of-type(2)': {
//                                                     transform: 'rotateY(180deg)',
//                                                 },
//                                             }}   
//                                         >
//                                             <div>
//                                                 <div>
//                                                     <Typography variant="h5" component="div">
//                                                         {flashcard.front}
//                                                     </Typography>
//                                                 </div>
//                                                 <div>
//                                                     <Typography variant="h5" component="div">
//                                                         {flashcard.back}
//                                                     </Typography>
//                                                 </div>
//                                             </div>
//                                         </Box>
//                                     </CardContent>
//                                 </CardActionArea>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Container>
//         </Box>
//     );
// }



'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { CardActionArea, Button, Card, Box, Grid, CardContent, Container, Typography, AppBar, Toolbar } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const searchParams = useSearchParams();
    const search = searchParams.get('id');
    const router = useRouter();

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return;
            const colRef = collection(doc(collection(db, 'users'), user.id), search);
            const docs = await getDocs(colRef);
            const flashcards = [];

            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() });
            });
            setFlashcards(flashcards);
        }
        getFlashcard();
    }, [user, search]);

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleRedirect = () => {
        router.push('/');
    };

    const handleViewFlashcards = () => {
        router.push('/flashcards');
    };

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

    return (
        <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
            <AppBar position="static" sx={{ backgroundColor: '#121212', padding: 1 }}>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            flexGrow: 1, 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={handleRedirect}
                    >
                        Flashcard Pro
                    </Typography>
                    <SignedIn>
                        <Button sx={{ color: '#ffffff', marginRight: '16px' }} onClick={handleViewFlashcards}>
                            View Flashcards
                        </Button>
                        <UserButton />
                    </SignedIn>
                </Toolbar>
            </AppBar>
            
            <Container maxWidth="100vw">
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card 
                                sx={{
                                    backgroundColor: '#333333',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#444444',
                                    }
                                }}
                            >
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent>
                                        <Box 
                                            sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                    transform: flipped[index]
                                                        ? 'rotateY(180deg)'
                                                        : 'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)',
                                                },
                                            }}   
                                        >
                                            <div>
                                                <div>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
