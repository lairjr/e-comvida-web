export interface CityEntity {
  name: string;
  state: string;
  id: string;
}

export interface SupportEntity {
  link: string;
  type: string;
}

export interface CompanyEntity {
  id: string;
  address: string;
  city: number;
  description: string;
  geopoint: GeoPoint;
  name: string;
  phone: string;
  supports: SupportEntity[];
  sectors: string[];
}

export interface GeoPoint {
  Pc: number;
  Vc: number;
}
