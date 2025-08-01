// lib/api.ts - API utility functions

export interface Category {
  _id: string;
  name: string;
  icon: string;
  description: string;
  vendorCount: number;
  slug: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  image: string;
  thumbnail: string;
  description: string;
  vendorCount: number;
  slug: string;
  mainCategory: {
    _id: string;
    name: string;
    icon: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Authentication interfaces
export interface UserAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  address: UserAddress;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface User {
  _id: string;
  email: string;
  role: string;
  name: string;
  phone: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  profileImage: string | null;
  address: UserAddress;
  vendorDetails?: VendorDetails;
  customerDetails?: CustomerDetails;
  adminDetails?: AdminDetails;
  loginAttempts: number;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProfileUpdateRequest {
  name?: string;
  phone?: string;
  address?: UserAddress;
  profileImage?: string;
}

const API_BASE_URL = 'https://api.localzarurat.com/api';

// Authentication API functions
export async function registerUser(userData: RegisterRequest): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Registration failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Registration failed. Please try again.');
  }
}

export async function loginUser(credentials: LoginRequest): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Login failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Login failed. Please check your credentials.');
  }
}

export async function getCurrentUser(token: string): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch user data.');
  }
}

export async function updateProfile(token: string, profileData: ProfileUpdateRequest): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Profile update failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Profile update failed. Please try again.');
  }
}

export async function logoutUser(token: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Logout failed: ${response.status}`);
    }
  } catch (error) {
    // Don't throw error for logout as it's not critical
    // Just log for debugging purposes
    if (process.env.NODE_ENV === 'development') {
      console.warn('Logout API call failed:', error);
    }
  }
}

// Categories API functions
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/customer/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error('API request was not successful');
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch categories.');
  }
}

export async function fetchSubcategories(mainCategoryId: string): Promise<Subcategory[]> {
  try {
    if (!mainCategoryId || mainCategoryId.trim() === '') {
      throw new Error('Main category ID is required');
    }

    const response = await fetch(`${API_BASE_URL}/customer/categories/${mainCategoryId}/subcategories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch subcategories: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error('API request was not successful');
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch subcategories.');
  }
}

// Updated Vendor interfaces based on actual API response
export interface VendorAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface VendorAddressDetails {
  doorNumber: string;
  street: string;
  location: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface ShopAddress {
  pincode: string;
  addressLine1: string;
  addressLine2: string;
  location: string;
  nearbyLocation: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface SecurityQuestion {
  question: string;
  answer: string;
}

export interface SecurityQuestions {
  question1: SecurityQuestion;
  question2: SecurityQuestion;
}

export interface SubscriptionFeatures {
  maxProducts: number;
  maxImages: number;
  prioritySupport: boolean;
  featuredListing: boolean;
}

export interface Subscription {
  status: string;
  features: SubscriptionFeatures;
  amount: number;
  currentPlan: string;
  endDate: string;
  startDate: string;
  isActive: boolean;
  razorpayPaymentId: string;
}

export interface WalletTransaction {
  type: string;
  amount: number;
  description: string;
  date: string;
  _id: string;
}

export interface Wallet {
  balance: number;
  transactions: WalletTransaction[];
}

export interface RatingDistribution {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export interface KYC {
  isVerified: boolean;
}

export interface VendorDetails {
  shopImages: string[];
  vendorAddress: VendorAddressDetails;
  mainCategory: {
    _id: string;
    name: string;
    icon: string;
  };
  subCategory: {
    _id: string;
    name: string;
    image: string;
    thumbnail: string;
  };
  referredBy: string;
  shopMetaKeywords: string[];
  shopMetaTags: string[];
  shopAddress: ShopAddress;
  isShopListed: boolean;
  kyc: KYC;
  subscription: Subscription;
  wallet: Wallet;
  withdrawalRequests: any[];
  averageRating: number;
  totalRatings: number;
  ratingDistribution: RatingDistribution;
  referralCode: string;
  shopDescription: string;
  shopListedAt: string;
  shopMetaDescription: string;
  shopMetaTitle: string;
  shopName: string;
}

export interface CustomerPreferences {
  categories: string[];
}

export interface CustomerDetails {
  preferences: CustomerPreferences;
  favorites: string[];
}

export interface AdminDetails {
  permissions: string[];
  isSuperAdmin: boolean;
  accessLevel: string;
  lastLogin: string;
}

export interface Vendor {
  _id: string;
  role: string;
  name: string;
  phone: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  profileImage: string | null;
  address: VendorAddress;
  securityQuestions: SecurityQuestions;
  vendorDetails: VendorDetails;
  customerDetails: CustomerDetails;
  adminDetails: AdminDetails;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubcategoryDetail {
  _id: string;
  name: string;
  mainCategory: {
    _id: string;
    name: string;
    icon: string;
  };
  image: string;
  thumbnail: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  metaTitle: string;
  metaDescription: string;
  vendorCount: number;
  keywords: string[];
  features: string[];
  popularTags: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

export interface VendorsResponse {
  subCategory: SubcategoryDetail;
  vendors: Vendor[];
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface VendorsApiResponse {
  success: boolean;
  data: VendorsResponse;
  pagination: Pagination;
}

// New interfaces for vendor detail page
export interface ProductImage {
  url: string;
  isPrimary: boolean;
  alt: string;
  _id: string;
}

export interface ProductPrice {
  amount: number;
  currency: string;
  isNegotiable: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: {
    mainCategory: {
      _id: string;
      name: string;
      icon: string;
    };
    subCategory: {
      _id: string;
      name: string;
      image: string;
      thumbnail: string;
    };
  };
  images: ProductImage[];
  price: ProductPrice;
  views: number;
}

export interface RatingStats {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: RatingDistribution;
}

export interface VendorDetailResponse {
  vendor: Vendor;
  products: Product[];
  ratingStats: RatingStats;
  recentReviews: any[]; // You can define a Review interface if needed
  isFavorited: boolean;
}

export interface VendorDetailApiResponse {
  success: boolean;
  data: VendorDetailResponse;
}

// Vendors API functions
export async function fetchVendors(
  subcategoryId: string, 
  page: number = 1, 
  limit: number = 10
): Promise<{ data: VendorsResponse; pagination: Pagination }> {
  try {
    if (!subcategoryId || subcategoryId.trim() === '') {
      throw new Error('Subcategory ID is required');
    }

    const response = await fetch(
      `${API_BASE_URL}/customer/subcategories/${subcategoryId}/vendors?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch vendors: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error('API request was not successful');
    }

    return {
      data: data.data,
      pagination: data.pagination,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch vendors.');
  }
}

export async function fetchVendorDetails(vendorId: string): Promise<VendorDetailResponse> {
  try {
    if (!vendorId || vendorId.trim() === '') {
      throw new Error('Vendor ID is required');
    }

    const response = await fetch(`${API_BASE_URL}/customer/vendors/${vendorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch vendor details: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error('API request was not successful');
    }

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch vendor details.');
  }
}

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('API request failed.');
  }
} 