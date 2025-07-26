'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, MapPin, Globe, Mail, Briefcase, Zap, List, Download, Bell, ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center select-none">
            <span className="text-xl md:text-2xl font-bold text-blue-600">Local</span>
            <span className="text-xl md:text-2xl font-bold text-orange-500 ml-1">Zarurat</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {/* Language Dropdown */}
            <div className="flex items-center space-x-1 text-sm text-blue-600 cursor-pointer font-medium">
              <Globe className="w-4 h-4" />
              <span>EN</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <a href="#" className="text-sm font-semibold hover:text-blue-600 hidden xl:block">We are Hiring</a>
            <a href="#" className="text-sm font-semibold hover:text-blue-600 hidden xl:block">Investor Relations</a>
            {/* Leads with red dot */}
            <div className="flex items-center space-x-1 text-sm relative font-medium">
              <Mail className="w-4 h-4" />
              <span className="hover:text-blue-600 hidden md:block">Leads</span>
              <span className="absolute -top-1 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center space-x-1 text-sm font-medium">
              <Briefcase className="w-4 h-4" />
              <a href="#" className="hover:text-blue-600 hidden md:block">Advertise</a>
            </div>
            {/* Free Listing with BUSINESS badge */}
            <div className="flex items-center space-x-1 text-sm font-medium">
              <List className="w-4 h-4" />
              <a href="#" className="hover:text-blue-600 hidden md:block">Free Listing</a>
              <span className="ml-1 px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded align-middle hidden md:inline" style={{lineHeight: '1.1'}}>BUSINESS</span>
            </div>
            {/* Bell Icon */}
            <Bell className="w-5 h-5 text-gray-700" />
            {/* Login/Sign Up Button */}
            <button className="bg-blue-600 text-white px-4 md:px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 ml-2">
              <span className="hidden md:block">Login / Sign Up</span>
              <span className="md:hidden">Login</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium">
                <Globe className="w-4 h-4" />
                <span>Language: EN</span>
              </div>
              <a href="#" className="block text-sm font-semibold hover:text-blue-600 py-2">We are Hiring</a>
              <a href="#" className="block text-sm font-semibold hover:text-blue-600 py-2">Investor Relations</a>
              <div className="flex items-center space-x-2 text-sm font-medium py-2">
                <Mail className="w-4 h-4" />
                <span>Leads</span>
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-medium py-2">
                <Briefcase className="w-4 h-4" />
                <span>Advertise</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-medium py-2">
                <List className="w-4 h-4" />
                <span>Free Listing</span>
                <span className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded">BUSINESS</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-medium py-2">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-blue-700">
                Login / Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}