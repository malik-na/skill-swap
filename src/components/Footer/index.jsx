const Footer = () => {

    const footer = [
        {
            title: 'Home',
            link: "/",
        },{
            title: 'About',
            link: "/about",
        },{
            title: 'How It Works',
            link: "/how-it-works",
        },{
            title: 'Blog',
            link: "/blog",
        },{
            title: 'Contact Us',
            link: "/contact-us",
        },{
            title: 'FAQ',
            link: "/faq",
        }
    ]

    const socials = [
        {
            title: 'Facebook',
            icon: 'facebook',
            link: '#',
        },{
            title: 'Twitter',
            icon: 'twitter',
            link: '#',
        },{
            title: 'Instagram',
            icon: 'instagram',
            link: '#',
        },{
            title: 'LinkedIn',
            icon: 'linkedin',
            link: '#',
        },{
            title: 'YouTube',
            icon: 'youtube',
            link: '#',
        },
    ]

    return (
        <div className="flex bg-[#F7F7F7] text-black font-body [ flex-wrap: wrap;] p-10 justify-around">
            <div className="`flex flex-col justify-center items-center leading-8">
                <h4 className="text-3xl font-bold">Quick Links</h4>
                <ul>
                    {
                        footer.map((item, i) => (
                            <li key={i} className="cursor-pointer font-thin">{item.title}</li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <h4 className="text-3xl font-bold">Tell Us What You Think</h4>
                <form action="" className="flex flex-col gap-5 mt-10">
                    <input type="email" className="bg-gray-light p-2 rounded" placeholder="Your Email"/>
                    <textarea type="text" className="bg-gray-light p-2 rounded" placeholder="Your Message..."/>
                    <button className="bg-blue rounded text-white">Submit</button>
                </form>
            </div>
            <div className="flex flex-col justify-start items-center leading-8">
                <h4 className="text-3xl font-bold">Follow us</h4>
                    <ul>
                        {
                            socials.map((item, i) => (
                                <li key={i} className="cursor-pointer font-thin">{item.title}</li>
                            ))
                        }
                    </ul>
            </div>
        </div>
    )
}
export default Footer;