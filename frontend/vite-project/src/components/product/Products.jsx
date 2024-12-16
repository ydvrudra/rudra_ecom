import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { getProducts, clearErrors } from '../../actions/ProductAction';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

const categories = [
    "All",
    "Laptop",
    "Smart Phones",
    "Watches",
    "Men",
    "Women",
    "Kids",
    "Camera",
];

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 60000]);
    const [category, setCategory] = useState('All'); // Default is 'All'
    const [ratings, setRatings] = useState(0);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }

    const dispatch = useDispatch();
    const { keyword } = useParams();
    const alert = useAlert();

    const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        // Handle 'keyword' being undefined or empty to fetch products correctly
        const queryKeyword = keyword && keyword.trim() ? keyword : '';  // Handle empty keyword after search cleared
        const queryCategory = category !== 'All' ? category : '';  // Ensure 'All' doesn't get passed as a category filter

        dispatch(getProducts(queryKeyword, currentPage, price, queryCategory, ratings));
    }, [dispatch, error, keyword, currentPage, price, category, ratings, alert]);

    let count = filteredProductsCount;

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="Products -- Ecommerce" />
                    <h2 className="text-xl font-bold text-center border border-l-0 border-r-0 border-t-0 border-b-gray-400 py-5 m-auto w-60">Products</h2>
                    <div className="flex flex-wrap justify-center min-h-96 space-x-6 lg:mx-40">
                        {products && products.length > 0 ? (
                            products.map((product) => <ProductCard key={product._id} product={product} />)
                        ) : (
                            <h3 className="text-center text-red-500 text-lg">No Products Found</h3>
                        )}
                    </div>

                    <div className="w-72 lg:w-28 lg:absolute top-28 left-10 m-auto">
                        <Typography className='font-bold'>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0} max={60000} step={1000}
                        />

                        <Typography className=''>Category</Typography>
                        <ul className="text-sm text-gray-600 font-roboto">
                            {categories.map((categoryItem) => (
                                <li
                                    key={categoryItem}
                                    onClick={() => setCategory(categoryItem)}
                                    className="hover:text-customOrange-tomatohover cursor-pointer duration-500"
                                >
                                    {categoryItem}
                                </li>
                            ))}
                        </ul>

                        <fieldset className='border border-gray-600 mt-2 mb-10'>
                            <Typography className='' component='legend'>Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => setRatings(newRating)}
                                aria-labelledby='continuous-slider'
                                valueLabelDisplay='auto'
                                min={0} max={5}
                            />
                        </fieldset>
                    </div>

                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageitemActive'
                                activeLinkClass='pageLinkActive'
                            />
                        </div>
                    )}
                </>
            }
        </>
    );
};

export default Products;
