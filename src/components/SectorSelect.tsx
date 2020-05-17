import React, { useState, useEffect } from "react";
import { GroupActivityEntity } from "../redux/entities";
import Autocomplete, { RenderInputParams } from "@material-ui/lab/Autocomplete";

const mapGroupActivityApiToGroupActivityEntity = (
  groupActivity: any
): GroupActivityEntity => {
  const name = groupActivity.descricao || "";
  const id = groupActivity.id;

  return { name, id };
};

interface GroupActivityProps {
  onChange: (event: React.ChangeEvent<{}>, value: any) => void;
  renderInput: (params: RenderInputParams) => React.ReactNode;
}

function GroupActivity({ onChange, renderInput }: GroupActivityProps) {
  const [groupActivityOptions, setGroupActivityOptions] = useState<
    GroupActivityEntity[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroupActivity = async () => {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v2/cnae/classes"
      );
      const data = await response.json();

      setIsLoading(false);
      setGroupActivityOptions(data);
    };

    fetchGroupActivity();
  }, []);

  return (
    <Autocomplete
      loading={isLoading}
      noOptionsText="Restaurantes"
      options={groupActivityOptions}
      autoHighlight
      onChange={onChange}
      multiple
      fullWidth
      filterOptions={(options, state) => {
        if (state.inputValue.length >= 3) {
          const filter = state.inputValue.toLocaleLowerCase();

          return options.filter((groupActivity: any) => {
            const activityGroup = mapGroupActivityApiToGroupActivityEntity(
              groupActivity
            );

            return activityGroup.name.toLocaleLowerCase().includes(filter);
          });
        }
        return [];
      }}
      getOptionLabel={(groupActivity: any) => {
        const activityGroup = mapGroupActivityApiToGroupActivityEntity(
          groupActivity
        );

        return `${activityGroup.name}`;
      }}
      renderInput={renderInput}
    />
  );
}

export default GroupActivity;
