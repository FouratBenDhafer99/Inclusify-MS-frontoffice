import { Button } from "react-bootstrap";
import React, {
    Fragment, useContext,
    useEffect,
    useState
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../index";
import Header from "../../components/Header";
import Leftnav from "../../components/Leftnav";
import Pagetitle from "../../components/Pagetitle";
import Load from "../../components/Load";
import marketApi from "../../api/marketApi";
import Appfooter from '../../components/Appfooter';


const ProductAddForm = () => {
    const [product, setProduct] = useState({})
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productNameError, setProductNameError] = useState("");
    const [productDescriptionError, setProductDescriptionError] = useState("");
    const [productPriceError, setProductPriceError] = useState("");
    const [productQuantityError, setProductQuantityError] = useState("");
    const [productCategoryError, setProductCategoryError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const params = useParams()
    const navigate = useNavigate()

    const handleProductNameChange = (event) => setProductName(event.target.value)
    const handleProductDescriptionChange = (event) => setProductDescription(event.target.value)
    const handleProductPriceChange = (event) => setProductPrice(event.target.value)
    const handleProductQuantityChange = (event) => setProductQuantity(event.target.value)
    const handleProductCategoryChange = (event) => setProductCategory(event.target.value)
    const handleProductImageChange = (event) => setProductImage(event.target.value)

    const handleSubmit = async () => {
        setProductNameError("")
        setProductDescriptionError("")
        setProductPriceError("")
        setProductQuantityError("")
        setProductCategoryError("")
        if (productName === "")
            setProductNameError("Give the product a name")
        else {
            const p = {
                name: productName,
                description: productDescription,
                price: productPrice,
                quantity: productQuantity,
                category: {
                    id: productCategory
                },
                image: productImage,
                user_id: "652e9c0148ab2146dc2c51f2"
            }
            if (product?.id)
                await marketApi.updateProductById({
                    id: product.id,
                    name: productName,
                    description: productDescription,
                    price: productPrice,
                    quantity: productQuantity,
                    category: productCategory,
                    image: productImage,
                    user_id: "652e9c0148ab2146dc2c51f2"
                }).then(res => navigate("/shop"));
            else
                await marketApi.createProduct(p).then(res => navigate("/shop"));
            console.log('====================================');
            console.log(productName);
            console.log('====================================');
            console.log(product.data);
            console.log('====================================');
        }
    }

    const fn = async () => {
        await marketApi.getAllCategories().then(res => {
            console.log(res)
            setCategories(res)
            setProductCategory(res[0].id)
        })
    }

    const fn2 = async () => {
        await marketApi.getProductById(params.productId).then(res => {
            console.log(res)
            setProduct(res)
            setProductName(res.name)
            setProductDescription(res.description)
            setProductPrice(res.price)
            setProductQuantity(res.quantity)
            setProductCategory(res.category.id)
            setIsLoading(false)
        })
    }


    useEffect(() => {
        fn()
        setIsLoading(true)
        if (params.productId)
            fn2()
        else setIsLoading(false)
    }, [])


    return (
        <Fragment>
            <Header /><Leftnav />
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <Pagetitle title={params.productId ? "Edit Product " + product?.name : "Add Product"} />
                            {isLoading ? <Load /> :
                                <div className="col-lg-6 mb-3">
                                    <div className="form-gorup">
                                        <label className="mont-font fw-600 font-xssss">
                                            {params.productId && "New"} Product
                                            Name {productName}</label>
                                        <input type="text" name="name" value={productName} placeholder="Product name"
                                            onChange={handleProductNameChange}
                                            className="form-control" />
                                        <p className="text-danger">{productNameError}</p>
                                    </div>
                                    <div className="form-gorup">
                                        <label className="mont-font fw-600 font-xssss">
                                            {params.productId && "New"} Product
                                            Description</label>
                                        <input type="text" name="description" value={productDescription} placeholder="Product Description"
                                            onChange={handleProductDescriptionChange}
                                            className="form-control" />
                                        <p className="text-danger">{productDescriptionError}</p>
                                    </div>
                                    <div className="form-gorup">
                                        <label className="mont-font fw-600 font-xssss">
                                            {params.productId && "New"} Product
                                            Quantity</label>
                                        <input type="number" name="quantity" min={1} value={productQuantity} placeholder="Product Quantity"
                                            onChange={handleProductQuantityChange}
                                            className="form-control" />
                                        <p className="text-danger">{productQuantityError}</p>
                                    </div>
                                    <div className="form-gorup">
                                        <label className="mont-font fw-600 font-xssss">
                                            {params.productId && "New"} Product
                                            Price</label>
                                        <input type="number" min={0.01} step={0.01} name="price" value={productPrice} placeholder="Product Price"
                                            onChange={handleProductPriceChange}
                                            className="form-control" />
                                        <p className="text-danger">{productPriceError}</p>
                                    </div>
                                    <div className="form-gorup">
                                        <label className="mont-font fw-600 font-xssss">
                                            {params.productId && "New"} Product
                                            Category</label>
                                        <select className="form-control" name="category" value={productCategory} onChange={handleProductCategoryChange}>
                                            {categories.map(item => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                        <p className="text-danger">{productCategoryError}</p>
                                    </div>
                                    <div className="form-gorup">
                                        <label className="mont-font fw-600 font-xssss">
                                            {params.productId && "New"} Product
                                            Image</label>
                                        <input type="file" accept="img/*" name="name" value={productImage}
                                            onChange={handleProductImageChange}
                                            className="form-control" />
                                    </div>
                                    <div className="card shadow-none border-0">
                                        <button onClick={handleSubmit}
                                            className="border-0 w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-3 text-uppercase fw-600 ls-3">
                                            Submit</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductAddForm