
const Nav = () => {
    return (
        <nav>
        <ul style={{display: "flex", listStyle: "none", gap: "10px"}}>
            <li><a>Home</a></li>
            <li><a>About</a></li>
            <li><a>Menu</a></li>
            <li><a>Reservations</a></li>
            <li><a>Order online</a></li>
            <li><a>Login</a></li>
        </ul>
        </nav>
    )
}

export default Nav;