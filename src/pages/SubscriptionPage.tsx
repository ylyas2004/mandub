import React, { useState, useEffect } from 'react';
import { FaCheck, FaChevronRight } from 'react-icons/fa';
import './SubscriptionPage.css';

interface PlanFeature {
  title: string;
  free: boolean;
  plus: boolean;
  pro: boolean;
}

const SubscriptionPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'plus' | 'pro' | null>(null);
  const [animatedIndex, setAnimatedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Initialize card animations with a staggered effect
    const cards = document.querySelectorAll('.plan-card');
    console.log(animatedIndex);
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animated');
      }, 100 * index);
    });
  }, []);

  // Simplified feature descriptions
  const features: PlanFeature[] = [
    { title: 'Basic manga library', free: true, plus: true, pro: true },
    { title: 'Ad-free experience', free: false, plus: true, pro: true },
    { title: 'Offline reading', free: false, plus: true, pro: true },
    { title: 'Audio dubbing', free: false, plus: true, pro: true },
    { title: 'Early access chapters', free: false, plus: false, pro: true },
    { title: 'Exclusive pro titles', free: false, plus: false, pro: true },
  ];

  const handleSelectPlan = (plan: 'free' | 'plus' | 'pro') => {
    setSelectedPlan(plan);
    // In a real app, would navigate to payment page for plus/pro
    console.log(`Selected plan: ${plan}`);
  };

  const handleMouseEnter = (index: number) => {
    setAnimatedIndex(index);
  };

  const handleMouseLeave = () => {
    setAnimatedIndex(null);
  };

  return (
    <div className="subscription-page">
      <div className="subscription-header">
        <h1>Choose Your Plan</h1>
        <p>Unlock the full manga experience</p>
      </div>

      <div className="subscription-plans">
        {/* Free Plan */}
        <div 
          className={`plan-card ${selectedPlan === 'free' ? 'selected' : ''}`}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="plan-header">
            <h2>Free</h2>
            <div className="plan-price">
              <span className="price">$0</span>
              <span className="period">/mo</span>
            </div>
          </div>
          <div className="plan-features">
            <ul>
              {features.map((feature, index) => (
                <li key={index} className={!feature.free ? 'unavailable' : ''}>
                  {feature.free ? <FaCheck className="check-icon" /> : <span className="dash">—</span>}
                  <span>{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <button 
            className="plan-button"
            onClick={() => handleSelectPlan('free')}
          >
            Start <FaChevronRight />
          </button>
        </div>

        {/* Plus Plan */}
        <div 
          className={`plan-card ${selectedPlan === 'plus' ? 'selected' : ''}`}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="plan-header">
            <h2>Plus</h2>
            <div className="plan-price">
              <span className="price">$4.99</span>
              <span className="period">/mo</span>
            </div>
          </div>
          <div className="plan-features">
            <ul>
              {features.map((feature, index) => (
                <li key={index} className={!feature.plus ? 'unavailable' : ''}>
                  {feature.plus ? <FaCheck className="check-icon" /> : <span className="dash">—</span>}
                  <span>{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <button 
            className="plan-button"
            onClick={() => handleSelectPlan('plus')}
          >
            Subscribe <FaChevronRight />
          </button>
        </div>

        {/* Pro Plan */}
        <div 
          className={`plan-card ${selectedPlan === 'pro' ? 'selected' : ''}`}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="plan-header">
            <h2>Pro</h2>
            <div className="plan-price">
              <span className="price">$9.99</span>
              <span className="period">/mo</span>
            </div>
          </div>
          <div className="plan-features">
            <ul>
              {features.map((feature, index) => (
                <li key={index} className={!feature.pro ? 'unavailable' : ''}>
                  {feature.pro ? <FaCheck className="check-icon" /> : <span className="dash">—</span>}
                  <span>{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <button 
            className="plan-button" 
            onClick={() => handleSelectPlan('pro')}
          >
            Go Pro <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="subscription-info">
        <p>Cancel anytime. All prices include applicable taxes.</p>
      </div>
    </div>
  );
};

export default SubscriptionPage;