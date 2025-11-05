import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser, FaMapMarkerAlt, FaCreditCard, FaCrown, FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser, addAddress, deleteAddress } = useAuth();
  const { success } = useNotification();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: ''
  });

  if (!isAuthenticated) {
    navigate('/login?redirect=/profile');
    return null;
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
    success('Profile updated successfully!');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    addAddress(newAddress);
    setShowAddressForm(false);
    setNewAddress({
      fullName: '',
      phone: '',
      pincode: '',
      address: '',
      city: '',
      state: ''
    });
    success('Address added successfully!');
  };

  return (
    <Container>
      <Sidebar>
        <UserInfo>
          <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserInfo>

        <Menu>
          <MenuItem 
            $active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile Information
          </MenuItem>
          <MenuItem 
            $active={activeTab === 'addresses'}
            onClick={() => setActiveTab('addresses')}
          >
            <FaMapMarkerAlt /> Manage Addresses
          </MenuItem>
          <MenuItem 
            $active={activeTab === 'payment'}
            onClick={() => setActiveTab('payment')}
          >
            <FaCreditCard /> Payment Methods
          </MenuItem>
          {user.isPrime && (
            <MenuItem 
              $active={activeTab === 'prime'}
              onClick={() => setActiveTab('prime')}
            >
              <FaCrown /> Prime Membership
            </MenuItem>
          )}
        </Menu>
      </Sidebar>

      <Content>
        {activeTab === 'profile' && (
          <Section>
            <SectionHeader>
              <SectionTitle>Profile Information</SectionTitle>
              {!isEditing && (
                <EditButton onClick={() => setIsEditing(true)}>
                  <FaEdit /> Edit
                </EditButton>
              )}
            </SectionHeader>

            {isEditing ? (
              <Form onSubmit={handleProfileUpdate}>
                <FormGroup>
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </FormGroup>
                <FormActions>
                  <SaveButton type="submit">Save Changes</SaveButton>
                  <CancelButton type="button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </CancelButton>
                </FormActions>
              </Form>
            ) : (
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Name:</InfoLabel>
                  <InfoValue>{user.name}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Email:</InfoLabel>
                  <InfoValue>{user.email}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Phone:</InfoLabel>
                  <InfoValue>{user.phone || 'Not provided'}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Member Since:</InfoLabel>
                  <InfoValue>{new Date().toLocaleDateString()}</InfoValue>
                </InfoItem>
              </InfoGrid>
            )}
          </Section>
        )}

        {activeTab === 'addresses' && (
          <Section>
            <SectionHeader>
              <SectionTitle>Saved Addresses</SectionTitle>
              <AddButton onClick={() => setShowAddressForm(true)}>
                + Add New Address
              </AddButton>
            </SectionHeader>

            {showAddressForm && (
              <AddressForm onSubmit={handleAddAddress}>
                <FormRow>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      value={newAddress.fullName}
                      onChange={(e) => setNewAddress({...newAddress, fullName: e.target.value})}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone</Label>
                    <Input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      required
                    />
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <Label>Address</Label>
                  <Textarea
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                    rows={3}
                    required
                  />
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <Label>City</Label>
                    <Input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>State</Label>
                    <Input
                      type="text"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Pincode</Label>
                    <Input
                      type="text"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                      maxLength={6}
                      required
                    />
                  </FormGroup>
                </FormRow>
                <FormActions>
                  <SaveButton type="submit">Save Address</SaveButton>
                  <CancelButton type="button" onClick={() => setShowAddressForm(false)}>
                    Cancel
                  </CancelButton>
                </FormActions>
              </AddressForm>
            )}

            <AddressList>
              {user.addresses && user.addresses.length > 0 ? (
                user.addresses.map(addr => (
                  <AddressCard key={addr.id}>
                    {addr.isDefault && <DefaultBadge>Default</DefaultBadge>}
                    <AddressName>{addr.fullName}</AddressName>
                    <AddressText>{addr.address}</AddressText>
                    <AddressText>{addr.city}, {addr.state} - {addr.pincode}</AddressText>
                    <AddressText>Phone: {addr.phone}</AddressText>
                    <AddressActions>
                      <ActionButton>
                        <FaEdit /> Edit
                      </ActionButton>
                      <ActionButton onClick={() => {
                        deleteAddress(addr.id);
                        success('Address deleted');
                      }}>
                        <FaTrash /> Delete
                      </ActionButton>
                    </AddressActions>
                  </AddressCard>
                ))
              ) : (
                <EmptyState>
                  <p>No saved addresses</p>
                  <AddButton onClick={() => setShowAddressForm(true)}>
                    Add Your First Address
                  </AddButton>
                </EmptyState>
              )}
            </AddressList>
          </Section>
        )}

        {activeTab === 'payment' && (
          <Section>
            <SectionTitle>Payment Methods</SectionTitle>
            <EmptyState>
              <p>No saved payment methods</p>
              <AddButton>+ Add Payment Method</AddButton>
            </EmptyState>
          </Section>
        )}

        {activeTab === 'prime' && user.isPrime && (
          <Section>
            <PrimeSection>
              <PrimeHeader>
                <FaCrown size={40} color="#FFD700" />
                <PrimeTitle>Prime Membership</PrimeTitle>
              </PrimeHeader>
              <PrimeInfo>
                <PrimeFeature>✓ Free and fast delivery</PrimeFeature>
                <PrimeFeature>✓ Exclusive deals and offers</PrimeFeature>
                <PrimeFeature>✓ Prime Video access</PrimeFeature>
                <PrimeFeature>✓ Prime Music streaming</PrimeFeature>
                <PrimeFeature>✓ Early access to sales</PrimeFeature>
              </PrimeInfo>
              <PrimeStatus>
                Your Prime membership is active
              </PrimeStatus>
            </PrimeSection>
          </Section>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: var(--bg-secondary);
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 80px;

  @media (max-width: 968px) {
    position: static;
  }
`;

const UserInfo = styled.div`
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--amazon-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  margin: 0 auto 15px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 5px;
`;

const UserEmail = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MenuItem = styled.button`
  padding: 12px 15px;
  background: ${props => props.$active ? 'var(--bg-hover)' : 'transparent'};
  color: var(--text-primary);
  border: none;
  border-radius: 4px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: var(--bg-hover);
  }

  svg {
    font-size: 16px;
  }
`;

const Content = styled.main`
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 30px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Section = styled.div``;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: var(--text-primary);
`;

const EditButton = styled.button`
  padding: 10px 20px;
  background: transparent;
  color: var(--text-link);
  border: 1px solid var(--border-light);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  &:hover {
    background: var(--bg-hover);
    border-color: var(--amazon-orange);
    color: var(--amazon-orange);
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background: var(--amazon-blue);
  color: white;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    background: var(--amazon-light-blue);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--border-light);
  border-radius: 4px;
  font-size: 14px;
  background: var(--bg-primary);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--amazon-orange);
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid var(--border-light);
  border-radius: 4px;
  font-size: 14px;
  background: var(--bg-primary);
  color: var(--text-primary);
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--amazon-orange);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveButton = styled.button`
  padding: 12px 30px;
  background: var(--amazon-yellow);
  color: var(--amazon-blue);
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    background: #f0c14b;
  }
`;

