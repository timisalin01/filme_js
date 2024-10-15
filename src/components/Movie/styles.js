import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Lățime completă pe mobil
      textAlign: 'center', // Centrează textul pe mobil
    },
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    width: '100%', // Asigură că elementul ocupă întreaga lățime pe mobil
    '&:hover': {
      cursor: 'pointer',
    },
  },
  images: {
    borderRadius: '20px',
    height: '300px',
    marginBottom: '10px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '230px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '10px',
    marginBottom: 0,
    textAlign: 'center', // Asigură că textul este centrat
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Pe mobil, ocupă lățimea completă
      textAlign: 'center', // Centrează textul pe mobil
    },
  },
  rating: {
    display: 'flex',
    justifyContent: 'center', // Centrează stelele
    marginTop: '10px',
  },
}));
