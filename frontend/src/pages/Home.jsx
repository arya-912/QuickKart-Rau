import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  styled,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Slide from './Slide';
import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/userHandle';
import ProductsMenu from './customer/components/ProductsMenu';
import { NewtonsCradle } from '@uiball/loaders';
import { Link } from 'react-router-dom';

const Home = () => {
  const adURL =
    "https://www.f6s.com/content-resource/media/4761140_23905a91e822e233094a0f1807038d8a74f6e654.jpg";

  const dispatch = useDispatch();
  const { productData, responseProducts, error } = useSelector(state => state.user);
  const [showNetworkError, setShowNetworkError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setShowNetworkError(true);
      }, 40000);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <Box
      id="top"
      sx={{
        background: 'linear-gradient(to bottom right,rgb(222, 227, 238), #e5e7eb)', 
        minHeight: '100vh',
      }}
    >
      {isMobile && (
        <MobileMenuContainer>
          <ProductsMenu dropName="Categories" />
          <ProductsMenu dropName="Products" />
        </MobileMenuContainer>
      )}

      <BannerBox>
        <Banner />
      </BannerBox>

      {showNetworkError ? (
        <CenteredContainer>
          <Typography variant="h4" color="error">Network Error</Typography>
        </CenteredContainer>
      ) : error ? (
        <CenteredContainer>
          <Typography variant="h5">Please wait a moment...</Typography>
          <NewtonsCradle size={60} speed={1.4} color="black" />
        </CenteredContainer>
      ) : (
        <>
          {responseProducts ? (
            <CenteredContainer>
              <Typography variant="h5" sx={{ mb: 2 }}>No Products Found</Typography>
              <Typography>Become a seller to start adding products</Typography>
              <Button
                variant="contained"
                component={Link}
                to="/Sellerregister"
                sx={{ mt: 2 }}
              >
                Join as Seller
              </Button>
            </CenteredContainer>
          ) : (
            <>
            <Grid
                container
                spacing={2}
                sx={{
                  px: { xs: 2, md: 4 },
                  py: 3,
                  backgroundColor: '#f2f3f4', 
                  borderRadius: 2,             
                }}
              >
              <Grid
                  item
                  xs={12}
                  md={9}
                  sx={{ 
                    padding: 6,                 
                    borderRadius: 2,         
                  }}
                >
                  <Slide products={productData} title="Top Selection" />
                </Grid>

                <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <AdBox>
                    <AdImage src={adURL} alt="Ad" />
                  </AdBox>
                </Grid>
              </Grid>

              <Section><Slide products={productData} title="Deals of the Day" /></Section>
              <Section><Slide products={productData} title="Suggested Items" /></Section>
              <Section><Slide products={productData} title="Discounts for You" /></Section>
              <Section><Slide products={productData} title="Recommended Items" /></Section>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Home;


const MobileMenuContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '1rem 0',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const BannerBox = styled(Box)`
  padding: 20px 10px;
  background:rgb(48, 212, 204);
`;

const CenteredContainer = styled(Container)`
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const AdBox = styled(Box)`
  background: #73c6b6;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(61, 62, 48, 0.05);
  text-align: center;
  height: 90%;
`;

const AdImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

const Section = styled(Box)`
  margin: 2rem auto;
  padding: 1rem;
`;
