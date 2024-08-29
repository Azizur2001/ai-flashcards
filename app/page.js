// 'use client'

// import Image from "next/image";
// import getStripe from "@/utils/get-stripe";
// import Head from "next/head";
// import { SignIn, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
// import { AppBar, Button, Container, Toolbar, Typography, Box, Grid } from "@mui/material";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();
//   const { isSignedIn } = useUser();

//   const handleGetStarted = () => {
//     if (isSignedIn) {
//       router.push('/generate'); // Redirect to the generate page if signed in
//     } else {
//       router.push('/sign-up'); // Redirect to the sign-up page if not signed in
//     }
//   };

//   const handleSubmit = async() => {
//     const checkoutSession = await fetch('/api/checkout_session', {
//       method: 'POST',
//       headers: {
//         origin: 'http://localhost:3000'
//       },
//     })

//     const checkoutSessionJson = await checkoutSession.json()

//     if (checkoutSession.statusCode === 500) {
//       console.error(checkoutSession.message)
//       return
//     }
//     const stripe = await getStripe()
//     const {error} = await stripe.redirectToCheckout({
//       sessionId: checkoutSessionJson.id,
//     })

//     if(error) {
//       console.warn(error,message)
//     }
//   }

//   return (
//     <Container 
//       maxWidth="100vw" 
//       sx={{ 
//         backgroundColor: '#121212', 
//         color: '#ffffff', 
//         minHeight: '100vh', 
//         display: 'flex', 
//         flexDirection: 'column',
//       }}>
//       <Head>
//         <title>Flashcard Pro</title>
//         <meta name="description" content="Create flashcard from your text" />
//       </Head>

//       <AppBar position="static" sx={{ backgroundColor: '#121212' }}>
//         <Toolbar>
//           <Typography variant="h6" style={{ flexGrow: 1, color: '#ffffff' }}>
//             Flashcard Pro
//           </Typography>
//           <SignedOut>
//             <Button color="inherit" href="/sign-in" sx={{ color: '#ffffff' }}>
//               {' '}
//               Login
//             </Button>
//             <Button color="inherit" href="/sign-up" sx={{ color: '#ffffff' }}>
//               {' '}
//               Sign Up
//             </Button>
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ 
//         textAlign: 'center', 
//         my: 4,
//         flexGrow: 1,
//       }}>
//         <Typography variant="h2" gutterBottom>
//           Welcome to Flashcard Pro
//         </Typography>
//         <Typography variant="h5" gutterBottom>
//           {' '}
//           The easiest way to make Flashcards from your text
//         </Typography>
//         <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#1e88e5', color: '#ffffff', '&:hover': { backgroundColor: '#1565c0' } }} onClick={handleGetStarted}>
//           Get Started
//         </Button>
//       </Box>

//       <Box sx={{ my: 6 }}>
//         <Typography variant="h4" gutterBottom textAlign='center'>
//           Features
//         </Typography>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom>
//               Easy Text Input
//             </Typography>
//             <Typography>
//               {' '}
//               Simply input your text and let our software do the rest. Creating Flashcards has never been easier!
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom>
//               Smart Flashcards
//             </Typography>
//             <Typography>
//               {' '}
//               Our AI intelligently breaks down your text into concise flashcards, perfect for studying
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom>
//               Accessible Anywhere
//             </Typography>
//             <Typography>
//               {' '}
//               Access your flashcards from any device, at any time. Study on the go with ease!
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>

//       <Box sx={{ my: 6, textAlign: 'center' }}>
//         <Typography variant="h4" gutterBottom>
//           Pricing
//         </Typography>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Box sx={{
//               p: 3,
//               border: '1px solid',
//               borderColor: '#444444',
//               borderRadius: 2,
//               backgroundColor: '#1e1e1e',
//               color: '#ffffff'
//             }}>
//               <Typography variant="h5" gutterBottom>
//                 Basic
//               </Typography>
//               <Typography variant="h6" gutterBottom>
//                 $0 / month
//               </Typography>
//               <Typography>
//                 {' '}
//                 Access to basic flashcard features and limited storage.
//               </Typography>
//               <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#1e88e5', color: '#ffffff', '&:hover': { backgroundColor: '#1565c0' } }} href='/sign-up'>
//                 Choose basic
//               </Button>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Box sx={{
//               p: 3,
//               border: '1px solid',
//               borderColor: '#444444',
//               borderRadius: 2,
//               backgroundColor: '#1e1e1e',
//               color: '#ffffff'
//             }}>
//               <Typography variant="h5" gutterBottom>
//                 Pro
//               </Typography>
//               <Typography variant="h6" gutterBottom>
//                 $10 / month
//               </Typography>
//               <Typography>
//                 {' '}
//                 Unlimited flashcards and storage with priority support.
//               </Typography>
//               <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#1e88e5', color: '#ffffff', '&:hover': { backgroundColor: '#1565c0' } }} onClick={handleSubmit}>
//                 Choose pro
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   )
// }


'use client'

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import Head from "next/head";
import { SignIn, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/generate'); // Redirect to the generate page if signed in
    } else {
      router.push('/sign-up'); // Redirect to the sign-up page if not signed in
    }
  };

  const handleSubmit = async() => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if(error) {
      console.warn(error,message)
    }
  }

  return (
    <Container 
      maxWidth="100vw" 
      sx={{ 
        backgroundColor: '#121212', 
        color: '#ffffff', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
      }}>
      <Head>
        <title>Flashcard Pro</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <AppBar position="static" sx={{ backgroundColor: '#121212' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: '#ffffff' }}>
            Flashcard Pro
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ color: '#ffffff' }}>
              {' '}
              Login
            </Button>
            <Button color="inherit" href="/sign-up" sx={{ color: '#ffffff' }}>
              {' '}
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <Button 
              color="inherit" 
              onClick={() => router.push('/flashcards')} 
              sx={{ color: '#ffffff', marginRight: 2 }}
            >
              View Flashcards
            </Button>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ 
        textAlign: 'center', 
        my: 4,
        flexGrow: 1,
      }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Flashcard Pro
        </Typography>
        <Typography variant="h5" gutterBottom>
          {' '}
          The easiest way to make Flashcards from your text
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#1e88e5', color: '#ffffff', '&:hover': { backgroundColor: '#1565c0' } }} onClick={handleGetStarted}>
          Get Started
        </Button>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom textAlign='center'>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Easy Text Input
            </Typography>
            <Typography>
              {' '}
              Simply input your text and let our software do the rest. Creating Flashcards has never been easier!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Smart Flashcards
            </Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into concise flashcards, perfect for studying
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Accessible Anywhere
            </Typography>
            <Typography>
              {' '}
              Access your flashcards from any device, at any time. Study on the go with ease!
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: '#444444',
              borderRadius: 2,
              backgroundColor: '#1e1e1e',
              color: '#ffffff'
            }}>
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                $0 / month
              </Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#1e88e5', color: '#ffffff', '&:hover': { backgroundColor: '#1565c0' } }} href='/sign-up'>
                Choose basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: '#444444',
              borderRadius: 2,
              backgroundColor: '#1e1e1e',
              color: '#ffffff'
            }}>
              <Typography variant="h5" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10 / month
              </Typography>
              <Typography>
                {' '}
                Unlimited flashcards and storage with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#1e88e5', color: '#ffffff', '&:hover': { backgroundColor: '#1565c0' } }} onClick={handleSubmit}>
                Choose pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
