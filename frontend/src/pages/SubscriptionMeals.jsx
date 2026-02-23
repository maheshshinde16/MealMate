import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { activateSubscription, createSubscription, getUserSubscriptions } from '../api/subscriptionApi';
import './SubscriptionMeals.css';

const SubscriptionMeals = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userId = useMemo(() => user?.id, [user]);

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const defaultPlans = [
    {
      planType: 'DAILY',
      planName: 'Daily Essentials',
      monthlyPrice: 2499,
      description: 'Fresh daily meals with flexible swaps.',
      mealsPerWeek: 7,
      isActive: false,
    },
    {
      planType: 'WEEKLY',
      planName: 'Weekly Saver',
      monthlyPrice: 1999,
      description: 'Save more with weekly curated plans.',
      mealsPerWeek: 5,
      isActive: false,
    },
    {
      planType: 'CORPORATE',
      planName: 'Corporate Fuel',
      monthlyPrice: 4999,
      description: 'Team meals with priority support.',
      mealsPerWeek: 10,
      isActive: false,
    },
  ];

  const fetchSubscriptions = async () => {
    if (!userId) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await getUserSubscriptions(userId);
      const data = response?.data?.data || [];
      setSubscriptions(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [userId]);

  const handleActivate = async (subscriptionId) => {
    if (!userId) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await activateSubscription(subscriptionId, userId);
      const updated = response?.data?.data;

      setSubscriptions((prev) =>
        prev.map((item) => (item.id === updated?.id ? updated : item))
      );
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to activate subscription');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDefaults = async () => {
    if (!userId) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await Promise.all(defaultPlans.map((plan) => createSubscription(userId, plan)));
      await fetchSubscriptions();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlan = async (plan) => {
    if (!userId) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createSubscription(userId, plan);
      await fetchSubscriptions();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="subscription-meals">
      <div className="subscription-meals__container">
        <header className="subscription-meals__header">
          <div>
            <h1>Subscription Meals</h1>
            <p>Activate your plan and start fresh meals on schedule.</p>
          </div>
          <Link to="/browse" className="subscription-meals__browse">
            Browse meals
          </Link>
        </header>

        {!isAuthenticated && (
          <div className="subscription-meals__empty">
            <p>Sign in to manage your subscriptions.</p>
            <Link to="/login" className="subscription-meals__cta">
              Sign in
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <>
            {loading && <p className="subscription-meals__status">Loading subscriptions...</p>}
            {error && <p className="subscription-meals__error">{error}</p>}

            {!loading && subscriptions.length === 0 && !error && (
              <div className="subscription-meals__empty">
                <p>No subscriptions yet. Pick a plan to get started.</p>
                <div className="subscription-meals__empty-actions">
                  <button
                    type="button"
                    className="subscription-meals__cta"
                    onClick={() => handleAddPlan(defaultPlans[0])}
                  >
                    Add Daily plan
                  </button>
                  <button
                    type="button"
                    className="subscription-meals__cta"
                    onClick={() => handleAddPlan(defaultPlans[1])}
                  >
                    Add Weekly plan
                  </button>
                  <button
                    type="button"
                    className="subscription-meals__cta"
                    onClick={() => handleAddPlan(defaultPlans[2])}
                  >
                    Add Corporate plan
                  </button>
                  <button
                    type="button"
                    className="subscription-meals__cta is-secondary"
                    onClick={handleAddDefaults}
                  >
                    Add default subscriptions
                  </button>
                  <Link to="/browse" className="subscription-meals__cta is-secondary">
                    Explore meals
                  </Link>
                </div>
              </div>
            )}

            <div className="subscription-meals__grid">
              {subscriptions.map((subscription) => (
                <article key={subscription.id} className="subscription-meals__card">
                  <div className="subscription-meals__card-header">
                    <div>
                      <h3>{subscription.planName || 'Meal Plan'}</h3>
                      <p className="subscription-meals__type">{subscription.planType}</p>
                    </div>
                    <span
                      className={
                        subscription.isActive
                          ? 'subscription-meals__status-pill is-active'
                          : 'subscription-meals__status-pill'
                      }
                    >
                      {subscription.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="subscription-meals__details">
                    <p>
                      <strong>Price:</strong> {subscription.monthlyPrice ? `₹${subscription.monthlyPrice}` : 'N/A'}
                    </p>
                    <p>
                      <strong>Meals/week:</strong> {subscription.mealsPerWeek || 'N/A'}
                    </p>
                    <p className="subscription-meals__description">{subscription.description || 'No description provided.'}</p>
                  </div>

                  <button
                    className="subscription-meals__activate"
                    onClick={() => handleActivate(subscription.id)}
                    disabled={loading || subscription.isActive}
                  >
                    {subscription.isActive ? 'Active' : 'Activate'}
                  </button>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SubscriptionMeals;
