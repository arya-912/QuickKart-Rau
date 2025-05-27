import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { KeyboardArrowDown, KeyboardArrowUp, Category as CategoryIcon, Label as SubcategoryIcon } from '@mui/icons-material';
import { LightPurpleButton } from '../../../utils/buttonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedProducts } from '../../../redux/userHandle';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const ProductsMenu = ({ dropName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { productData } = useSelector(state => state.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const uniqueItems = productData.filter((data, index, self) => {
    return (
      dropName === "Categories"
        ? self.findIndex(item => item.category === data.category) === index
        : self.findIndex(item => item.subcategory === data.subcategory) === index
    );
  });

  const catHandler = (key) => {
    setAnchorEl(null);
    dispatch(
      getSearchedProducts(
        dropName === "Categories" ? "searchProductbyCategory" : "searchProductbySubCategory",
        key
      )
    );
    if (location.pathname !== "/ProductSearch") {
      navigate("/ProductSearch");
    }
  };

  return (
    <div style={{ marginLeft: "2rem" }}>
      <LightPurpleButton
        id="customized-button"
        aria-controls={open ? 'customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        sx={{
          borderRadius: 2,
          px: 2.5,
          py: 1,
          fontWeight: 600,
          backgroundColor: '#f3e5f5',
          color: '#6a1b9a',
          '&:hover': {
            backgroundColor: '#e1bee7',
          }
        }}
      >
        {dropName}
      </LightPurpleButton>

      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            borderRadius: 2,
            mt: 1,
            minWidth: 220,
            p: 1,
            backgroundColor: '#fafafa',
          }
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: '#6a1b9a', fontWeight: 'bold' }}>
          {dropName === "Categories" ? "Browse Categories" : "Browse Subcategories"}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        {uniqueItems.map((data) => {
          const text = dropName === "Categories" ? data.category : data.subcategory;
          const icon = dropName === "Categories" ? <CategoryIcon fontSize="small" /> : <SubcategoryIcon fontSize="small" />;

          return (
            <MenuItem
              key={data._id}
              onClick={() => catHandler(text)}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 1,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: alpha('#6a1b9a', 0.1),
                  transform: 'translateX(4px)',
                },
              }}
            >
              {icon}
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                {text}
              </Typography>
            </MenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
};

export default ProductsMenu;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(1),
    boxShadow:
      '0px 4px 8px rgba(0,0,0,0.05), 0px 2px 4px rgba(0,0,0,0.1)',
  },
}));
