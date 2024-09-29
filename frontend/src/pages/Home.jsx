import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'

function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(import.meta.env.APP_API_URL + '/products')
            .then(res => res.json())
            .then(data => setProducts(data.products))
    }, [])

    return (
        <>
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
                <div className="row">
                    {products.map((product) => <ProductCard key={product._id} product={product} />)}
                </div>
            </section>
        </>
    );
}

export default Home;
