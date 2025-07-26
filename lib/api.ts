// lib/api.ts - API utility functions

export interface Category {
  _id: string;
  name: string;
  icon: string;
  description: string;
  vendorCount: number;
  slug: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const API_BASE_URL = 'https://api.localzarurat.com/api';

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/customer/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Temporarily disable cache for testing
      next: { revalidate: 0 }, // No cache - fetch fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Category[]> = await response.json();
    
    if (!result.success) {
      throw new Error('API request was not successful');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return empty array as fallback
    return [];
  }
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

export async function fetchSubcategories(mainCategoryId: string): Promise<Subcategory[]> {
  try {
    // Validate mainCategoryId
    if (!mainCategoryId || mainCategoryId.trim() === '') {
      console.error('Error: mainCategoryId is empty or invalid');
      return [];
    }
    
    console.log('Fetching subcategories for mainCategoryId:', mainCategoryId);
    const url = `${API_BASE_URL}/customer/categories/${mainCategoryId}/subcategories`;
    console.log('API URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }, // No cache - fetch fresh data
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Subcategory[]> = await response.json();
    console.log('API Response:', result);
    
    if (!result.success) {
      throw new Error('API request was not successful');
    }

    console.log('Subcategories found:', result.data.length);
    return result.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    // Return empty array as fallback
    return [];
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

export async function fetchVendors(
  subcategoryId: string, 
  page: number = 1, 
  limit: number = 10
): Promise<{ data: VendorsResponse; pagination: Pagination }> {
  try {
    // Validate subcategoryId
    if (!subcategoryId || subcategoryId.trim() === '') {
      console.error('Error: subcategoryId is empty or invalid');
      throw new Error('Invalid subcategory ID');
    }
    
    console.log('Fetching vendors for subcategoryId:', subcategoryId, 'page:', page, 'limit:', limit);
    const url = `${API_BASE_URL}/customer/subcategories/${subcategoryId}/vendors?page=${page}&limit=${limit}`;
    console.log('API URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }, // No cache - fetch fresh data
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: VendorsApiResponse = await response.json();
    console.log('API Response:', result);
    
    if (!result.success) {
      throw new Error('API request was not successful');
    }

    console.log('Vendors found:', result.data.vendors.length);
    return {
      data: result.data,
      pagination: result.pagination
    };
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
}

// New function to fetch vendor details
export async function fetchVendorDetails(vendorId: string): Promise<VendorDetailResponse> {
  try {
    // Validate vendorId
    if (!vendorId || vendorId.trim() === '') {
      console.error('Error: vendorId is empty or invalid');
      throw new Error('Invalid vendor ID');
    }
    
    console.log('Fetching vendor details for vendorId:', vendorId);
    const url = `${API_BASE_URL}/customer/vendors/${vendorId}`;
    console.log('API URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }, // No cache - fetch fresh data
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: VendorDetailApiResponse = await response.json();
    console.log('API Response:', result);
    
    if (!result.success) {
      throw new Error('API request was not successful');
    }

    console.log('Vendor details found:', result.data.vendor.vendorDetails.shopName);
    return result.data;
  } catch (error) {
    console.error('Error fetching vendor details:', error);
    throw error;
  }
}

// Generic API function for other endpoints
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error making API request to ${endpoint}:`, error);
    throw error;
  }
} 