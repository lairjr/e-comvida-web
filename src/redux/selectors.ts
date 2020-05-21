import { RootState } from "./store";
import { CompanyEntity } from "./entities";

export const companiesByName = (nameSearch: string | null) => (
  state: RootState
) => {
  const companies = state.firestore.ordered.companies;

  if (nameSearch) {
    return companies
      ? companies.filter((company: CompanyEntity) => {
          return company.name
            .toLocaleLowerCase()
            .startsWith(nameSearch.toLocaleLowerCase());
        })
      : [];
  }
  return companies;
};

export const suggestionsByName = (nameSearch: string | null) => (
  state: RootState
) => {
  const suggestions = state.firestore.ordered.suggestions;

  if (nameSearch) {
    return suggestions
      ? suggestions.filter((company: CompanyEntity) => {
          return company.name
            .toLocaleLowerCase()
            .startsWith(nameSearch.toLocaleLowerCase());
        })
      : [];
  }
  return suggestions;
};
