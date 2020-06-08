import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    root: {
      maxWidth: 205,
    },
    media: {
      height: 278,
    },
  });

const Movie = (props) => {

    const classes = useStyles();

    return (
        props.image == null ?  
        <Card className={classes.root}>
        <CardActionArea>
        <CardMedia
        className={classes.media}
        image={`https://www.cro-kultura.com/wp-content/themes/oria/images/placeholder.png`}
        />
        </CardActionArea>
        <CardActions>
        <Button size="small">
         {props.title}
        </Button>
      </CardActions>
        </Card>  :    
        <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
            className={classes.media}
            image={`http://image.tmdb.org/t/p/w185_and_h278_bestv2${props.image}`}
            />
        </CardActionArea>
        <CardActions>
        <Button size="small" onClick={() => props.viewDetails(props.movieId)}>
         {props.title}
        </Button>
      </CardActions>
        </Card>
    )
}

export default Movie;