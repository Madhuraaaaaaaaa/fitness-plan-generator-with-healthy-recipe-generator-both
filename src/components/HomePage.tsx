import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dumbbell, ChefHat, Target, Clock, Users, Award, Zap, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: <Target className="w-6 h-6 text-[#4CAF50]" />,
      title: "Personalized Plans",
      description: "Get fitness plans tailored to your goals, fitness level, and preferences."
    },
    {
      icon: <ChefHat className="w-6 h-6 text-[#4CAF50]" />,
      title: "Smart Recipes",
      description: "Generate recipes based on ingredients you have available at home."
    },
    {
      icon: <Zap className="w-6 h-6 text-[#4CAF50]" />,
      title: "Quick & Easy",
      description: "Get results in seconds with our AI-powered generators."
    },
    {
      icon: <Award className="w-6 h-6 text-[#4CAF50]" />,
      title: "Expert Approved",
      description: "All plans are based on proven fitness and nutrition principles."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content: "This platform completely transformed my approach to fitness and nutrition. The personalized plans are amazing!"
    },
    {
      name: "Mike Chen",
      role: "Busy Professional",
      content: "Finally, a tool that creates realistic fitness plans that fit my schedule. Highly recommended!"
    },
    {
      name: "Emily Davis",
      role: "Home Cook",
      content: "The recipe generator is incredible! I never run out of ideas for healthy meals anymore."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Build Strength.{' '}
                <span className="text-[#4CAF50] drop-shadow-lg">Eat Smart.</span>
              </h1>
              <p className="text-xl text-[#B0B0B0] mb-8 max-w-2xl leading-relaxed">
                Get personalized fitness plans and discover delicious recipes with ingredients you already have. 
                Transform your health journey with AI-powered recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => onNavigate('fitness')}
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-[#4CAF50]/40 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  <Dumbbell className="w-5 h-5 mr-2" />
                  Generate Fitness Plan
                </Button>
                <Button
                  onClick={() => onNavigate('recipe')}
                  variant="outline"
                  className="border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl hover:shadow-lg hover:shadow-[#4CAF50]/30 transform hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  <ChefHat className="w-5 h-5 mr-2" />
                  Generate Recipe
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50]/20 to-[#FF6F00]/20 rounded-2xl blur-3xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581122583802-9e2afdc5ab7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwaGVhbHRoeSUyMGZvb2QlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzU3NDg3MzUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fitness and healthy lifestyle"
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl border border-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#1C1C1C] to-[#2C2C2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose <span className="text-[#4CAF50]">FitGen?</span>
            </h2>
            <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with proven health principles to deliver results that work for you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-[#2C2C2C] border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 rounded-xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#4CAF50]/20">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-3 text-lg">{feature.title}</h3>
                  <p className="text-[#B0B0B0] leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-[#4CAF50] mb-2 group-hover:scale-110 transition-transform duration-300">10,000+</div>
              <p className="text-[#B0B0B0] text-lg">Fitness Plans Generated</p>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-[#4CAF50] mb-2 group-hover:scale-110 transition-transform duration-300">25,000+</div>
              <p className="text-[#B0B0B0] text-lg">Recipes Created</p>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-[#4CAF50] mb-2 group-hover:scale-110 transition-transform duration-300">5,000+</div>
              <p className="text-[#B0B0B0] text-lg">Happy Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-[#2C2C2C] to-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              What Our <span className="text-[#4CAF50]">Athletes</span> Say
            </h2>
            <p className="text-xl text-[#B0B0B0]">
              Join thousands of people who have transformed their health with FitGen
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#2C2C2C] border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/10 transition-all duration-300 rounded-xl group">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex text-[#4CAF50] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-[#B0B0B0] mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  </div>
                  <div className="border-t border-gray-700 pt-6">
                    <p className="font-semibold text-white text-lg">{testimonial.name}</p>
                    <p className="text-sm text-[#4CAF50]">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#4CAF50] to-[#45a049] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Get your personalized fitness plan and discover amazing recipes today!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={() => onNavigate('fitness')}
              className="bg-white text-[#4CAF50] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-white/30 transform hover:scale-105 transition-all duration-300"
              size="lg"
            >
              <Dumbbell className="w-5 h-5 mr-2" />
              Start Your Fitness Plan
            </Button>
            <Button
              onClick={() => onNavigate('recipe')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#4CAF50] px-8 py-4 text-lg font-semibold rounded-xl hover:shadow-lg hover:shadow-white/30 transform hover:scale-105 transition-all duration-300"
              size="lg"
            >
              <ChefHat className="w-5 h-5 mr-2" />
              Explore Recipes
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}