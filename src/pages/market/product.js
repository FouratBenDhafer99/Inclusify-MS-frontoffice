import React, {
    Fragment,
    useState,
    useEffect,
    useContext
} from "react";
import {
    useParams
} from "react-router-dom";

import Header from '../../components/Header';
import Leftnav from '../../components/Leftnav';
import Appfooter from '../../components/Appfooter';
import Popupchat from '../../components/Popupchat';
import Slider from "react-slick";

import MarketApi from "../../api/marketApi";

const Product = () => {
    const {
        productId
    } = useParams();
    const [product, setProduct] = useState({});

    async function getProd(id) {
        await MarketApi.getProductById(id).then((data) => {
            console.log(data);
            setProduct(data);
        });
    }

    useEffect(() => {
        getProd(productId);
    }, []);

    return (
        <Fragment>
            <Header/>
            <Leftnav/>
            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-lg-1 p-0 d-none d-lg-block">
                            </div>
                            <div className="col-lg-5 mb-4 shop-slider">
                                <Slider>
                                        <div key={product.id} className="pt-lg--10 pb-lg--10 bg-white rounded-3">
                                            <img src={`${product.image}`} alt="avater"
                                                 className="rounded-3 img-fluid"/>
                                        </div>
                                    
                                </Slider>
                            </div>

                            <div
                                className="col-lg-6  col-md-12 pad-top-lg-200 pad-bottom-lg-100 pad-top-100 pad-bottom-75 ps-md--5">
                                <h4 className="text-danger font-xssss fw-700 ls-2">{product.category?.name}</h4>
                                <h2 className="fw-700 text-grey-900 display1-size lh-3 porduct-title display2-md-size"> {product.name}</h2>
                                <div className="clearfix"></div>
                                <p className="font-xsss fw-400 text-grey-500 lh-30 pe-5 mt-3 me-5">{product.description}</p>

                                <h6 className="display2-size fw-700 text-current ls-2 mb-2"><span
                                    className="font-xl">$</span>{product.price}
                                </h6>
                                <div className="clearfix"></div>
                                <form action="#" className="form--action mt-4 mb-3">
                                    <div className="product-action flex-row align-items-center">
                                        <a href="/defaulthoteldetails"
                                           className="add-to-cart bg-dark text-white fw-700 ps-lg-5 pe-lg-5 text-uppercase font-xssss float-left border-dark border rounded-3 border-size-md d-inline-block mt-0 p-3 text-center ls-3">Buy</a>
                                    </div>
                                </form>
                                <div className="clearfix"></div>
                                <ul className="product-feature-list mt-5">
                                    <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b
                                        className="text-grey-900"> Category : </b>{product.category?.name}
                                    </li>
                                    <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b
                                        className="text-grey-900">SKU : </b> REF. {product.id}
                                    </li>
                                    <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left"><b
                                        className="text-grey-900">Quantity : </b>{product.quantity}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Popupchat/>
            <Appfooter/>
        </Fragment>
    );
}

export default Product;