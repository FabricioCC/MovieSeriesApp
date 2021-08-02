import axios from 'axios'
import {useState, useEffect} from 'react'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import Genres from '../../components/Genres/Genres'
import useGenre from '../../hooks/useGenre'


interface Serie {
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



function Series() {

    const [page, setPage] = useState(1)
    const [content, setContent] = useState<Serie[]>()
    const [numOfPages, setNumOfPages] = useState(1)
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([])
    const [genres, setGenres] = useState<Genre[]>([])
    const genreforURL = useGenre (selectedGenres)
    
    const fetchSeries = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
        setContent(data.results)
        setNumOfPages(data.total_pages)
    }

    useEffect(() => {
        fetchSeries()
        // eslint-disable-next-line
    }, [genreforURL, page])


    return (
        <div>
            <span className="pageTitle">Series</span>
            
            <Genres
                type="tv"
                setPage={setPage}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
            />
            <div className="trending">
                {
                    
                    content && content.map((serie) => (
                        <SingleContent 
                            key={serie.id}
                            id={serie.id}
                            poster={serie.poster_path}
                            title={serie.title || serie.name}
                            date={serie.first_air_date || serie.release_date}
                            media_type="tv"
                            vote_average={serie.vote_average}
                            
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

export default Series

