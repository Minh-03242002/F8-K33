const app = document.querySelector("#root");
import HomePage from "./page/HomePage";
import AboutPage from "./page/About";
import ProductsPage from "./page/Products";
import ProductDetailPage from "./page/ProductDetail";

import NotFoundPage from "./page/NotFound";
import { render, router } from "./Utils";



router.on("/",()=> render(HomePage,app))
router.on("/about",()=> render(AboutPage,app))
router.on("/products",()=> render(ProductsPage,app))
router.on("/products/:id",({data})=>render(()=>ProductDetailPage(data),app))
router.notFound(()=>render(NotFoundPage,app))
router.resolve()

