import React from "react";
import { TYPES_OF_COMPANY } from "../redux/constans";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

interface SectorSelectProps {
  onChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
}

function SectorSelect({ onChange }: SectorSelectProps) {
  return (
    <Select labelId="sector" onChange={onChange} fullWidth label="Setor">
      <MenuItem value="">
        <em>Todos</em>
      </MenuItem>

      {Object.keys(TYPES_OF_COMPANY).map((key: string) => (
        <MenuItem key={key} value={key}>
          {TYPES_OF_COMPANY[key]}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SectorSelect;
