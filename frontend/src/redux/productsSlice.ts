import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../configs/app.config";
import { ProductDto } from "../dtos/product.dto";

interface ProductsState {
  products: ProductDto[];
  productDetails: ProductDto | null;
  currentPage: number;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface PaginationArg {
  skip: number;
  limit: number;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ skip, limit }: PaginationArg) => {
    const response = await fetch(
      `${API_URL}/product?skip=${skip}&limit=${limit}`
    );
    const data = await response.json();
    return data.result;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (productId: string) => {
    const response = await fetch(`${API_URL}/product/${productId}`);
    const data = await response.json();
    return data.result;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    currentPage: 1,
    products: [],
    productDetails: null,
    loading: "idle",
    error: null,
  } as ProductsState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductDetails.pending, state => {
        state.loading = "loading";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.productDetails = action.payload;
      });
  },
});

export const { setCurrentPage } = productsSlice.actions;
export default productsSlice.reducer;
