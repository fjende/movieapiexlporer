import React from 'react'
import Movie from './Movie.js'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      padding: 20,
    }
  });

const MovieList = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
                >
            { props.movies.map((movie, i) => {
                return (
                    <Grid key={movie.id} item xs={"auto"}>
                   { movie.poster_path != null ? 
                    <Movie image={movie.poster_path} movieId={movie.id} title={movie.title} viewDetails={props.viewMovieDetails}/>
                    : null
                   }
                    </Grid>
                )
            })}
            </Grid>
        </div>
    )

} 
export default MovieList;