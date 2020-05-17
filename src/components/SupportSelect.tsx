import React from "react";
import { TYPES_OF_SUPPORT } from "../redux/constans";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

interface SupportSelectProps {
  onChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
}

function SupportSelect({ onChange }: SupportSelectProps) {
  return (
    <Select labelId="Support" onChange={onChange} fullWidth label="Setor">
      {Object.keys(TYPES_OF_SUPPORT).map((key: string) => (
        <MenuItem key={key} value={key}>
          {TYPES_OF_SUPPORT[key]}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SupportSelect;
