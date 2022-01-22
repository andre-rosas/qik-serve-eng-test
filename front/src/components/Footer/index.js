
const Footer = () => {

    return (
        <footer className="sm:fixed w-full bottom-0 left-0 right-0 h-48 sm:h-32">
        <hr />
        <div className="flex flex-col md:flex-row sm:flex-row items-center text-center md:justify-around md:text-left py-5 bg-gray-900 text-white">
            <div className="block md:flex flex-wrap justify-items-center my-0 md:my-5">
            <i className="fab fa-facebook my-9 cursor-pointer mx-2 text-center text-3xl md:text-4xl font-bold text-white hover:text-red-600"></i>
            <i className="fab fa-instagram my-9 cursor-pointer mx-2 text-center text-3xl md:text-4xl font-bold text-white hover:text-red-600"></i>
            <i className="fab fa-twitter my-9 cursor-pointer mx-2 text-center text-3xl md:text-4xl font-bold text-white hover:text-red-600"></i>
            </div>
            <div className="flex flex-wrap justify-items-center mb-1">
            <p className="text-lg md:text-lg">Made in 2022 |</p>
            <a href="https://github.com/andre-rosas">
                <p
                className="hover:text-red-600 text-base md:text-lg"
                style={{ cursor: "pointer" }}
                >
                | Github
                </p>
            </a>
            </div>
        </div>
        </footer>
    );
}

export default Footer;