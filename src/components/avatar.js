import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AVA1 from '../assets/ava1.jpg'
import AVA2 from '../assets/ava2.jpg'
import AVA3 from '../assets/ava3.jpg'


export default function ImageAvatars() {
  return (
    <Stack direction="row" spacing={2} sx={{marginTop:4}}>
      <Avatar alt="Remy Sharp" src={AVA1} />
      <Avatar alt="Travis Howard" src={AVA2} />
      <Avatar alt="Cindy Baker" src={AVA3} />
    </Stack>
  );
}