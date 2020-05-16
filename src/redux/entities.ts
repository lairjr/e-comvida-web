export interface CityEntity {
  name: string;
  state: string;
}

export interface SupportEntity {
  link: string;
  type: string;
}

export interface CompanyEntity {
  id: string;
  address: string;
  description: string;
  geopoint: GeoPoint;
  name: string;
  phone: string;
  supports: SupportEntity[];
}

export interface GeoPoint {
  Pc: number;
  Vc: number;
}
