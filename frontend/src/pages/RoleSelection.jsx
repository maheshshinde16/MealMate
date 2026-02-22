import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'user',
      title: 'Customer',
      icon: '🍽️',
      description: 'Order delicious meals from local restaurants',
      benefits: ['Browse restaurants', 'Track orders', 'Save favorites']
    },
    {
      id: 'vendor',
      title: 'Restaurant Partner',
      icon: '👨‍🍳',
      description: 'Grow your restaurant business on MealMate',
      benefits: ['Reach millions of customers', 'Manage orders', 'Track earnings']
    },
    {
      id: 'rider',
      title: 'Delivery Partner',
      icon: '🏍️',
      description: 'Earn by delivering orders in your area',
      benefits: ['Flexible schedule', 'Competitive pay', 'Real-time tracking']
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    if (roleId === 'user') {
      navigate('/register');
    } else if (roleId === 'vendor') {
      navigate('/vendor-register');
    } else if (roleId === 'rider') {
      navigate('/rider-register');
    }
  };

  return (
    <div className="role-selection-page">
      <div className="role-selection-container">
        <div className="role-selection-header">
          <h1>Join MealMate</h1>
          <p>Choose your role to get started</p>
        </div>

        <div className="role-cards-grid">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
              onClick={() => handleRoleSelect(role.id)}
            >
              <div className="role-icon">{role.icon}</div>
              <h2>{role.title}</h2>
              <p className="role-description">{role.description}</p>
              <ul className="role-benefits">
                {role.benefits.map((benefit, idx) => (
                  <li key={idx}>✓ {benefit}</li>
                ))}
              </ul>
              <button className="role-select-btn">
                {selectedRole === role.id ? 'Selected' : 'Continue'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
