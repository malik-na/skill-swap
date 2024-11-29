const Navbar = () => {

    const navItems = [
        {
            title: 'Home',
            link: '/',
        },
        {
            title: 'About',
            link: '/about',
        },
        {
            title: 'How It Works',
            link: '/how-it-works',
        }
    ]

    return (
        <nav>
            <ul className="flex sm: gap-5 lg: gap-10">
                {navItems.map((item, i) => (
                    <li key={i}>{item.title}</li>
                ))}
            </ul>
        </nav>
    )
}
export default Navbar;