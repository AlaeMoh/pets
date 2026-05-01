import { styled } from '@mui/system';
import { Box, Container, Grid, Typography } from '@mui/material';
import Avatars from './avatar'

const FooterContainer = styled("footer")({
  backgroundColor: "#006f68", 
  color: "white",
  padding: "40px 0",
  marginTop: "auto",
  borderTop: "5px solid #ee8325", 

});

const FooterLink = styled("a")({
  color: "white",
  textDecoration: "none",
  display: "block",
  marginBottom: "10px",
  fontSize: "16px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    color: "#ee8325", 
    paddingLeft: "10px", 
  }
});

const CustomFooter = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: Brand */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight="800" gutterBottom>
              PetHoven
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Elevating the lives of pets and their humans since 2024. 
              Find your perfect companion today.
            </Typography>
            <Avatars></Avatars>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <FooterLink href='/aboutus'>About Us</FooterLink>
            <FooterLink href='/allpets'>Available Pets</FooterLink>
            <FooterLink href='/adoption'>Adoption Process</FooterLink>
            <FooterLink href='/contactus'>Contact</FooterLink>
          </Grid>

          {/* Column 3: Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">123 Paw Street, Bark City</Typography>
            <Typography variant="body2">Email: hello@pethoven.com</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              © {new Date().getFullYear()} PetHoven. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default CustomFooter;