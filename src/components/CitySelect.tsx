import React, { useState, useEffect } from "react";
import { CityEntity } from "../redux/entities";
import Autocomplete, { RenderInputParams } from "@material-ui/lab/Autocomplete";

const mapCityApiToCityEntity = (cityApi: any): CityEntity => {
  const name = cityApi.nome || "";
  const state = cityApi.microrregiao.mesorregiao.UF.sigla;
  const id = cityApi.id;

  return { name, state, id };
};

interface CitySelectProps {
  onChange: (event: React.ChangeEvent<{}>, value: any) => void;
  renderInput: (params: RenderInputParams) => React.ReactNode;
}

function CitySelect({ onChange, renderInput }: CitySelectProps) {
  const [citiesOptions, setCitiesOptions] = useState<CityEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
      );
      const data = await response.json();

      setIsLoading(false);
      setCitiesOptions(data);
    };

    fetchCities();
  }, []);

  return (
    <Autocomplete
      loading={isLoading}
      noOptionsText="Nome da cidade - UF"
      options={citiesOptions}
      autoHighlight
      onChange={onChange}
      fullWidth
      filterOptions={(options, state) => {
        if (state.inputValue.length >= 3) {
          return options.filter((cityApi: any) => {
            const city = mapCityApiToCityEntity(cityApi);

            return city.name
              .toLocaleLowerCase()
              .startsWith(state.inputValue.toLocaleLowerCase());
          });
        }
        return [];
      }}
      getOptionLabel={(cityApi: any) => {
        const city = mapCityApiToCityEntity(cityApi);

        return `${city.name} - ${city.state}`;
      }}
      renderInput={renderInput}
    />
  );
}

export default CitySelect;
