import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Crown, Star } from 'lucide-react';

interface Plan {
  id: number;
  name: string;
  duration_months: number;
  price: number;
  description: string;
}

interface Subscription {
  id: number;
  plan_id: number;
  start_date: string;
  end_date: string;
  status: string;
  name: string;
  duration_months: number;
  price: number;
  description: string;
}

export function SubscriptionPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<number | null>(null);

  useEffect(() => {
    fetchPlans();
    fetchCurrentSubscription();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/subscriptions/plans');
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const fetchCurrentSubscription = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/subscriptions/current', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCurrentSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setSubscribing(planId);
    try {
      const response = await fetch('http://localhost:5000/api/subscriptions/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ plan_id: planId }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Subscription successful!');
        fetchCurrentSubscription();
      } else {
        alert(data.message || 'Subscription failed');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Network error');
    } finally {
      setSubscribing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[#1C1C1C] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[#1C1C1C]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-[#B0B0B0] text-lg">Unlock premium features and take your fitness journey to the next level</p>
        </div>

        {currentSubscription && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-[#4CAF50]/20 to-[#FF6F00]/20 border-[#4CAF50]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Current Plan: {currentSubscription.name}</h3>
                    <p className="text-[#B0B0B0]">Expires on {new Date(currentSubscription.end_date).toLocaleDateString()}</p>
                  </div>
                  <Badge className="bg-[#4CAF50] text-white ml-auto">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`bg-[#2C2C2C] border-gray-700 hover:border-[#4CAF50]/50 transition-all duration-300 ${
                currentSubscription?.plan_id === plan.id ? 'ring-2 ring-[#4CAF50]' : ''
              }`}
            >
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-[#4CAF50] mt-2">
                  ₹{plan.price}
                  <span className="text-sm text-[#B0B0B0] font-normal">
                    /{plan.duration_months === 12 ? 'year' : plan.duration_months === 3 ? '3 months' : 'month'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-[#B0B0B0] text-center mb-6">{plan.description}</p>
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={subscribing === plan.id || currentSubscription?.plan_id === plan.id}
                  className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {subscribing === plan.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Subscribing...
                    </>
                  ) : currentSubscription?.plan_id === plan.id ? (
                    'Current Plan'
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-[#2C2C2C] border-gray-700 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-[#4CAF50]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Why Choose Premium?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                  <span className="text-[#B0B0B0]">Unlimited workout plans</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                  <span className="text-[#B0B0B0]">Advanced recipe suggestions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                  <span className="text-[#B0B0B0]">Progress tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                  <span className="text-[#B0B0B0]">Priority support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
