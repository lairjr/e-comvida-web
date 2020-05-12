import { useLocation, useHistory } from "react-router-dom";

const useQueryParam = (propertyName: string) => {
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const filterValue = urlSearch.get(propertyName);

  const history = useHistory();

  const onFilterValueChange = (value: string) => {
    const urlSearch = new URLSearchParams(location.search);
    if (value) {
      urlSearch.set(propertyName, value);
    } else {
      urlSearch.delete(propertyName);
    }
    history.push({
      search: urlSearch.toString(),
    });
  };

  return {
    filterValue: filterValue,
    onFilterValueChange,
  };
};

export default useQueryParam;
