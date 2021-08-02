import MainNav from "../MainNav/MainNav"
import "./header.scss"

function Header() {
    return (
        <div className="header">
            <div className="right">
                <h1 onClick={()=> window.scrollTo(0,0)}> MovieSerie App </h1>   
            </div>
            <div className="left">
                <MainNav/>
            </div>
            
        </div>
    )
}

export default Header
