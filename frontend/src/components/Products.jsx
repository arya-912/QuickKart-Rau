import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import { BasicButton } from '../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { addStuff } from '../redux/userHandle';

const Products = ({ productData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsPerPage = 9;

  const { currentRole, responseSearch } = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleUpload = (event, product) => {
    event.stopPropagation();
    dispatch(addStuff("ProductCreate", product));
  };

  const messageHandler = (event) => {
    event.stopPropagation();
    setMessage("You have to login or register first")
    setShowPopup(true)
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (responseSearch) {
    return <NoProductMessage>No product found.</NoProductMessage>;
  }

  return (
    <Wrapper>
      <ProductGrid container spacing={3}>
        {currentItems.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProductCard onClick={() => navigate("/product/view/" + data._id)}>
              <ProductImage src={data.productImage} alt={data.productName} />
              <ProductName>{data.productName}</ProductName>
              <PriceDetails>
                <PriceMrp>₹{data.price.mrp}</PriceMrp>
                <PriceCost>₹{data.price.cost}</PriceCost>
                <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
              </PriceDetails>
              <AddToCart>
                {currentRole === "Customer" && (
                  <BasicButton onClick={(e) => handleAddToCart(e, data)}>Add To Cart</BasicButton>
                )}
                {currentRole === "Shopcart" && (
                  <BasicButton onClick={(e) => handleUpload(e, data)}>Upload</BasicButton>
                )}
                {currentRole === null && (
                  <BasicButton onClick={messageHandler}>Add To Cart</BasicButton>
                )}
              </AddToCart>
            </ProductCard>
          </Grid>
        ))}
      </ProductGrid>

      <PaginationContainer>
        <PageIndicator>Page {currentPage} of {Math.ceil(productData.length / itemsPerPage)}</PageIndicator>
        <ButtonGroup>
          <BasicButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</BasicButton>
          <BasicButton onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</BasicButton>
          <BasicButton onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(productData.length / itemsPerPage)))} disabled={currentPage === Math.ceil(productData.length / itemsPerPage)}>Next</BasicButton>
          <BasicButton onClick={() => setCurrentPage(Math.ceil(productData.length / itemsPerPage))} disabled={currentPage === Math.ceil(productData.length / itemsPerPage)}>Last</BasicButton>
        </ButtonGroup>
      </PaginationContainer>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Wrapper>
  )
};

export default Products;

const Wrapper = styled.div`
  background: #f5f7fa;
  padding: 2rem 1rem;
`;

const ProductGrid = styled(Grid)`
  margin-top: 1rem;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 340px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  }
`;

const ProductImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin-bottom: 12px;
`;

const ProductName = styled.h4`
  text-align: center;
  font-weight: 600;
  margin: 8px 0;
`;

const PriceDetails = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const PriceMrp = styled.p`
  text-decoration: line-through;
  color: #9e9e9e;
  margin: 0;
`;

const PriceCost = styled.p`
  font-size: 1.1rem;
  color: #212121;
  margin: 4px 0;
`;

const PriceDiscount = styled.p`
  color: #2e7d32;
  font-weight: 500;
  margin: 0;
`;

const AddToCart = styled.div`
  margin-top: auto;
`;

const PaginationContainer = styled(Container)`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const PageIndicator = styled.span`
  font-size: 0.95rem;
  color: #555;
`;

const NoProductMessage = styled(Typography)`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.25rem;
  color: #9e9e9e;
`;
