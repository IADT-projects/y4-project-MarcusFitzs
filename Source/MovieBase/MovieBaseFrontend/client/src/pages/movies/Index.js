import axios from '../../config';
import { useState, useEffect, useRef } from 'react';
import MovieCard from '../../components/MovieCard';
import * as React from 'react';

import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import Pagination from "@mui/material/Pagination";

import '../../styles/style.css';

function paginator(items, current_page, per_page_items) {
    let page = current_page || 1,
    per_page = per_page_items,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);
    console.log("item length: " + items.lgenth);
  
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: total_pages > page ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}

const Index = (props) => {
    const [ movies, setMovies ] = useState(null);
    const [ filter, setFilter ] = React.useState("");
    const [ typed, setTyped ] = useState("");

    const [ ratingFilter, setRatingFilter ] = useState(null);
    const ratings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

    const [ genreFilter, setGenreFilter ] = useState(null); 
    // const genres = ["Action", "Adult", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "Game-Show", "History", "Horror", "Music", "Musical", "Mystery", "News", "Reality-TV", "Romance", "Sci-Fi", "Short", "Sport", "Talk-Show", "Thriller", "War"]
    const genres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Drama", "Family", "Fantasy", "History", "Horror", "Romance", "Sci-Fi", "Thriller", "War"]


    const [ perPage, setPerPage ] = useState(12);
    const perPageOptions = [6,9,12,18,24,48]
    
    useEffect(() => {
        axios.get('/movies')
            .then((response) => {
                console.log(response.data);
                setMovies(response.data);
                // console.log("Movies = " + movies.length);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    if(!movies) return 'Loading movies...';

    const ratingFilterChange = (e) => {
        setRatingFilter(e.target.value);
        console.log("rating = " + ratingFilter)
    };

    const genreFilterChange = (e) => {
        setGenreFilter(e.target.value);
        console.log("genre = " + genreFilter)
    };

    const perPageChange = (e) => {
        setPerPage(e.target.value);
        console.log("items per page = " + perPage)
    };

    function SearchBar({ onSearch }) {
        const inputReference = useRef(null);

        const onSub = (e) => {
            onSearch(e.target.value.toLowerCase());
            setTyped(e.target.value);
        };

        useEffect(() => {
            inputReference.current.focus();
        }, [typed])
      
        return (
            // <form>
            //     <div>
                    <TextField
                        onChange={onSub}
                        inputRef={inputReference}
                        className="search-input"
                        placeholder="Search"
                        name="search"
                        value={typed}
                    />
            //     </div>
            // </form> 

            // <div>
            //     <TextField
            //         onChange={onSub}
            //         ref={inputReference}
            //         className="search-input"
            //         placeholder="Search"
            //         name="search"
            //         value={typed}
            //     />
            // </div>
        );
    }

    function SearchPage() {
        const filteredData = React.useMemo(() => { 
            if (filter === "") return movies;
            return movies.filter((item) =>
                item.primaryTitle.toLowerCase().includes(filter)
            );
        }, []);

        const ratingFiltered = React.useMemo(() => { 
            if (ratingFilter === null) return filteredData;
            return filteredData.filter((item) =>
                item.averageRating >= ratingFilter*2
            );
        }, [filteredData]);

        const genreFiltered = React.useMemo(() => { 
            if (genreFilter === null) return ratingFiltered;
            console.log("GenreTest = " + ratingFiltered[0].genreFilter)
            console.log("GenreFilter = " + ['genreFilter'])
            return ratingFiltered.filter((item) =>
                item[genreFilter] === 1
            );
        }, [ratingFiltered]);

        // const filter1 = filteredData.filter(movie => {
        //     return movie.averageRating > 8.8;
        // })

        console.log("Filtered movies = " + filteredData?.length);

        const count = Math.ceil(genreFiltered.length / perPage);
        const [page, setPage] = React.useState(1);
        const handleChange = (event, value) => {
            setPage(paginator(genreFiltered, value, perPage).page);
        };
        // const [checked, setChecked] = React.useState([]);
        // const handleOnChange = (e, index) => {
        //     console.log("I'm being called")
        //     let prev = checked;
        //     let itemIndex = prev.indexOf(index);
        //     if (itemIndex !== -1) {
        //         prev.splice(itemIndex, 1);
        //     } else {
        //         prev.push(index);
        //     }
        //     setChecked([...prev]);
        // };
        // console.log(checked);

        // if (filter1) {}

        const moviesList = paginator(genreFiltered, page, perPage).data.map((movie) => {
            return  <Grid xs={6} sm={5} md={4} lg={3} xl={2}> 
                        <MovieCard 
                            key={movie._id} 
                            movie={movie} 
                            authenticated={props.authenticated} 
                        /> 
                    </Grid>;
        });

        const reset = () => {
            setRatingFilter(null)
            setGenreFilter(null)
            setPerPage(12)
            setTyped("")
            setFilter("")
        };

        return (
            <>
            <div class="test">
            <h2>Movies</h2>
                {/* <SearchBar onSearch={(searchTerm) => setFilter(searchTerm)} class="searchBar"/> */}
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    >
                    <div class="filterInputs">
                        <SearchBar onSearch={(searchTerm) => setFilter(searchTerm)} class="searchBar"/>
                        <TextField
                        id="rating-filter"
                        select
                        label="Minimum average rating"
                        defaultValue={ratingFilter || 0}
                        onChange={ratingFilterChange} 
                        >
                        {ratings.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                        <TextField
                        id="genre-filter"
                        select
                        label="Genre"
                        defaultValue={genreFilter}
                        onChange={genreFilterChange}
                        >
                        {genres.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                        <TextField
                        id="perPageSetting"
                        select
                        label="Movies per page"
                        defaultValue={perPage}
                        onChange={perPageChange}
                        >
                        {perPageOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                        
                    </div>
                        <Button
                            onClick={reset}
                            // class="resetButton"
                            style={{textTransform: 'lowercase'}}
                            sx={{ mx: 'auto', mb: 3 }}
                            fullWidth
                        >
                            Reset Filters
                        </Button>
                </Box>
                
                {/* <div class="pageNos">
                    <Pagination
                        count={count}
                        page={page}
                        onChange={handleChange}
                        color="success"
                    />
                </div> */}
                <Grid container spacing={0}>
                    { moviesList }
                </Grid>
                <div class="pageNos">
                    <Pagination
                        count={count}
                        page={page}
                        onChange={handleChange}
                        color="success"
                    />
                </div>
                </div>
            </>
        );
    }

    // const moviesList = movies.map((movie) => {
    //     return  <Grid xs={6} md={4}> 
    //                 <MovieCard 
    //                     key={movie._id} 
    //                     movie={movie} 
    //                     authenticated={props.authenticated} 
    //                 /> 
    //             </Grid>;
    // });

    if (!props.authenticated) {
        return (
            <>
                <p>Please log in or create an account</p>
            </>
        )
    }

    return (
        <>
            {/* <SearchBar onSearch={(searchTerm) => setFilter(searchTerm)}/> */}
            <SearchPage />
            {/* <h2>Movies</h2>
            <Grid container spacing={2}>
            { moviesList }
            </Grid> */}
        </>
    );
};

export default Index;