import {
    Button,
    Tab,
    Tabs,
    TextField
} from "@material-ui/core";

import "./search.scss";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

interface Content {
    id: string,
    poster_path: string,
    title: string,
    name: string, 
    first_air_date: string,
    release_date: string, 
    media_type: string,
    vote_average: number
}

function Search() {

    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState<Content[]>([]);
    const [numOfPages, setNumOfPages] = useState();


    const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
              process.env.REACT_APP_API_KEY
            }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
          );
          setContent(data.results);
          setNumOfPages(data.total_pages);
          // console.log(data);
        } catch (error) {
          console.error(error);
        }
    };
    
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    return (
        <div>
            
            <div className="search">
            
            <TextField
                style={{ flex: 1, backgroundColor: "white"}}
                className="searchBox"
                label="Search"
                variant="filled"
                color="primary"
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
                onClick={fetchSearch}
                variant="contained"
                style={{ marginLeft: 10 }}
            >
                <SearchIcon fontSize="large" />
            </Button>
            </div>
            <Tabs
            value={type}
            indicatorColor="primary"
            
            onChange={(event, newValue) => {
                setType(newValue);
                setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
            >
            <Tab style={{ width: "50%",  color: "white"}} label="Search Movies" />
            <Tab style={{ width: "50%", color: "white"}} label="Search TV Series" />
            </Tabs>
        
            <div className="trending">
                {content &&
                content.map((content) => (
                    <SingleContent
                    key={content.id}
                    id={content.id}
                    poster={content.poster_path}
                    title={content.title || content.name}
                    date={content.first_air_date || content.release_date}
                    media_type={type ? "tv" : "movie"}
                    vote_average={content.vote_average}
                    />
                ))}
                {searchText &&
                !content &&
                (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default Search
