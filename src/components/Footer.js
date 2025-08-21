
const Footer = () => {
    return (
        <footer style={{display: "flex", gap: "20px"}}>
            <img alt="Logo" src="/Little-Lemon-Logo-circle-white.png" height={200} width={200} />
            <div>
                <p>Doormat Navigation</p>
                <ul>
                    <li><a>Home</a></li>
                    <li><a>About</a></li>
                    <li><a>Menu</a></li>
                    <li><a>Reservations</a></li>
                    <li><a>Order online</a></li>
                    <li><a>Login</a></li>
                </ul>
            </div>
            <div>
                <p>Contact</p>
                <ul>
                    <li>Address</li>
                    <li>Phone Number</li>
                    <li>Email</li>
                </ul>
            </div>
            <div>
                <p>Social Media Links</p>
                <ul>
                    <li><a href="facebook.com">Facebook</a></li>
                    <li><a>Instagram</a></li>
                    <li><a>X</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;