import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom';
import NoSearchResultsFound from '../components/NoSearchResultsFound';

function Home() {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        fetch(`${import.meta.env.APP_API_URL}/products${searchParams.get('keyword') ? `?${searchParams}` : ''}`)
            .then(res => res.json())
            .then(data => setProducts(data.products))

    }, [searchParams])

    return (
        <>
            <h1 id="products_heading">{searchParams.get('keyword') ? products.length !== 0 && 'Search Results' : 'Latest Products'}</h1>
            <section id="products" className="container mt-5">
                <div className="row">
                    {products.map((product) => <ProductCard key={product._id} product={product} />)}

                    {products.length === 0 && <NoSearchResultsFound />}
                </div>
            </section>
        </>
    );
}

export default Home;