const CancelButton = styled.button`
  padding: 12px 30px;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-light);
  border-radius: 4px;

  &:hover {
    background: var(--bg-hover);
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div`
  padding: 15px;
  background: var(--bg-secondary);
  border-radius: 4px;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
`;

const AddressForm = styled.form`
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AddressList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const AddressCard = styled.div`
  padding: 20px;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  position: relative;
  transition: all 0.2s;

  &:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--amazon-orange);
  }
`;

const DefaultBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--amazon-orange);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
`;

const AddressName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const AddressText = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 5px;
`;

const AddressActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--border-light);
`;

const ActionButton = styled.button`
  padding: 8px 15px;
  background: transparent;
  color: var(--text-link);
  border: 1px solid var(--border-light);
  border-radius: 4px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: var(--bg-hover);
    border-color: var(--amazon-orange);
    color: var(--amazon-orange);
  }

  svg {
    font-size: 12px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;

  p {
    font-size: 16px;
    color: var(--text-secondary);
    margin-bottom: 20px;
  }
`;

const PrimeSection = styled.div`
  background: linear-gradient(135deg, #00A8E1 0%, #0066C0 100%);
  color: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
`;

const PrimeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const PrimeTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
`;

const PrimeInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const PrimeFeature = styled.div`
  font-size: 16px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
`;

const PrimeStatus = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
`;

export default ProfilePage;
