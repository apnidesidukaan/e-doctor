
export interface HospitalServiceChecklist {
  cardiacCare: boolean;
  cancerCare: boolean;
  emergencyCare: boolean;
  neurosciences: boolean;
  orthopaedics: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  address: string;
  phone: string;
  distance?: string;
  services: string[];
  checklist: HospitalServiceChecklist;
  bedAvailability: number;
  waitTime: string;
  isOpen: boolean;
  openingHours: string;
  imageUrl: string;
  mapUrl?: string;
  isVerified: boolean;
  trustScore: 'High' | 'Medium' | 'Low';
}

export interface SearchFilters {
  query: string;
  location: string;
  services: string[];
  minRating: number;
  openNow: boolean;
}

export interface GroundingMetadata {
  groundingChunks?: Array<{
    maps?: {
      uri: string;
      title: string;
    };
  }>;
}
