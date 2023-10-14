import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../configs/app.config";
import { showAlert } from "./alertSlice";
import { CreateProductDto, UploadProductDto } from "../dtos/product.dto";
import { setCurrentPage } from "./productsSlice";

const initialState = {
  response: null,
};

const authenticationSlice = createSlice({
  name: "http",
  initialState,
  reducers: {
    setResponse: (state, action) => {
      state.response = action.payload;
    },
  },
});

export const { setResponse } = authenticationSlice.actions;
export default authenticationSlice.reducer;

export const postCategory = (name: string) => async dispatch => {
  let response;
  try {
    response = await fetch(`${API_URL}/product/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name }),
    });
  } catch (err) {}

  const data = await response.json();
  if (!response.ok) {
    return dispatch(
      showAlert({ message: data.error.message, severity: "error" })
    );
  }
  dispatch(
    showAlert({
      message: `Successfully created product category (id: ${data.result.id})`,
      severity: "success",
    })
  );
};

export const postProduct = (dto: CreateProductDto) => async dispatch => {
  try {
    const getPresignedUrl = await fetch(`${API_URL}/image`, { method: "POST" });
    const signedUrlResponse = await getPresignedUrl.json();
    const imageUrl = `https://klontong-s3.s3.ap-southeast-3.amazonaws.com/${signedUrlResponse.result.data.key}`;
    const uploadUrl = signedUrlResponse.result.data.presignedUrl;

    const options = {
      method: "PUT",
      body: dto.image,
      headers: {
        "Content-Type": dto.image.type,
      },
    };
    const s3UploadResponse = await fetch(uploadUrl, options);

    let uploadDto: UploadProductDto = Object.assign(dto, { imageUrl });
    delete uploadDto.image;

    const response = await fetch(`${API_URL}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(uploadDto),
    });

    const data = await response.json();
    if (!response.ok) {
      return dispatch(
        showAlert({ message: data.error.message, severity: "error" })
      );
    }
    dispatch(
      showAlert({
        message: `Successfully created product (id: ${data.result.id})`,
        severity: "success",
      })
    );
    dispatch(setCurrentPage(1));
  } catch (err) {
    dispatch(showAlert({ message: err, severity: "error" }));
  }
};
