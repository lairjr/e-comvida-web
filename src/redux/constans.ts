export const MILES = 50;

export const TYPES_OF_COMPANY = {
  furniture: "Móveis",
  clothing: "Roupas",
  industry: "Indústria",
  it: "Tecnologia a Informacao",
  restaurant: "Bar e Restaurantes",
  market: "Supermercados",
  transport: "Transportes",
  turism: "Turismo",
  health: "Saúde",
} as { [key: string]: string };

export const SUPPORT_TEXT = new Map<string, string>([
  ["publicNote", "Nota pública"],
  ["donation", "Doacão"],
]);

export const TYPES_OF_SUPPORT: { [key: string]: string } = {
  donation: "Doacão",
  publicNote: "Nota pública",
  voluntaryIsolation: "Isolamento voluntário",
};
