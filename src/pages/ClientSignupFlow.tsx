import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientSignupModal } from '../components/ClientSignupModal';

const ClientSignupFlow: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <ClientSignupModal 
        isOpen={true} 
        onClose={handleClose}
      />
    </div>
  );
};

export default ClientSignupFlow;
