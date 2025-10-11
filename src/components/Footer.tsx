import React from 'react';
import { Separator } from './ui/separator';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Dumbbell } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Fitness Generator', href: '#' },
    { name: 'Recipe Generator', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: '#' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '#' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: '#' }
  ];

  return (
    <footer className="bg-[#121212] text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#45a049] rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#4CAF50]">FitGen</h3>
            </div>
            <p className="text-[#B0B0B0] mb-6 leading-relaxed">
              Empowering your fitness journey with AI-powered personalized plans and recipes. 
              Transform your health, one goal at a time.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-[#2C2C2C] rounded-lg flex items-center justify-center text-[#B0B0B0] hover:text-[#4CAF50] hover:bg-[#4CAF50]/10 hover:shadow-lg hover:shadow-[#4CAF50]/20 transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-[#B0B0B0] hover:text-[#4CAF50] transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center text-[#B0B0B0] group">
                <div className="w-8 h-8 bg-[#4CAF50]/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#4CAF50]/30 transition-colors duration-200">
                  <Mail className="w-4 h-4 text-[#4CAF50]" />
                </div>
                <span className="group-hover:text-[#4CAF50] transition-colors duration-200">hello@fitgen.com</span>
              </div>
              <div className="flex items-center text-[#B0B0B0] group">
                <div className="w-8 h-8 bg-[#4CAF50]/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#4CAF50]/30 transition-colors duration-200">
                  <Phone className="w-4 h-4 text-[#4CAF50]" />
                </div>
                <span className="group-hover:text-[#4CAF50] transition-colors duration-200">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start text-[#B0B0B0] group">
                <div className="w-8 h-8 bg-[#4CAF50]/20 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:bg-[#4CAF50]/30 transition-colors duration-200">
                  <MapPin className="w-4 h-4 text-[#4CAF50]" />
                </div>
                <span className="group-hover:text-[#4CAF50] transition-colors duration-200 leading-relaxed">
                  123 Health Street<br />
                  Wellness City, WC 12345
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Stay Updated</h4>
            <p className="text-[#B0B0B0] mb-6 leading-relaxed">
              Get the latest fitness tips and healthy recipes delivered to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-[#2C2C2C] border border-gray-700 rounded-l-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all duration-200"
              />
              <button className="px-6 py-3 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-r-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#4CAF50]/30 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-[#B0B0B0]">
            © {currentYear} FitGen. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-[#B0B0B0] hover:text-[#4CAF50] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-[#B0B0B0] hover:text-[#4CAF50] transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-[#B0B0B0] hover:text-[#4CAF50] transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}