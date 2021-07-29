import { img_300, unavailable } from '../../config/config'
import "./SingleContent.scss"
import { Badge } from "@material-ui/core";

interface Props {
    id: number,
    poster: string,
    title: string,
    date: string,
    media_type: string,
    vote_average: number,
}

function SingleContent(props: Props) {

    const {
        id,
        poster,
        title,
        date,
        media_type,
        vote_average,
    } = props


    return (
        <div className="media">
            <Badge
                badgeContent={vote_average}
                color={vote_average > 6 ? "primary" : "secondary"}
            />
            <img className="poster" src={`${img_300}/${poster? poster : unavailable}`} alt={title}/>
            <b className="title">{title}</b>
            <span className="subTitle">
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span className="subTitle">{date}</span>
            </span>
        </div>
    )
}

export default SingleContent
