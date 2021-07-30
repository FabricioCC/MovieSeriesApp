import { useEffect, useState } from 'react'
import axios from 'axios'
import { Chip } from '@material-ui/core'



interface Props {
    type: string,
    setPage: Function,
    genres: Genre[],
    setGenres: Function,
    selectedGenres: Genre[], 
    setSelectedGenres: Function
}

interface Genre {
    id: string,
    name: string
}

function Genres(props: Props) {

    
    

    const {
        type,
        setPage,
        selectedGenres,
        setSelectedGenres,
        genres,
        setGenres

    } = props


    const handleAdd = (genre: Genre) => {

        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1)
            
    };
    
    const handleRemove = (genre: Genre) => {
        
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
        
    
    };
    

    const fetchGenres = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setGenres(data.genres)

        
    }

    console.log(genres)

    useEffect(() => {
        fetchGenres()
        return () => {
            setGenres({}); // unmounting
    };
        
    }, [])



    return (
        <div style={{ padding: "6px 0" }}>
            {selectedGenres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    color="primary"
                    clickable
                    size="small"
                    onDelete={() => handleRemove(genre)}
                />
            ))}
            {genres.map((genre) => (
                
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    clickable
                    size="small"
                    onClick={() => handleAdd(genre)}    
                />
                
            ))}
        </div>
    )
}

export default Genres