import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userSlice';
import styled from 'styled-components';
import { updateCustomer } from '../redux/userHandle';

const Logout = () => {
  const { currentUser, currentRole } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentRole === "Customer" && currentUser) {
      dispatch(updateCustomer(currentUser, currentUser._id));
    }
  }, [currentRole, currentUser, dispatch]);

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Overlay>
      <LogoutContainer>
        <h2>Goodbye, {currentUser?.name || "User"}!</h2>
        <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
        <ButtonGroup>
          <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
          <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
        </ButtonGroup>
      </LogoutContainer>
    </Overlay>
  );
};

export default Logout;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const LogoutContainer = styled.div`
  background: #fefefe;
  border-radius: 12px;
  padding: 30px 40px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const LogoutMessage = styled.p`
  font-size: 18px;
  color: #333;
  margin: 20px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #4b2e2e;
  color: white;
  &:hover {
    background-color: #6f4242;
  }
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #e0e0ff;
  color: black;
  &:hover {
    background-color: #333;
    color: white;
  }
`;
