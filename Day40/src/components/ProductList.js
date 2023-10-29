const ProductList = ({ products }) => {
    return `
    ${products
        .map((product) => {
            return `<div class="col">
            <h3><a href="/products/${product.id}">Chi tiết sản phẩm -${product.name}</a></h3>
     
        </div>`;
        })
        .join("")}
    `;
};

export default ProductList;
