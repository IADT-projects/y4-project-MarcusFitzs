// import { useParams, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from '../../config';
import { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard'

import Grid from '@mui/material/Grid';;

const Movie = (props) => {
    const { id } = useParams();
    // const navigate = useNavigate();
    const [ movie, setMovie] = useState(null);
    const [ IMDb, setIMDb] = useState(null);
    const [ recs, setRecs] = useState(null);
    const [ similars, setSimilars] = useState(null); 
    const [ trailer, setTrailer] = useState(null);
    const [ websiteRatings, setWebsiteRatings] = useState(null);
    const [ links, setLinks] = useState(null);

    let token = localStorage.getItem('token');

    // const deleteCallback = (id) => {
    //     navigate('/movies');
    // };

    useEffect(() => {
        axios.get(`/movies/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                setMovie(response.data);
            })
            .catch((err) => {
                console.error(err);
                console.log(err.response.data.message);
            });
    }, [token, id]);

    useEffect(() => {
        if (movie) {
            fetch(`https://imdb-api.com/en/API/Title/k_zvyi75fh/${movie.tconst}`, {
            // fetch(`https://catfact.ninja/fact`, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                // console.log("MOVIE: " + data);
                setIMDb(data);
            });

            fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_zvyi75fh/${movie.tconst}`, {
            // fetch(`https://catfact.ninja/fact`, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                // console.log("TRAILER: " + data);
                setTrailer(data);
            });

            fetch(`https://imdb-api.com/en/API/Ratings/k_zvyi75fh/${movie.tconst}`, {
            // fetch(`https://catfact.ninja/fact`, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                // console.log("RATINGS: " + data);
                setWebsiteRatings(data);
            });

            fetch(`https://imdb-api.com/en/API/ExternalSites/k_zvyi75fh/${movie.tconst}`, {
            // fetch(`https://catfact.ninja/fact`, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                // console.log("LINKS: " + data);
                setLinks(data);
            });
        }
    }, [movie]);

    useEffect(() => {
        // e.preventDefault();
        if (movie) {
            const formData = new FormData();
            formData.append("tconst", movie.tconst)

            fetch('http://localhost:5000/similar', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                console.log("checkpoint1 = " + data[Object.keys(data)[0]]);
                console.log(data);
                setRecs(data);
            });
        }
    }, [movie]);

    useEffect(() => {
        // e.preventDefault();
        let recHolder = [];
        if (recs) {
            for (let i = 0; i < 5; i++) {
                console.log("recs checkpoint #" + i + " = " + recs[Object.keys(recs)[i]])
                axios.get(`/movies/rec/${recs[Object.keys(recs)[i]]}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    recHolder.push(response.data)
                    // setSimilars(similars, [response.data]);
                    // console.log("Checkpoint99 = " + similars)
                })
                .then(() => {
                    setSimilars(recHolder)
                    console.log("Checkpoint99 = " + similars)
                })
                .catch((err) => {
                    console.error(err);
                    console.log(err.response.data.message);
                });
            }
        }
    }, [recs]);

    let similarsList = [];

    if (similars) {
        if (similars.length >= 4) {
            similarsList = similars.map((movie) => {
                return  <Grid xs={6} md={4}> 
                            <MovieCard 
                                key={movie._id} 
                                movie={movie} 
                                authenticated={props.authenticated} 
                            /> 
                        </Grid>;
            });
        }
    }

    if (similars) {
        console.log("movie = " + movie._id)
        console.log("similars = " + similars[0][0]._id)
        console.log("similars Length = " + similars.length)
    }

    if(!movie) return "Loading...";

    let genres = [];
    let cast = [];
    let vid = [];

    if (IMDb) {
        for (let i = 0; i < IMDb.genreList.length; i++) {
            genres.push(IMDb.genreList[i].key + '\u00A0 \u00A0 \u00A0')
        }

        for (let i = 0; i < IMDb.actorList.length; i++) {
            cast.push(<p>{IMDb.actorList[i].name + ' as ' + IMDb.actorList[i].asCharacter} </p>)
            // rec.push(<p>{listcontent[i].movieID.primaryTitle}</p>);
        }
    }

    if (trailer) {
        vid.push(<iframe width="711" height="400" class="youTube"
                    src={`https://www.youtube.com/embed/${trailer?.videoId}`}>
                </iframe>)
    }

    function numberWithCommas(x) {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (!props.authenticated) {
        return (
            <>
                <p>Please log in or create an account</p>
            </>
        )
    }

    return (
        <>
            <h1 class="movieTitle">{ IMDb?.title }</h1>
            <div>
                <p class="movieEssentials">{ IMDb?.year } &nbsp; &#x2022; &nbsp; { IMDb?.contentRating } &nbsp; &#x2022; &nbsp; { IMDb?.runtimeStr }</p>
            </div>
            <div>
                <img src={ IMDb?.image } alt="poster" width="270" height="400" class="poster"></img>
                {/* <iframe width="711" height="400" class="youTube"
                    src="https://www.youtube.com/embed/{trailer?.videoId}">
                </iframe> */}
                { vid }
            </div>
            <div class="infoDiv">
            <p class="genrePara">{ genres }</p>
            <hr />
            { IMDb?.plot }
            <hr />
            <h2 class="horiz">Director: </h2>
            <p class="horiz">{ IMDb?.directors }</p>
            <hr />
            <h2 class="horiz">Writer: </h2>
            <p class="horiz">{ IMDb?.writers }</p>
            <hr />
            <h2 class="horiz">Starring: </h2>
            <p class="horiz">{ IMDb?.stars }</p>
            <hr />

            
            <div class="movieCol">
                <h2>More info</h2>
                <h3 class="horiz">Release date: </h3>
                <p class="horiz">{ IMDb?.releaseDate }</p>
                <br />
                <br />
                <h3 class="horiz">Runtime: </h3>
                <p class="horiz">{ IMDb?.runtimeStr } / { IMDb?.runtimeMins } minutes</p>
                <br />
                <br />
                <h3 class="horiz">Age Rating: </h3>
                <p class="horiz">{ IMDb?.contentRating }</p>
                <br />
                <br />
                <h3 class="horiz">Languages: </h3>
                <p class="horiz">{ IMDb?.languages }</p>
                <br />
                <br />
                <h3 class="horiz">Production Companies: </h3>
                <p class="horiz">{ IMDb?.companies }</p>
                <br />
                <br />
                <h3 class="horiz">Budget: </h3>
                <p class="horiz">{ IMDb?.boxOffice.budget }</p>
                <br />
                <br />
                <h3 class="horiz">Opening Weekend (USA): </h3>
                <p class="horiz">{ IMDb?.boxOffice.openingWeekendUSA }</p>
                <br />
                <br />
                <h3 class="horiz">Worldwide Gross: </h3>
                <p class="horiz">{ IMDb?.boxOffice.cumulativeWorldwideGross }</p>
            </div>

            <hr class="flexHr"></hr>
            
            <div class="movieCol">
                <h2>External Websites</h2>
                <h3 class="horiz">Official Website: </h3>
                <p class="horiz"><a href={`${links?.officialWebsite}`}>{ IMDb?.title }</a></p>
                
                <h3>IMDb</h3>
                <h3 class="horiz">&nbsp; &nbsp; &nbsp; &nbsp; Link: </h3>
                <p class="horiz"><a href={`https://www.imdb.com/title/${IMDb?.id}`}>{ IMDb?.title }</a></p>
                <br />
                <h3 class="horiz">&nbsp; &nbsp; &nbsp; &nbsp; Rating: </h3>
                <p class="horiz">{ IMDb?.imDbRating }/10</p>
                <br />
                <h3 class="horiz">&nbsp; &nbsp; &nbsp; &nbsp; Number of ratings: </h3>
                <p class="horiz">{ numberWithCommas(IMDb?.imDbRatingVotes) }</p>

                <h3>RottenTomatoes</h3>
                <h3 class="horiz">&nbsp; &nbsp; &nbsp; &nbsp; Link: </h3>
                <p class="horiz"><a href={`${links?.rottenTomatoes.url}`}>{ IMDb?.title }</a></p>
                <br />
                <h3 class="horiz">&nbsp; &nbsp; &nbsp; &nbsp; Rating: </h3>
                <p class="horiz">{ websiteRatings?.rottenTomatoes }%</p>
                <br />
                <h3>Metacritic</h3>
                <h3 class="horiz">&nbsp; &nbsp; &nbsp; &nbsp; Link: </h3>
                <p class="horiz"><a href={`${links?.metacritic.url}`}>{ IMDb?.title }</a></p>
                <br />
                <h3 class="horiz">&nbsp; &nbsp; &nbsp; &nbsp; Rating: </h3>
                <p class="horiz">{ IMDb?.metacriticRating }/100</p>
            </div>
            {/* <br /> */}
            <hr class="castHr"></hr>
            {/* <hr class="new1"></hr> */}
            {/* <hr class="castHr"></hr> */}


            <h2>Full cast</h2>
            <p class="castCol">{ cast }</p>


            <h2>Similar Movies</h2>
            {/* { similarsList } */}
            </div>
        </>
    );
};

export default Movie;