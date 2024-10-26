import React from 'react'
import NavBar from '../components/NavBar'; 

const AboutUs = () => {
    return (
        <div className="about-us">
            <NavBar currentPage={'About Us'} />
            {/* Hero Section */}
            <section className="d-flex justify-content-center align-items-center text-center text-white bg-dark py-5"
                style={{
                    height: '60vh',
                    backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/039/637/400/small_2x/ai-generated-tea-plantation-green-landscape-in-the-mountains-photo.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="container">
                    <h1 className="display-4 fw-bold">About Us</h1>
                    <p className="lead mt-3">
                        Discover the story behind our premium Ceylon tea and how we bring the best flavors from Sri Lanka to your cup.
                    </p>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="container my-5">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <img src="https://t3.ftcdn.net/jpg/00/07/49/18/360_F_7491822_ZRJxpUmYKKgfmS2SRv76Sy2sUOQWP1Rp.jpg" alt="Tea plantation" className="img-fluid rounded" />
                    </div>
                    <div className="col-md-6">
                        <h2 className="mb-4">Who We Are</h2>
                        <p className="text-muted">
                            At Ceylon Tea Company, we are passionate about delivering the finest quality tea products straight from the lush tea gardens of Sri Lanka.
                            Our supply chain management ensures that every step, from tea leaf harvesting to packaging, is done with the utmost care and responsibility.
                        </p>
                        <p className="text-muted">
                            As a proud Sri Lankan business, we focus on sustainable practices and ethical sourcing, ensuring that our tea is not only delicious
                            but also environmentally friendly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="bg-light py-5">
                <div className="container text-center">
                    <h2 className="mb-4">Our Mission</h2>
                    <p className="lead text-muted">
                        We aim to bring the world closer to the authentic flavors of Sri Lanka by offering high-quality tea and tea-related products.
                        Every cup tells the story of our commitment to quality, sustainability, and tradition.
                    </p>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="container my-5">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <h2 className="mb-4">Our Values</h2>
                        <ul className="list-unstyled text-muted">
                            <li className="mb-3">
                                <strong>Quality:</strong> We provide the finest Ceylon tea with a dedication to excellence.
                            </li>
                            <li className="mb-3">
                                <strong>Sustainability:</strong> We care for the environment and follow ethical production processes.
                            </li>
                            <li className="mb-3">
                                <strong>Tradition:</strong> We honor the legacy of tea cultivation in Sri Lanka.
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <img src="https://t3.ftcdn.net/jpg/08/35/78/38/360_F_835783811_B0S0yFWnzdxf0T00rHQua3jUhWeCJ46t.jpg" alt="Tea process" className="img-fluid rounded" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs
