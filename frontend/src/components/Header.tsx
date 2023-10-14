import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/authAction";
import CreateCategoryButton from "./buttons/CreateCategoryButton";
import CreateProductButton from "./buttons/CreateProductButton";
import { CreateCategoryForm } from "./buttons/CreateCategoryForm";
import { CreateProductForm } from "./buttons/CreateProductForm";

const Header: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategoryOpen, setCategoryModalOpen] = useState(false);
  const [modalProductOpen, setProductModalOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleLoginClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCategoryModalOpen = () => {
    setCategoryModalOpen(true);
  };

  const handleCategoryModalClose = () => {
    setCategoryModalOpen(false);
  };

  const handleProductModalOpen = () => {
    setProductModalOpen(true);
  };

  const handleProductModalClose = () => {
    setProductModalOpen(false);
  };

  return (
    <div className="header">
      <Box display="flex" justifyContent="center">
        {isAuthenticated ? (
          <div>
            <CreateCategoryButton onClick={handleCategoryModalOpen} />
            <CreateCategoryForm
              open={modalCategoryOpen}
              onClose={handleCategoryModalClose}
            />
            <CreateProductButton onClick={handleProductModalOpen} />
            <CreateProductForm
              open={modalProductOpen}
              onClose={handleProductModalClose}
            />
            <Button
              variant="contained"
              color="primary"
              className="login-button"
              onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className="login-button"
            onClick={handleLoginClick}>
            Login
          </Button>
        )}
      </Box>
      <LoginForm open={modalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Header;
