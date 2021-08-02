import axios from 'axios'
import {useState, useEffect} from 'react'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import Genres from '../../components/Genres/Genres'
import useGenre from '../../hooks/useGenre'


interface Movie {
    id: string,
    poster_path: string,
    title: string,
    name: string, 
    first_air_date: string,
    release_date: string, 
    media_type: string,
    vote_average: number
}

interface Genre {
    id: string, 
    name: string
}



function Movies() {

    const [page, setPage] = useState(1)
    const [content, setContent] = useState<[Movie]>()
    const [numOfPages, setNumOfPages] = useState(1)
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([])
    const [genres, setGenres] = useState<Genre[]>([])
    const genreforURL = useGenre (selectedGenres)
    
    const fetchMovies = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
        setContent(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        fetchMovies()
    }, [genreforURL, page])


    return (
        <div>
            <span className="pageTitle">Movies</span>
            
            <Genres
                type="movie"
                setPage={setPage}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
            />
            <div className="trending">
                {
                    
                    content && content.map((movie) => (
                        <SingleContent 
                            key={movie.id}
                            id={movie.id}
                            poster={movie.poster_path}
                            title={movie.title || movie.name}
                            date={movie.first_air_date || movie.release_date}
                            media_type={movie.media_type}
                            vote_average={movie.vote_average}
                            
                        />
                    ))
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default Movies
