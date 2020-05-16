import { CityEntity } from "./entities";

export const MILES = 50;

export const TYPES_OF_COMPANY = {
  furniture: "Móveis",
  clothing: "Roupas",
  it: "Tecnologia a Informacao",
  restaurant: "Restaurantes",
  market: "Supermercados",
  transport: "Transportes",
  turism: "Turismo",
  health: "Saúde",
} as { [key: string]: string };

export const CITIES: CityEntity[] = [
  { name: "Santa Cruz do Sul", state: "RS" },
];

export const SUPPORT_TEXT = new Map<string, string>([
  ["publicNote", "Nota pública"],
  ["donation", "Doacão"],
]);
