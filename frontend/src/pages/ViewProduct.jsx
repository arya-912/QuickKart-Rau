import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import styled from 'styled-components';
import { BasicButton } from '../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../redux/userHandle';
import { Avatar, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { generateRandomColor, timeAgo } from '../utils/helperFunctions';
import { MoreVert } from '@mui/icons-material';

// ...imports stay the same

const ViewProduct = () => {
  const dispatch = useDispatch();
  const { id: productID } = useParams();

  const { currentUser, currentRole, productDetails, loading, responseDetails } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getProductDetails(productID));
  }, [productID, dispatch]);

  const [anchorElMenu, setAnchorElMenu] = useState(null);

  const handleOpenMenu = (event) => setAnchorElMenu(event.currentTarget);
  const handleCloseMenu = () => setAnchorElMenu(null);
  const deleteHandler = (reviewId) => {
    dispatch(updateStuff({ reviewId }, productID, "deleteProductReview"));
  };

  const reviewer = currentUser?._id;

  return loading ? (
    <div>Loading...</div>
  ) : responseDetails ? (
    <div>Product not found</div>
  ) : (
    <>
      <ProductContainer>
        <ImageWrapper>
          <ProductImage src={productDetails?.productImage} alt={productDetails?.productName} />
        </ImageWrapper>
        <ProductInfo>
          <ProductName>{productDetails?.productName}</ProductName>
          <PriceContainer>
            <PriceCost>₹{productDetails?.price?.cost}</PriceCost>
            <PriceMrp>₹{productDetails?.price?.mrp}</PriceMrp>
            <PriceDiscount>{productDetails?.price?.discountPercent}% off</PriceDiscount>
          </PriceContainer>
          <Description>{productDetails?.description}</Description>
          <ProductDetails>
            <p><strong>Category:</strong> {productDetails?.category}</p>
            <p><strong>Subcategory:</strong> {productDetails?.subcategory}</p>
          </ProductDetails>
          {currentRole === "Customer" && (
            <BasicButton onClick={() => dispatch(addToCart(productDetails))}>
              Add to Cart
            </BasicButton>
          )}
        </ProductInfo>
      </ProductContainer>

      <ReviewSection>
        <Typography variant="h5" sx={{ mb: 2 }}>Customer Reviews</Typography>
        {productDetails.reviews?.length > 0 ? (
          productDetails.reviews.map((review) => (
            <ReviewCard key={review._id}>
              <ReviewCardDivision>
                <Avatar sx={{ width: 56, height: 56, mr: 2, bgcolor: generateRandomColor(review._id) }}>
                  {review.reviewer.name.charAt(0)}
                </Avatar>
                <ReviewDetails>
                  <Typography variant="subtitle1" fontWeight={600}>{review.reviewer.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{timeAgo(review.date)}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>Rating: {review.rating}</Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>{review.comment}</Typography>
                </ReviewDetails>
                {review.reviewer._id === reviewer && (
                  <>
                    <IconButton onClick={handleOpenMenu}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorElMenu}
                      open={Boolean(anchorElMenu)}
                      onClose={handleCloseMenu}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                      <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
                      <MenuItem onClick={() => {
                        deleteHandler(review._id);
                        handleCloseMenu();
                      }}>Delete</MenuItem>
                    </Menu>
                  </>
                )}
              </ReviewCardDivision>
            </ReviewCard>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">No reviews found. Be the first to write one!</Typography>
        )}
      </ReviewSection>
    </>
  );
};

export default ViewProduct;

// ================= Styled Components ================= //

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  max-width: 400px;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductName = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin: 0;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PriceCost = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #2e7d32;
`;

const PriceMrp = styled.span`
  text-decoration: line-through;
  color: #888;
`;

const PriceDiscount = styled.span`
  color: #d32f2f;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 16px;
  color: #444;
`;

const ProductDetails = styled.div`
  font-size: 14px;
  color: #666;
`;

const ReviewSection = styled.div`
  padding: 3rem 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ReviewCard = styled(Card)`
  && {
    margin-bottom: 1.5rem;
    padding: 1.5rem;
    background-color: #fff;
    border-radius: 10px;
  }
`;

const ReviewCardDivision = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const ReviewDetails = styled.div`
  flex: 1;
`;
