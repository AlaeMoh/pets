import * as React from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';
import PetsIcon from '@mui/icons-material/Pets';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';import { useNavigate } from 'react-router-dom';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import { useLanguage } from "../context/LanguageContext";
import HomeIcon from '@mui/icons-material/Home';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch
} from "@mui/material";



export default function TemporaryDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();

  const handleChange = (event) => {
    setLang(event.target.checked ? "ar" : "en");
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
      <List>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/allPets")}>
            <ListItemIcon>
              <PetsIcon />
            </ListItemIcon>
            <ListItemText>All Pets</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/health")}>
            <ListItemIcon>
              <PsychologyAltIcon />
            </ListItemIcon>
            <ListItemText>Fun facts</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/contactus")}>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText>Contact Us</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/breeds")}>
            <ListItemIcon>
              <SnippetFolderIcon />
            </ListItemIcon>
            <ListItemText>Breeds</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/aboutus")}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText>{t("about")}</ListItemText>
          </ListItemButton>
        </ListItem>

        {/* ✅ Language Switch */}
        <ListItem>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={lang === "ar"}
                  onChange={handleChange}
                  onClick={(e) => e.stopPropagation()} // 👈 prevents drawer from closing
                />
              }
              label={lang === "ar" ? "AR" : "EN"}
            />
          </FormGroup>
        </ListItem>

      </List>

      <Divider />
    </Box>
  );

  return (
    <Drawer open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
}