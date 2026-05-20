import { callApi } from './api';
import type {
  Listing,
  ListingCreatePayload,
  ListingFilters,
  ListingUpdatePayload,
} from '@/types/api';

export function listListings(filters: ListingFilters = {}) {
  const params: Record<string, string | number> = {};
  if (filters.city) params.city = filters.city;
  if (filters.district) params.district = filters.district;
  if (filters.listing_type) params.listing_type = filters.listing_type;
  if (filters.budget_min !== undefined) params.budget_min = filters.budget_min;
  if (filters.budget_max !== undefined) params.budget_max = filters.budget_max;
  if (filters.user_id) params.user_id = filters.user_id;
  if (filters.page) params.page = filters.page;
  if (filters.page_size) params.page_size = filters.page_size;

  return callApi<Listing[]>({
    method: 'GET',
    url: '/listings/',
    params,
  });
}

export function getListing(id: string) {
  return callApi<Listing>({
    method: 'GET',
    url: `/listings/${id}`,
  });
}

export function createListing(payload: ListingCreatePayload) {
  return callApi<Listing>({
    method: 'POST',
    url: '/listings/',
    data: payload,
  });
}

export function updateListing(id: string, payload: ListingUpdatePayload) {
  return callApi<Listing>({
    method: 'PATCH',
    url: `/listings/${id}`,
    data: payload,
  });
}

export function deleteListing(id: string) {
  return callApi<{ message: string }>({
    method: 'DELETE',
    url: `/listings/${id}`,
  });
}
