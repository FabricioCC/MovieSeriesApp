import "./trending.scss"
import axios from 'axios'
import { useState, useEffect } from 'react'
import SingleContent from '../../components/SingleContent/SingleContent'
import Movie from '@material-ui/icons/Movie'
import CustomPagination from '../../components/Pagination/CustomPagination'

// eslint-disable-next-line
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

function Trending() {

    const [page, setPage] = useState(1)
    
    const [content, setContent] = useState<[Movie]>()

    const fetchTrending = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
        setContent(data.results)
    }

    useEffect(() => {
        fetchTrending()
        // eslint-disable-next-line
    }, [page])

    return (
        <div>
            <span className="pageTitle">Trending</span>
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
            <CustomPagination setPage={setPage} numOfPages={10} />
        </div>
    )
}

export default Trending
