import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Paper, Typography, Avatar } from '@mui/material';

const SellerProfile = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <ProfileContainer>
      <ProfileCard elevation={4}>
        <StyledAvatar>
          {currentUser?.name ? currentUser.name[0].toUpperCase() : ''}
        </StyledAvatar>
        <ProfileName variant="h5">
          {currentUser?.name || 'N/A'}
        </ProfileName>
        <ProfileInfo variant="subtitle1">
          ✉️ Email: <strong>{currentUser?.email || 'N/A'}</strong>
        </ProfileInfo>
        <ProfileInfo variant="subtitle1">
          🛠 Role: <strong>{currentUser?.role || 'N/A'}</strong>
        </ProfileInfo>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default SellerProfile;

// Styled Components
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: linear-gradient(to right, #ece9e6, #ffffff);
  min-height: 100vh;
`;

const ProfileCard = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  border-radius: 20px;
  background-color: #fafafa;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const StyledAvatar = styled(Avatar)`
  && {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: white;
    width: 100px;
    height: 100px;
    font-size: 36px;
    margin-bottom: 20px;
  }
`;

const ProfileName = styled(Typography)`
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const ProfileInfo = styled(Typography)`
  color: #555;
  margin-top: 8px;
  text-align: center;
`;
