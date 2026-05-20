export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export type ResponseEnvelope<T> = {
  success: boolean;
  data: T | null;
  error: ApiError | null;
  meta: unknown;
};

export type AuthUser = {
  id: string;
  phone: string;
  is_active: boolean;
  created_at: string;
  profile?: UserProfileOut | null;
};

export type UserProfileOut = {
  full_name: string | null;
  age: number | null;
  gender: string | null;
  city: string | null;
  neighborhood: string | null;
  occupation: string | null;
  budget_min: number | null;
  budget_max: number | null;
  bio: string | null;
  profile_photo_url: string | null;
  sleep_schedule: string | null;
  cleanliness_level: string | null;
  smoking: boolean;
  pets: boolean;
  guests: string | null;
  noise_tolerance: string | null;
  verification_badges: string[];
};

export type AuthResponse = {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type OtpPurpose = 'register' | 'login';

export type SendOtpResponse = { expires_in: number };
export type VerifyOtpResponse = { temp_token: string };

export type ListingType = 'room_available' | 'looking_for_room' | 'looking_together';

export type ListingOwnerBrief = {
  id: string;
  full_name: string | null;
  profile_photo_url: string | null;
  verification_badges: string[];
  flatmate_score: number | null;
};

export type ListingPhoto = {
  id: string;
  url: string;
  sort_order: number;
};

export type HouseRules = {
  smoking?: boolean;
  pets?: boolean;
  gender_preference?: string;
};

export type Listing = {
  id: string;
  user_id: string;
  listing_type: ListingType;
  title: string;
  description: string | null;
  city: string;
  district: string;
  neighborhood: string | null;
  rent_full: number;
  rent_per_person: number | null;
  move_in_date: string;
  residents_current: number;
  residents_total: number;
  house_rules: HouseRules;
  amenities: string[];
  is_active: boolean;
  expires_at: string;
  created_at: string;
  photos: ListingPhoto[];
  owner: ListingOwnerBrief | null;
};

export type ListingCreatePayload = {
  listing_type: ListingType;
  title: string;
  description?: string;
  city: string;
  district: string;
  neighborhood?: string;
  rent_full: number;
  rent_per_person?: number;
  move_in_date: string;
  residents_current?: number;
  residents_total: number;
  house_rules?: HouseRules;
  amenities?: string[];
};

export type ListingUpdatePayload = Partial<{
  title: string;
  description: string;
  rent_full: number;
  rent_per_person: number;
  move_in_date: string;
  residents_current: number;
  residents_total: number;
  house_rules: HouseRules;
  amenities: string[];
  is_active: boolean;
}>;

export type ListingFilters = {
  city?: string;
  district?: string;
  listing_type?: ListingType;
  budget_min?: number;
  budget_max?: number;
  user_id?: string;
  page?: number;
  page_size?: number;
};

export type RegisterPayload = {
  full_name: string;
  age?: number;
  gender?: string;
  city: string;
  neighborhood?: string;
  occupation?: string;
  budget_min?: number;
  budget_max?: number;
  bio?: string;
  sleep_schedule?: string;
  cleanliness_level?: string;
  smoking?: boolean;
  pets?: boolean;
  guests?: string;
  noise_tolerance?: string;
  kvkk_consent: boolean;
};
