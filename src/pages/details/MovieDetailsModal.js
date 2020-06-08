import React, {useEffect} from 'react'
import { Dialog, DialogContent} from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const MovieDetailsModal = ({ movieId, open, onClose, ...rest }) => {

    const [movieDetails, setMovieDetails] = React.useState([]);

    const API_KEY = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        getMovieDetails()
    }, [movieId]);

    const getMovieDetails= async () => {
        axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
        .then((response) => setMovieDetails(response.data))
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle id="form-dialog-title">
                {movieDetails.title}
            </DialogTitle>
            <DialogContent dividers>
                    {movieDetails.overview}
            </DialogContent>
            <DialogContent dividers>
                <b>Average Rating: </b>{movieDetails.vote_average}
             </DialogContent>
             <DialogContent dividers>
                <b>Release Date: </b> {movieDetails.release_date}
            </DialogContent>
            <DialogContent dividers>
                <b>Runtime: </b> {movieDetails.runtime} min
            </DialogContent>
        </Dialog>
    )
} 

export default MovieDetailsModal;