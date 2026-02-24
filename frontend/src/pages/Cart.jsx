import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, MinusOutlined, PlusOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import orderApi from '../api/orderApi';
import userApi from '../api/userApi';
import { login as loginAction } from '../store/authSlice';
import Button from '../components/Button';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, vendorId } = useCart();
  const user = useSelector(state => state.auth.user);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState('');
  const addressInputRef = useRef(null);
  const placeElementRef = useRef(null);
  const placeElementHostRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const deliveryFee = 40;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (user?.address && !deliveryAddress) {
      setDeliveryAddress(user.address);
    }
  }, [user, deliveryAddress]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
    if (!apiKey) {
      setMapError('Google Maps API key is missing.');
      return;
    }

    window.gm_authFailure = () => {
      setMapError('Google Maps authentication failed. Check the API key and referrer restrictions.');
    };

    const existingScript = document.querySelector('script[data-google-maps]');
    if (existingScript && window.google?.maps?.places) {
      setMapReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-google-maps', 'true');
    script.onload = () => setMapReady(true);
    script.onerror = () => setMapError('Failed to load Google Maps.');
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!mapReady || !addressInputRef.current || !window.google?.maps?.places) {
      return;
    }

    if (!mapInstanceRef.current && mapContainerRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });
    }

    const updateMapForPlace = (formatted, location) => {
      if (formatted) {
        setDeliveryAddress(formatted);
      }

      if (location && mapInstanceRef.current) {
        if (!markerRef.current) {
          markerRef.current = new window.google.maps.Marker({
            map: mapInstanceRef.current,
            position: location
          });
        } else {
          markerRef.current.setPosition(location);
        }
        mapInstanceRef.current.setCenter(location);
        mapInstanceRef.current.setZoom(15);
      }
    };

    if (window.google.maps.places.PlaceAutocompleteElement) {
      if (!placeElementHostRef.current) {
        return;
      }

      if (!placeElementRef.current) {
        const placeElement = new window.google.maps.places.PlaceAutocompleteElement({
          types: ['geocode']
        });
        placeElement.setAttribute('class', 'address-input');
        placeElement.setAttribute('placeholder', 'Search location or type address');
        placeElementHostRef.current.innerHTML = '';
        placeElementHostRef.current.appendChild(placeElement);
        placeElementRef.current = placeElement;

        if (addressInputRef.current) {
          addressInputRef.current.style.display = 'none';
        }

        placeElement.addEventListener('gmp-placeselect', async (event) => {
          const place = event.place;
          if (!place) {
            return;
          }

          try {
            await place.fetchFields({ fields: ['formattedAddress', 'location', 'displayName'] });
            const formatted = place.formattedAddress || place.displayName || '';
            updateMapForPlace(formatted, place.location);
          } catch (error) {
            console.error('Failed to fetch place details:', error);
          }
        });
      }

      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      fields: ['formatted_address', 'geometry', 'name'],
      types: ['geocode']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const formatted = place.formatted_address || place.name || '';
      updateMapForPlace(formatted, place.geometry?.location);
    });
  }, [mapReady]);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    const userId = user?.id || user?._id;
    if (!userId) {
      alert('Your account is missing an ID. Please log out and log back in.');
      return;
    }

    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address');
      return;
    }

    setIsProcessing(true);
    try {
      const orderData = {
        userId: userId,
        vendorId: vendorId,
        items: cartItems.map(item => ({
          menuItemId: item.id,
          menuItemName: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity
        })),
        totalAmount: total,
        status: 'PENDING',
        deliveryAddress: deliveryAddress,
        paymentMethod: paymentMethod,
        specialInstructions: specialInstructions
      };

      const response = await orderApi.createOrder(orderData);
      
      if (response) {
        if (user?.id && deliveryAddress && deliveryAddress !== user.address) {
          try {
            const updatedUser = { ...user, address: deliveryAddress };
            await userApi.updateUser(user.id, updatedUser);
            const token = sessionStorage.getItem('token');
            dispatch(loginAction({ user: updatedUser, token }));
          } catch (updateError) {
            console.error('Failed to update user address:', updateError);
          }
        }
        clearCart();
        alert('Order placed successfully!');
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      const message = error.response?.data?.message
        || error.response?.data?.error
        || error.message
        || 'Failed to place order. Please try again.';
      alert(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">
          <ShoppingOutlined /> Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to get started!</p>
            <Button variant="primary" onClick={() => navigate('/browse')}>
              Browse Restaurants
            </Button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-section">
              <h2>Order Items ({cartItems.length})</h2>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img 
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&auto=format'} 
                      alt={item.name}
                    />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        <MinusOutlined />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        <PlusOutlined />
                      </button>
                    </div>
                    <p className="item-subtotal">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-section">
              <div className="cart-summary">
                <h2>Order Summary</h2>
                
                <div className="delivery-form">
                  <label>Delivery Address *</label>
                  <input
                    ref={addressInputRef}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Search location or type address"
                    className="address-input"
                    required
                  />
                  <div ref={placeElementHostRef}></div>
                  <p className="address-hint">Select a place from the suggestions for precise delivery.</p>
                  {mapError && <p className="map-error">{mapError}</p>}
                  <div className="map-preview" ref={mapContainerRef}></div>
                </div>

                <div className="payment-method">
                  <label>Payment Method *</label>
                  <select 
                    value={paymentMethod} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="CARD">Credit/Debit Card</option>
                    <option value="UPI">UPI</option>
                    <option value="COD">Cash on Delivery</option>
                  </select>
                </div>

                <div className="special-instructions">
                  <label>Special Instructions (Optional)</label>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any specific requirements?"
                    rows={2}
                  />
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <Button 
                  variant="success" 
                  fullWidth 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>

                <button 
                  className="clear-cart-btn"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
