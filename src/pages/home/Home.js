import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './Filter.js'
import MovieList from './MovieList.js'
import Pagination from './Pagination.js'
import Grid from "@material-ui/core/Grid";
import MovieDetailsModal from  '../details/MovieDetailsModal'


const Home = () => {

    const API_KEY = process.env.REACT_APP_API_KEY;

    const [searchResults, setSearchResults] = React.useState([]);
    const [totalResults, setTotalResults] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchValue, setSearchValue] = React.useState('')
    const [movieId, setMovieId] = React.useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getTopMovies()
    }, []);

    const getTopMovies = async () => {
        axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&vote_count.gte=5000&page=1&sort_by=popularity.desc`)
        .then((response) => {
            setSearchResults(response.data.results);
            setTotalResults(20) })
    }

    const searchByTitle = async (searchValueInput) => {
        setSearchValue(searchValueInput);
        if (searchValueInput === ('') ) { 
            setSearchResults([]); 
            setTotalResults(0); } 
        else {
        axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchValueInput}`)
        .then((response) => {
            setSearchResults(response.data.results);
            setTotalResults(response.data.total_results) })
        }
    }

    const searchByYear = async (searchValueInput) => {
        setSearchValue(searchValueInput);
        if (searchValueInput === ('') ) { 
            setSearchResults([]); 
            setTotalResults(0); } 
        else {
        axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_year=${searchValueInput}&vote_count.gte=500`)
        .then((response) => {
            setSearchResults(response.data.results);
            setTotalResults(response.data.total_results) })
        }
    }
    
    const searchByRating = async (searchValueInput) => {
        setSearchValue(searchValueInput);
        if (searchValueInput === ('') ) { 
            setSearchResults([]); 
            setTotalResults(0); } 
        else {
        axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&vote_average.gte=${searchValueInput}&vote_count.gte=5000&sort_by=original_title.asc`)
        .then((response) => {
            setSearchResults(response.data.results);
            setTotalResults(response.data.total_results) })
        }
    }

    const searchByCrew = async (searchValueInput) => {
        setSearchValue(searchValueInput);
        if (searchValueInput === ('') ) { 
            setSearchResults([]); 
            setTotalResults(0); } 
        else {
        axios
        .get(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchValueInput}`)
        .then((response) =>  { 
            if (response.data.results[0].id != null) {
            axios
                .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_crew=${response.data.results[0].id}`)
                .then((response) => {
                    setSearchResults(response.data.results);
                    setTotalResults(response.data.total_results) }) 
            } 
        })
    }
}

    const nextPage = (pageNumber) => {
        axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchValue}&page=${pageNumber}`)
        .then((response) => {
            setSearchResults(response.data.results);
            setCurrentPage(pageNumber);
        })
    }

    const viewDetails = (id) => {
        console.log(id);
        setMovieId(id);
        setModalOpen(true);
    }

    const handleModalClose = async () => {
        setModalOpen(false)
    }

    const totalPages = Math.ceil(totalResults / 20);
    return (
        
        <div style={{textAlign: "center"}}>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}>
                <Grid item xs={4}>
                    <Filter filterSubmit={searchByTitle} filterTitle="Title"/>
                </Grid>
                <Grid item xs={"auto"}>
                    <Filter filterSubmit={searchByYear} filterTitle="Year"/>
                </Grid>
                <Grid item xs={"auto"}>
                    <Filter filterSubmit={searchByCrew} filterTitle="Crew"/>
                </Grid>
                <Grid item xs={"auto"}>
                    <Filter filterSubmit={searchByRating} filterTitle="Rating"/>
                </Grid>

            </Grid>
            <MovieList movies={searchResults} viewMovieDetails={viewDetails} />
            { totalResults > 20 ? <Pagination totalPages={totalPages} nextPage={nextPage} currentPage={currentPage}/> : null }
            { movieId !== 0 && <MovieDetailsModal movieId={movieId} open={modalOpen} onClose={handleModalClose} /> }

        </div>  
    )
} 

export default Home;