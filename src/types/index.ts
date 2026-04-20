export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  city: string;
  neighborhood?: string;
  occupation?: string;
  budgetRange?: {
    min: number;
    max: number;
  };
  profilePhoto?: string;
  bio?: string;
  verificationBadges: VerificationBadge[];
  flatmateScore?: number;
  createdAt: string;
  updatedAt: string;
}

export type VerificationBadge = 
  | 'phone_verified'
  | 'id_verified'
  | 'face_verified'
  | 'photo_verified'
  | 'clean_record';

export interface Listing {
  id: string;
  userId: string;
  type: 'room_available' | 'looking_for_room' | 'looking_together';
  title: string;
  description: string;
  city: string;
  district: string;
  neighborhood: string;
  monthlyRent: {
    full: number;
    perPerson?: number;
  };
  moveInDate: string;
  residents: {
    current: number;
    total: number;
  };
  houseRules: {
    smoking: boolean;
    pets: boolean;
    genderPreference?: string;
    quietHours?: {
      start: string;
      end: string;
    };
  };
  photos: string[];
  amenities: string[];
  createdAt: string;
  expiresAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface PaymentHistory {
  id: string;
  userId: string;
  listingId: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  commission: number;
  paymentMethod: 'card' | 'transfer' | 'papara' | 'bkm_express';
}

export interface FlatmateScore {
  userId: string;
  score: number; // 0-1000
  components: {
    paymentRegularity: number; // 40%
    paymentPunctuality: number; // 20%
    disputeHistory: number; // 20%
    verificationLevel: number; // 15%
    profileCompleteness: number; // 5%
  };
  lastUpdated: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'listing_match' | 'profile_view' | 'verification' | 'payment';
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
  relatedId?: string;
}
