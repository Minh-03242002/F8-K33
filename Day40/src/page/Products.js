import ProductList from "../components/ProductList";
import { products } from "../data";

const ProductsPage = () => {
    return `
    <h1> Danh sách sản phẩm</h1>
    
    <div class="container">
    <div class="row">
        ${ProductList({ products })}
    </div></div>`;
};

export default ProductsPage;
