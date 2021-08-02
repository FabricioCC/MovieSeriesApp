import { img_300, unavailable } from '../../config/config'
import "./SingleContent.scss"
import { Badge } from "@material-ui/core";
import ContentModal from '../ContentModal/ContentModal'

interface Props {
    id: string,
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
        <ContentModal media_type={media_type} id={id}>
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
        </ContentModal>
    )
}

export default SingleContent
