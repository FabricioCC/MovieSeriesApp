import "./header.scss"

function Header() {
    return (
        <div>
            <span onClick={()=> window.scrollTo(0,0)} className="header">🎬 Entertainment App 🎥</span>
        </div>
    )
}

export default Header
