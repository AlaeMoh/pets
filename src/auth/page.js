import React from 'react';
import { auth } from '../firebase'; 
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Button,

} from "@mui/material";
function SignInButton() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <Button onClick={signInWithGoogle} 
             variant="contained"
          type="submit"
          fullWidth  
        sx={{
            backgroundColor: "#006f68",
            mt: 2,
            py: 1.2,
            fontSize: "16px",
            textAlign:"center",
            "&:hover": {
            backgroundColor: "#01867d"
            }
          }}><GoogleIcon sx={{mx:2}}></GoogleIcon>  Sign in with Google</Button>
  );
}

export default SignInButton;
