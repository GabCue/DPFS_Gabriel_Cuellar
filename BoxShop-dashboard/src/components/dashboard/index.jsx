import { Route, Routes } from "react-router-dom";
import { Catalog } from "../catalog/Catalog";
import { Counter } from "../counter/Counter";
import { LastProduct } from "../lastProduct/LastProduct";
import { ProductDetail } from "../productDetail/ProductDetail";
import {UsersCatalog} from "../usuarios/UsersCatalog";
import {Categories} from "../categories/categories";
import "./dashboard.css";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Counter />
              <Catalog />
            </>
          }
        />
        <Route path="/catalog" element={<Catalog />} />

        <Route path="/last-product" element={<LastProduct />} />
        <Route path="/counter" element={<Counter />} />

        <Route path="/products/:id" element={<ProductDetail />} />

        <Route path="/users" element={<UsersCatalog />} />

        <Route path="/categories" element={<Categories />} />
      </Routes>
    </div>
  );
};