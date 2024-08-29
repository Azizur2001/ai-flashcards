// 'use client'

// import { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { AppBar, Toolbar, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
// import { writeBatch } from "firebase/firestore";
// import { Box, Paper, Button, Grid, Card } from "@mui/material";
// import { doc, collection, setDoc, getDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

// export default function Generate() {
//     const { isLoaded, isSignedIn, user } = useUser();
//     const [flashcards, setFlashcards] = useState([]);
//     const [flipped, setFlipped] = useState([]);
//     const [text, setText] = useState('');
//     const [name, setName] = useState('');
//     const [open, setOpen] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         if (isLoaded && !isSignedIn) {
//             router.push("/sign-in"); // Redirect to the sign-in page if not signed in
//         }
//     }, [isLoaded, isSignedIn, router]);

//     const handleSubmit = async () => {
//         fetch('api/generate', {
//             method: 'POST',
//             body: text,
//         })
//         .then((res) => res.json())
//         .then((data) => setFlashcards(data));
//     };

//     const handleCardClick = (id) => {
//         setFlipped((prev) => ({
//             ...prev,
//             [id]: !prev[id],
//         }));
//     };

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const saveFlashcards = async () => {
//         if (!name) {
//             alert('Please enter a name');
//             return;
//         }

//         const batch = writeBatch(db);
//         const userDocRef = doc(collection(db, 'users'), user.id);
//         const docSnap = await getDoc(userDocRef);

//         if (docSnap.exists()) {
//             const collections = docSnap.data().flashcards || [];
//             if (collections.find((f) => f.name === name)) {
//                 alert('Flashcard collection with the same name already exists.');
//                 return;
//             } else {
//                 collections.push({ name });
//                 batch.set(userDocRef, { flashcards: collections }, { merge: true });
//             }
//         } else {
//             batch.set(userDocRef, { flashcards: [{ name }] });
//         }

//         const colRef = collection(userDocRef, name);
//         flashcards.forEach((flashcard) => {
//             const cardDocRef = doc(colRef);
//             batch.set(cardDocRef, flashcard);
//         });

//         await batch.commit();
//         handleClose();
//         router.push('/flashcards');
//     };

//     return (
//         <Container 
//             maxWidth="100vw" 
//             sx={{ 
//                 backgroundColor: '#121212', 
//                 color: '#ffffff', 
//                 minHeight: '100vh', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//             }}
//         >
//             {/* Navbar Section */}
//             <AppBar 
//                 position="static"
//                 sx={{
//                     height: '64px', // Ensure consistent height for the navbar
//                     justifyContent: 'center', // Center content vertically
//                     padding: '0 16px', // Adjust padding if needed
//                     backgroundColor: "#121212"
//                 }}
//             >
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
//             {/* End of Navbar Section */}

//             <Box 
//                 sx={{
//                     mt: 4, 
//                     mb: 6, 
//                     display: 'flex', 
//                     flexDirection: 'column', 
//                     alignItems: 'center',
//                 }}
//             >
//                 <Typography variant="h4" gutterBottom>Generate Flashcards</Typography>

//                 <Paper 
//                     sx={{ 
//                         p: 4, 
//                         width: '35%', 
//                         backgroundColor: '#1e1e1e', 
//                         color: '#ffffff',
//                         display: 'flex', 
//                         flexDirection: 'column',
//                         alignItems: 'center', // Center content horizontally
//                         '@media (max-width: 600px)': {
//                             width: '90%', // Adjust the width to fit better on smaller screens
//                             padding: '16px', // Adjust padding for smaller screens
//                         },
//                     }}
//                 >
//                     <TextField 
//                         value={text} 
//                         onChange={(e) => setText(e.target.value)}
//                         label="Enter text"
//                         fullWidth
//                         multiline
//                         rows={4}
//                         variant="outlined"
//                         sx={{
//                             mb: 2,
//                             width: '100%', // Ensure full width for consistency
//                             maxWidth: '600px', // Set a max-width to control size
//                             backgroundColor: '#333333', 
//                             color: '#ffffff'
//                         }}
//                         InputLabelProps={{
//                             style: { color: '#ffffff' }
//                         }}
//                         InputProps={{
//                             style: { color: '#ffffff' }
//                         }}
//                     />
//                     <Button
//                         variant="contained" 
//                         color="primary" 
//                         onClick={handleSubmit}
//                         sx={{
//                             maxWidth: '100px',
//                             alignSelf: 'center', // Center the button within the flex container
//                         }}
//                     >
//                         Submit
//                     </Button>
//                 </Paper>
//             </Box>
//             {flashcards.length > 0 && (
//                 <Box sx={{ mt: 4 }}>
//                     <Typography variant="h5" gutterBottom textAlign='center' padding='10px'>Flashcards Preview</Typography>
//                     <Container maxWidth="100vw">
//                         <Grid container spacing={3}>
//                             {flashcards.map((flashcard, index) => (
//                                 <Grid item xs={12} sm={6} md={4} key={index}>
//                                     <Card sx={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
//                                         <CardActionArea onClick={() => handleCardClick(index)}>
//                                             <CardContent>
//                                                 <Box 
//                                                     sx={{
//                                                         perspective: '1000px',
//                                                         '& > div': {
//                                                             transition: 'transform 0.6s',
//                                                             transformStyle: 'preserve-3d',
//                                                             position: 'relative',
//                                                             width: '100%',
//                                                             height: '200px',
//                                                             boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                                                             transform: flipped[index]
//                                                                 ? 'rotateY(180deg)'
//                                                                 : 'rotateY(0deg)',
//                                                         },
//                                                         '& > div > div': {
//                                                             position: 'absolute',
//                                                             width: '100%',
//                                                             height: '100%',
//                                                             backfaceVisibility: 'hidden',
//                                                             display: 'flex',
//                                                             justifyContent: 'center',
//                                                             alignItems: 'center',
//                                                             padding: 2,
//                                                             boxSizing: 'border-box',
//                                                         },
//                                                         '& > div > div:nth-of-type(2)':{
//                                                             transform: 'rotateY(180deg)',
//                                                         },
//                                                     }}   
//                                                 >
//                                                     <div>
//                                                         <div>
//                                                             <Typography 
//                                                                 variant="h5" 
//                                                                 component="div"
//                                                             >
//                                                                 {flashcard.front}
//                                                             </Typography>
//                                                         </div>
//                                                         <div>
//                                                             <Typography 
//                                                                 variant="h5" 
//                                                                 component="div"
//                                                             >
//                                                                 {flashcard.back}
//                                                             </Typography>
//                                                         </div>
//                                                     </div>
//                                                 </Box>
//                                             </CardContent>
//                                         </CardActionArea>
//                                     </Card>
//                                 </Grid>
//                             ))}
//                         </Grid>
//                     </Container>

//                     <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//                         <Button variant='contained' color='secondary' onClick={handleOpen}>
//                             Save
//                         </Button>
//                     </Box>
//                 </Box>
//             )}

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle sx={{ backgroundColor: '#121212', color: '#ffffff' }}>
//                     Save Flashcards
//                 </DialogTitle>
//                 <DialogContent sx={{ backgroundColor: '#121212', color: '#ffffff' }}>
//                     <DialogContentText sx={{ color: '#ffffff' }}>
//                         Please enter a name for your flashcards collection.
//                     </DialogContentText>
//                     <TextField
//                         autoFocus 
//                         margin="dense" 
//                         label="Collection Name" 
//                         type="text" 
//                         fullWidth 
//                         value={name} 
//                         onChange={(e)=> setName(e.target.value)}
//                         variant="outlined"
//                         sx={{
//                             backgroundColor: '#333333', 
//                             color: '#ffffff',
//                             '& .MuiInputLabel-root': { color: '#ffffff' },  // Label color
//                             '& .MuiOutlinedInput-root': {
//                                 '& fieldset': {
//                                     borderColor: '#555555',
//                                 },
//                                 '&:hover fieldset': {
//                                     borderColor: '#ffffff',
//                                 },
//                                 '&.Mui-focused fieldset': {
//                                     borderColor: '#ffffff',
//                                 },
//                             },
//                         }}
//                         InputLabelProps={{
//                             style: { color: '#ffffff' }
//                         }}
//                         InputProps={{
//                             style: { color: '#ffffff' }
//                         }}
//                     />
//                 </DialogContent>
//                 <DialogActions sx={{ backgroundColor: '#121212' }}>
//                     <Button onClick={handleClose} sx={{ color: '#90caf9' }}>Cancel</Button>
//                     <Button onClick={saveFlashcards} sx={{ color: '#90caf9' }}>Save</Button>
//                 </DialogActions>
//             </Dialog>
//             </Container>
//                 );
//             }



// 'use client'

// import { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { AppBar, Toolbar, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, ButtonBase, Box } from "@mui/material";
// import { writeBatch } from "firebase/firestore";
// import { Paper, Button, Grid, Card } from "@mui/material";
// import { doc, collection, setDoc, getDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

// export default function Generate() {
//     const { isLoaded, isSignedIn, user } = useUser();
//     const [flashcards, setFlashcards] = useState([]);
//     const [flipped, setFlipped] = useState([]);
//     const [text, setText] = useState('');
//     const [name, setName] = useState('');
//     const [open, setOpen] = useState(false);
//     const router = useRouter();

//     useEffect(() => {
//         if (isLoaded && !isSignedIn) {
//             router.push("/sign-in"); // Redirect to the sign-in page if not signed in
//         }
//     }, [isLoaded, isSignedIn, router]);

//     const handleSubmit = async () => {
//         fetch('api/generate', {
//             method: 'POST',
//             body: text,
//         })
//         .then((res) => res.json())
//         .then((data) => setFlashcards(data));
//     };

//     const handleCardClick = (id) => {
//         setFlipped((prev) => ({
//             ...prev,
//             [id]: !prev[id],
//         }));
//     };

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const saveFlashcards = async () => {
//         if (!name) {
//             alert('Please enter a name');
//             return;
//         }

//         const batch = writeBatch(db);
//         const userDocRef = doc(collection(db, 'users'), user.id);
//         const docSnap = await getDoc(userDocRef);

//         if (docSnap.exists()) {
//             const collections = docSnap.data().flashcards || [];
//             if (collections.find((f) => f.name === name)) {
//                 alert('Flashcard collection with the same name already exists.');
//                 return;
//             } else {
//                 collections.push({ name });
//                 batch.set(userDocRef, { flashcards: collections }, { merge: true });
//             }
//         } else {
//             batch.set(userDocRef, { flashcards: [{ name }] });
//         }

//         const colRef = collection(userDocRef, name);
//         flashcards.forEach((flashcard) => {
//             const cardDocRef = doc(colRef);
//             batch.set(cardDocRef, flashcard);
//         });

//         await batch.commit();
//         handleClose();
//         router.push('/flashcards');
//     };

//     return (
//         <Container 
//             maxWidth="100vw" 
//             sx={{ 
//                 backgroundColor: '#121212', 
//                 color: '#ffffff', 
//                 minHeight: '100vh', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//             }}
//         >
//             {/* Navbar Section */}
//             <AppBar 
//                 position="static"
//                 sx={{
//                     height: '64px', // Ensure consistent height for the navbar
//                     justifyContent: 'center', // Center content vertically
//                     padding: '0 16px', // Adjust padding if needed
//                     backgroundColor: "#121212"
//                 }}
//             >
//                 <Toolbar>
//                     <Box 
//                         sx={{ 
//                             display: 'flex', 
//                             alignItems: 'center', 
//                             flexGrow: 1 
//                         }}
//                     >
//                         <ButtonBase onClick={() => router.push('/')}>
//                             <Typography variant="h6" style={{ color: '#ffffff' }}>
//                                 Flashcard Pro
//                             </Typography>
//                         </ButtonBase>
//                     </Box>
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
//             {/* End of Navbar Section */}

//             <Box 
//                 sx={{
//                     mt: 4, 
//                     mb: 6, 
//                     display: 'flex', 
//                     flexDirection: 'column', 
//                     alignItems: 'center',
//                 }}
//             >
//                 <Typography variant="h4" gutterBottom>Generate Flashcards</Typography>

//                 <Paper 
//                     sx={{ 
//                         p: 4, 
//                         width: '35%', 
//                         backgroundColor: '#1e1e1e', 
//                         color: '#ffffff',
//                         display: 'flex', 
//                         flexDirection: 'column',
//                         alignItems: 'center', // Center content horizontally
//                         '@media (max-width: 600px)': {
//                             width: '90%', // Adjust the width to fit better on smaller screens
//                             padding: '16px', // Adjust padding for smaller screens
//                         },
//                     }}
//                 >
//                     <TextField 
//                         value={text} 
//                         onChange={(e) => setText(e.target.value)}
//                         label="Enter text"
//                         fullWidth
//                         multiline
//                         rows={4}
//                         variant="outlined"
//                         sx={{
//                             mb: 2,
//                             width: '100%', // Ensure full width for consistency
//                             maxWidth: '600px', // Set a max-width to control size
//                             backgroundColor: '#333333', 
//                             color: '#ffffff'
//                         }}
//                         InputLabelProps={{
//                             style: { color: '#ffffff' }
//                         }}
//                         InputProps={{
//                             style: { color: '#ffffff' }
//                         }}
//                     />
//                     <Button
//                         variant="contained" 
//                         color="primary" 
//                         onClick={handleSubmit}
//                         sx={{
//                             maxWidth: '100px',
//                             alignSelf: 'center', // Center the button within the flex container
//                         }}
//                     >
//                         Submit
//                     </Button>
//                 </Paper>
//             </Box>
//             {flashcards.length > 0 && (
//                 <Box sx={{ mt: 4 }}>
//                     <Typography variant="h5" gutterBottom textAlign='center' padding='10px'>Flashcards Preview</Typography>
//                     <Container maxWidth="100vw">
//                         <Grid container spacing={3}>
//                             {flashcards.map((flashcard, index) => (
//                                 <Grid item xs={12} sm={6} md={4} key={index}>
//                                     <Card sx={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
//                                         <CardActionArea onClick={() => handleCardClick(index)}>
//                                             <CardContent>
//                                                 <Box 
//                                                     sx={{
//                                                         perspective: '1000px',
//                                                         '& > div': {
//                                                             transition: 'transform 0.6s',
//                                                             transformStyle: 'preserve-3d',
//                                                             position: 'relative',
//                                                             width: '100%',
//                                                             height: '200px',
//                                                             boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
//                                                             transform: flipped[index]
//                                                                 ? 'rotateY(180deg)'
//                                                                 : 'rotateY(0deg)',
//                                                         },
//                                                         '& > div > div': {
//                                                             position: 'absolute',
//                                                             width: '100%',
//                                                             height: '100%',
//                                                             backfaceVisibility: 'hidden',
//                                                             display: 'flex',
//                                                             justifyContent: 'center',
//                                                             alignItems: 'center',
//                                                             padding: 2,
//                                                             boxSizing: 'border-box',
//                                                         },
//                                                         '& > div > div:nth-of-type(2)':{
//                                                             transform: 'rotateY(180deg)',
//                                                         },
//                                                     }}   
//                                                 >
//                                                     <div>
//                                                         <div>
//                                                             <Typography 
//                                                                 variant="h5" 
//                                                                 component="div"
//                                                             >
//                                                                 {flashcard.front}
//                                                             </Typography>
//                                                         </div>
//                                                         <div>
//                                                             <Typography 
//                                                                 variant="h5" 
//                                                                 component="div"
//                                                             >
//                                                                 {flashcard.back}
//                                                             </Typography>
//                                                         </div>
//                                                     </div>
//                                                 </Box>
//                                             </CardContent>
//                                         </CardActionArea>
//                                     </Card>
//                                 </Grid>
//                             ))}
//                         </Grid>
//                     </Container>

//                     <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//                         <Button variant='contained' color='secondary' onClick={handleOpen}>
//                             Save
//                         </Button>
//                     </Box>
//                 </Box>
//             )}

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle sx={{ backgroundColor: '#121212', color: '#ffffff' }}>
//                     Save Flashcards
//                 </DialogTitle>
//                 <DialogContent sx={{ backgroundColor: '#121212', color: '#ffffff' }}>
//                     <DialogContentText sx={{ color: '#ffffff' }}>
//                         Please enter a name for your flashcards collection.
//                     </DialogContentText>
//                     <TextField
//                         autoFocus 
//                         margin="dense" 
//                         label="Collection Name" 
//                         type="text" 
//                         fullWidth 
//                         value={name} 
//                         onChange={(e)=> setName(e.target.value)}
//                         variant="outlined"
//                         sx={{
//                             backgroundColor: '#333333', 
//                             color: '#ffffff',
//                             '& .MuiInputLabel-root': { color: '#ffffff' },  // Label color
//                             '& .MuiOutlinedInput-root': {
//                                 '& fieldset': {
//                                     borderColor: '#555555',
//                                 },
//                                 '&:hover fieldset': {
//                                     borderColor: '#ffffff',
//                                 },
//                                 '&.Mui-focused fieldset': {
//                                     borderColor: '#ffffff',
//                                 },
//                             },
//                         }}
//                         InputLabelProps={{
//                             style: { color: '#ffffff' }
//                         }}
//                         InputProps={{
//                             style: { color: '#ffffff' }
//                         }}
//                     />
//                 </DialogContent>
//                 <DialogActions sx={{ backgroundColor: '#121212' }}>
//                     <Button onClick={handleClose} sx={{ color: '#90caf9' }}>Cancel</Button>
//                     <Button onClick={saveFlashcards} sx={{ color: '#90caf9' }}>Save</Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// }


'use client'

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, ButtonBase, Box, Button } from "@mui/material";
import { writeBatch } from "firebase/firestore";
import { Paper, Grid, Card } from "@mui/material";
import { doc, collection, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/sign-in"); // Redirect to the sign-in page if not signed in
        }
    }, [isLoaded, isSignedIn, router]);

    const handleSubmit = async () => {
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
        .then((res) => res.json())
        .then((data) => setFlashcards(data));
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name');
            return;
        }

        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with the same name already exists.');
                return;
            } else {
                collections.push({ name });
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] });
        }

        const colRef = collection(userDocRef, name);
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        router.push('/flashcards');
    };

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
            {/* Navbar Section */}
            <AppBar 
                position="static"
                sx={{
                    height: '64px', // Ensure consistent height for the navbar
                    justifyContent: 'center', // Center content vertically
                    padding: '0 16px', // Adjust padding if needed
                    backgroundColor: "#121212"
                }}
            >
                <Toolbar>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            flexGrow: 1 
                        }}
                    >
                        <ButtonBase onClick={() => router.push('/')}>
                            <Typography variant="h6" style={{ color: '#ffffff' }}>
                                Flashcard Pro
                            </Typography>
                        </ButtonBase>
                    </Box>
                    <SignedIn>
                        <Button 
                            color="inherit" 
                            sx={{ color: '#ffffff', mr: 2 }} 
                            onClick={() => router.push('/flashcards')}
                        >
                            View Flashcards
                        </Button>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <Button color="inherit" href="/sign-in">
                            Login
                        </Button>
                        <Button color="inherit" href="/sign-up">
                            Sign Up
                        </Button>
                    </SignedOut>
                </Toolbar>
            </AppBar>
            {/* End of Navbar Section */}

            <Box 
                sx={{
                    mt: 4, 
                    mb: 6, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>Generate Flashcards</Typography>

                <Paper 
                    sx={{ 
                        p: 4, 
                        width: '35%', 
                        backgroundColor: '#1e1e1e', 
                        color: '#ffffff',
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center', // Center content horizontally
                        '@media (max-width: 600px)': {
                            width: '90%', // Adjust the width to fit better on smaller screens
                            padding: '16px', // Adjust padding for smaller screens
                        },
                    }}
                >
                    <TextField 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                        label="Enter text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{
                            mb: 2,
                            width: '100%', // Ensure full width for consistency
                            maxWidth: '600px', // Set a max-width to control size
                            backgroundColor: '#333333', 
                            color: '#ffffff'
                        }}
                        InputLabelProps={{
                            style: { color: '#ffffff' }
                        }}
                        InputProps={{
                            style: { color: '#ffffff' }
                        }}
                    />
                    <Button
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit}
                        sx={{
                            maxWidth: '100px',
                            alignSelf: 'center', // Center the button within the flex container
                        }}
                    >
                        Submit
                    </Button>
                </Paper>
            </Box>
            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom textAlign='center' padding='10px'>Flashcards Preview</Typography>
                    <Container maxWidth="100vw">
                        <Grid container spacing={3}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card sx={{ backgroundColor: '#1e1e1e', color: '#ffffff' }}>
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
                                                        '& > div > div:nth-of-type(2)':{
                                                            transform: 'rotateY(180deg)',
                                                        },
                                                    }}   
                                                >
                                                    <div>
                                                        <div>
                                                            <Typography 
                                                                variant="h5" 
                                                                component="div"
                                                            >
                                                                {flashcard.front}
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Typography 
                                                                variant="h5" 
                                                                component="div"
                                                            >
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

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button variant='contained' color='secondary' onClick={handleOpen}>
                            Save
                        </Button>
                    </Box>
                </Box>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ backgroundColor: '#121212', color: '#ffffff' }}>
                    Save Flashcards
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#121212', color: '#ffffff' }}>
                    <DialogContentText sx={{ color: '#ffffff' }}>
                        Please enter a name for your flashcards collection.
                    </DialogContentText>
                    <TextField
                        autoFocus 
                        margin="dense" 
                        label="Collection Name" 
                        type="text" 
                        fullWidth 
                        value={name} 
                        onChange={(e)=> setName(e.target.value)}
                        variant="outlined"
                        sx={{
                            backgroundColor: '#333333', 
                            color: '#ffffff',
                            '& .MuiInputLabel-root': { color: '#ffffff' },  // Label color
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#555555',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ffffff',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#ffffff',
                                },
                            },
                        }}
                        InputLabelProps={{
                            style: { color: '#ffffff' }
                        }}
                        InputProps={{
                            style: { color: '#ffffff' }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#121212' }}>
                    <Button onClick={handleClose} sx={{ color: '#90caf9' }}>Cancel</Button>
                    <Button onClick={saveFlashcards} sx={{ color: '#90caf9' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
