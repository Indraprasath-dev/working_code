import "../styles/header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="header__icon">
               <div className="header__icon_logo">
                    <img src="/pblogo.svg"></img>
               </div>

                <div className="header__menu">
                    <ul>
                        <li>
                            <a>
                                <img src="/team.svg"></img>
                                Teams
                            </a>
                        </li>
                        <li>
                            <a className="on-focus-group">
                                <img src="members.svg"></img>
                                Members
                            </a>
                        </li>
                        <li>
                            <a>
                                <img src="projects.svg"></img>
                                Projects
                            </a>

                        </li>
                        <li>
                            <a>
                                <img src="calendar.svg"></img>
                                IRL Gathering
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="header__button">
                <div>
                    <button className="header__button_question">
                        <img src="./question.svg"></img>
                    </button>
                </div>
                <div>
                    <button className="header__button_join ">
                        Join the network
                        <div >
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.61427 5.53233C3.81426 5.77481 4.18574 5.77481 4.38573 5.53233L7.65534 1.56814C7.92431 1.24202 7.69234 0.75 7.26961 0.75L0.730393 0.75C0.307659 0.75 0.0756859 1.24202 0.344665 1.56814L3.61427 5.53233Z" fill="currentColor"></path>
                        </svg>
                        </div>
                    </button>
                </div>
                <div>
                    <button className="header__button_login">Login</button>
                </div>

            </div>
        </header>
    )
}

export default Header
