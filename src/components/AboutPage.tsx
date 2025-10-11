import React from 'react';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Target, Users, Award, Heart, Zap, Shield } from 'lucide-react';
import madhuraImage from 'figma:asset/7d0b5db360f688264bb2bd73df8abe44fb0923a0.png';

export function AboutPage() {
  const teamMembers = [
    {
      name: 'Madhura Patil',
      role: 'Founder & CEO',
      bio: 'Passionate health and wellness advocate dedicated to making fitness accessible through innovative technology solutions.',
      image: madhuraImage
    }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8 text-[#4CAF50]" />,
      title: 'Personalization',
      description: 'We believe every fitness journey is unique, so we create personalized plans that fit your lifestyle.'
    },
    {
      icon: <Users className="w-8 h-8 text-[#4CAF50]" />,
      title: 'Community',
      description: 'Building a supportive community where everyone can share their health and wellness journey.'
    },
    {
      icon: <Award className="w-8 h-8 text-[#4CAF50]" />,
      title: 'Excellence',
      description: 'Committed to providing the highest quality fitness and nutrition recommendations.'
    },
    {
      icon: <Heart className="w-8 h-8 text-[#4CAF50]" />,
      title: 'Wellness',
      description: 'Promoting holistic health that encompasses physical, mental, and emotional well-being.'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#1C1C1C]">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#4CAF50]/30">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            About <span className="text-[#4CAF50]">FitGen</span>
          </h1>
          <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make fitness and healthy eating accessible to everyone through 
            the power of AI and personalized recommendations. Our platform combines cutting-edge 
            technology with proven health principles to help you achieve your wellness goals.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our <span className="text-[#4CAF50]">Mission</span></h2>
              <p className="text-lg text-[#B0B0B0] mb-6 leading-relaxed">
                At FitGen, we believe that everyone deserves access to personalized fitness and nutrition guidance. 
                Our AI-powered platform removes the barriers that often prevent people from leading healthier lives.
              </p>
              <p className="text-lg text-[#B0B0B0] mb-6 leading-relaxed">
                Whether you're a complete beginner or a fitness enthusiast, our tools adapt to your unique needs, 
                preferences, and constraints to create plans that actually work for your lifestyle.
              </p>
              <p className="text-lg text-[#B0B0B0] leading-relaxed">
                We're committed to making health and wellness achievable, sustainable, and enjoyable for everyone.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50]/20 to-[#FF6F00]/20 rounded-2xl blur-3xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="relative w-full h-80 object-cover rounded-2xl shadow-2xl border border-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our <span className="text-[#4CAF50]">Values</span></h2>
            <p className="text-xl text-[#B0B0B0]">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-[#2C2C2C] border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 rounded-xl text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50]/20 to-[#4CAF50]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#4CAF50]/20">
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg">{value.title}</h3>
                  <p className="text-[#B0B0B0] leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our <span className="text-[#4CAF50]">Team</span></h2>
            <p className="text-xl text-[#B0B0B0]">
              Passionate experts dedicated to your health and wellness journey
            </p>
          </div>
          <div className="flex justify-center">
            <Card className="bg-[#2C2C2C] border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/10 transition-all duration-300 rounded-xl text-center group max-w-sm">
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <img
                    src={madhuraImage}
                    alt="Madhura Patil"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-[#4CAF50]/30 group-hover:border-[#4CAF50] transition-colors duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#4CAF50]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-bold text-white mb-2 text-xl">Madhura Patil</h3>
                <p className="text-[#4CAF50] font-semibold mb-4 text-lg">Founder & CEO</p>
                <p className="text-[#B0B0B0] leading-relaxed">
                  Passionate health and wellness advocate dedicated to making fitness accessible through innovative technology solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-[#2C2C2C] to-[#343434] rounded-2xl p-8 mb-16 border border-gray-700 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Our <span className="text-[#4CAF50]">Impact</span></h2>
            <p className="text-xl text-[#B0B0B0]">Making a difference in people's lives</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-[#4CAF50] mb-2 group-hover:scale-110 transition-transform duration-300">10,000+</div>
              <p className="text-[#B0B0B0] font-medium">Fitness Plans Created</p>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-[#4CAF50] mb-2 group-hover:scale-110 transition-transform duration-300">25,000+</div>
              <p className="text-[#B0B0B0] font-medium">Recipes Generated</p>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-[#4CAF50] mb-2 group-hover:scale-110 transition-transform duration-300">5,000+</div>
              <p className="text-[#B0B0B0] font-medium">Happy Users</p>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-[#4CAF50] mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
              <p className="text-[#B0B0B0] font-medium">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#4CAF50] mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Get In <span className="text-[#4CAF50]">Touch</span></h2>
          <p className="text-lg text-[#B0B0B0] mb-8 leading-relaxed">
            Have questions or want to learn more? We'd love to hear from you.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <Card className="bg-[#2C2C2C] border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/10 transition-all duration-300 rounded-xl">
              <CardContent className="p-6 text-center">
                <h4 className="font-bold text-white mb-2 text-lg">Email</h4>
                <p className="text-[#4CAF50] font-medium">hello@fitgen.com</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2C2C2C] border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/10 transition-all duration-300 rounded-xl">
              <CardContent className="p-6 text-center">
                <h4 className="font-bold text-white mb-2 text-lg">Phone</h4>
                <p className="text-[#4CAF50] font-medium">+1 (555) 123-4567</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2C2C2C] border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/10 transition-all duration-300 rounded-xl">
              <CardContent className="p-6 text-center">
                <h4 className="font-bold text-white mb-2 text-lg">Address</h4>
                <p className="text-[#B0B0B0]">123 Health St, Wellness City, WC 12345</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}