// 'use client'

// import { useUser } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { collection, doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { useRouter } from "next/navigation";
// import { CardActionArea, CardContent, Typography, Container, Grid, Card } from "@mui/material";

// export default function Flashcards() {
//     const { isLoaded, isSignedIn, user } = useUser();
//     const [flashcards, setFlashcards] = useState([]);
//     const router = useRouter();

//     useEffect(() => {
//         async function getFlashcards() {
//             if (!user) return;
//             const docRef = doc(collection(db, 'users'), user.id);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 const collections = docSnap.data().flashcards || [];
//                 console.log(collections);
//                 setFlashcards(collections);
//             } else {
//                 await setDoc(docRef, { flashcards: [] });
//             }
//         }
//         getFlashcards();
//     }, [user]);

//     if (!isLoaded || !isSignedIn) {
//         return <></>;
//     }

//     const handleCardClick = (id) => {
//         router.push(`/flashcard?id=${id}`);
//     };

//     return (
//         <Container maxWidth="100vw" sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
//             <Grid container spacing={3} sx={{ mt: 4 }}>
//                 {flashcards.map((flashcard, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card 
//                             sx={{
//                                 backgroundColor: '#333333',
//                                 color: '#ffffff',
//                                 '&:hover': {
//                                     backgroundColor: '#444444',
//                                 }
//                             }}
//                         >
//                             <CardActionArea 
//                                 onClick={() => {
//                                     handleCardClick(flashcard.name);
//                                 }}
//                             >
//                                 <CardContent>
//                                     <Typography variant="h6">{flashcard.name}</Typography>
//                                 </CardContent>
//                             </CardActionArea>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// }




// 'use client';

// import { useUser } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import { collection, doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { useRouter } from "next/navigation";
// import { AppBar, Toolbar, Typography, Button, CardActionArea, CardContent, Container, Grid, Card } from "@mui/material";

// export default function Flashcards() {
//     const { isLoaded, isSignedIn, user } = useUser();
//     const [flashcards, setFlashcards] = useState([]);
//     const router = useRouter();

//     useEffect(() => {
//         async function getFlashcards() {
//             if (!user) return;
//             const docRef = doc(collection(db, 'users'), user.id);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 const collections = docSnap.data().flashcards || [];
//                 setFlashcards(collections);
//             } else {
//                 await setDoc(docRef, { flashcards: [] });
//             }
//         }
//         getFlashcards();
//     }, [user]);

//     if (!isLoaded || !isSignedIn) {
//         return <></>;
//     }

//     const handleCardClick = (id) => {
//         router.push(`/flashcard?id=${id}`);
//     };

//     const redirectToHome = () => {
//         router.push('/');
//     };

//     const redirectToSavedFlashcards = () => {
//         router.push('/flashcards');
//     };

//     return (
//         <Container maxWidth="100vw" sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
//             <AppBar position="static" sx={{ backgroundColor: '#121212' }}>
//                 <Toolbar>
//                     <Typography variant="h6" style={{ flexGrow: 1, cursor: 'pointer' }} onClick={redirectToHome}>
//                         Flashcard Pro
//                     </Typography>
//                     {isSignedIn && (
//                         <Button color="inherit" sx={{ color: '#ffffff' }} onClick={redirectToSavedFlashcards}>
//                             View Flashcards
//                         </Button>
//                     )}
//                 </Toolbar>
//             </AppBar>

//             <Grid container spacing={3} sx={{ mt: 4 }}>
//                 {flashcards.map((flashcard, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card 
//                             sx={{
//                                 backgroundColor: '#333333',
//                                 color: '#ffffff',
//                                 '&:hover': {
//                                     backgroundColor: '#444444',
//                                 }
//                             }}
//                         >
//                             <CardActionArea 
//                                 onClick={() => {
//                                     handleCardClick(flashcard.name);
//                                 }}
//                             >
//                                 <CardContent>
//                                     <Typography variant="h6">{flashcard.name}</Typography>
//                                 </CardContent>
//                             </CardActionArea>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// }


'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { AppBar, Card, Toolbar, CardActionArea, CardContent, Typography, Container, Grid, Button } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return;
            const docRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                setFlashcards(collections);
            } else {
                await setDoc(docRef, { flashcards: [] });
            }
        }
        getFlashcards();
    }, [user]);

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    };

    const handleRedirect = () => {
        router.push('/');
    };

    const handleViewFlashcards = () => {
        router.push('/flashcards');
    };

    return (
        <Container maxWidth="100vw" sx={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
            <AppBar position="static" sx={{ backgroundColor: '#121212', color: '#ffffff' }}>
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
                            <CardActionArea 
                                onClick={() => {
                                    handleCardClick(flashcard.name);
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6">{flashcard.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
