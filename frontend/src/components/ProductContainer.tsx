import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { CSSProperties, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { fetchProductDetails, fetchProducts, setCurrentPage } from "../redux/productsSlice";
import ProductDetailModal from "./ProductDetailModal";
import { Button, Typography } from "@mui/material";

const itemsPerPage = 10;

export const ProductContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const productDetails = useSelector(
    (state: RootState) => state.products.productDetails
  );
  const currentPage = useSelector((state: RootState) => state.products.currentPage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage+1));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage-1));
    }
  };

  const handleProductClick = productId => {
    dispatch(fetchProductDetails(productId));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(
      fetchProducts({
        skip: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
      })
    );
  }, [dispatch, currentPage]);

  const productStyles: CSSProperties = {
    flex: "0 0 18%",
    padding: "1%",
    boxSizing: "border-box",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div style={{ marginRight: "16px" }}>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </Button>
        </div>
        <div style={{ marginRight: "16px" }}>
          <Typography>Page {currentPage}</Typography>
        </div>
        <div>
          <Button
            onClick={handleNextPage}
            disabled={products.length < itemsPerPage}>
            Next
          </Button>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product, index) => (
          <div
            key={index}
            style={productStyles}
            onClick={() => handleProductClick(product.id)}>
            <Product {...product} />
          </div>
        ))}

        <ProductDetailModal
          open={isModalOpen}
          product={productDetails}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};
