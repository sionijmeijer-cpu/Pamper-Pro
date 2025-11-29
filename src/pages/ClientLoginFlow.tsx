import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientAuthModal } from '../components/ClientAuthModal';

const ClientLoginFlow: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const handleAuthenticated = (user: any) => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      <ClientAuthModal 
        isOpen={true}
        onClose={handleClose}
        onAuthenticated={handleAuthenticated}
      />
    </div>
  );
};

export default ClientLoginFlow;
