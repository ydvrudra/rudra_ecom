import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticatedUser, user } = useSelector((state) => state.user);

  if (loading) return <div>Loading...</div>; // Show loading feedback

  if (!isAuthenticatedUser) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
