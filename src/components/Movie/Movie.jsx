import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Movie = ({ movie, i }) => {
  const classes = useStyles();

  // Obține rating-ul rotunjit la o zecimală
  const roundedRating = (Math.round(movie.vote_average * 10) / 10).toFixed(1);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 300}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          <img
            alt={movie.title}
            className={classes.images}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://www.fillmurray.com/200/300'
            }
          />
        </Link>
      </Grow>
      <Typography className={classes.title} variant="h5">
        {movie.title}
      </Typography>
      <Tooltip
        disableTouchListener
        title={`${roundedRating} / 10`} // Folosim rating-ul rotunjit
      >
        <div className={classes.rating}>
          <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
        </div>
      </Tooltip>
    </Grid>
  );
};

export default Movie;
