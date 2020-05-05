import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

interface SourceEntity {
  link: string;
}

interface CompanyEntity {
  address: string;
  description: string;
  name: string;
  sources: SourceEntity[];
  typeOfSupports: string[];
}

const companies: CompanyEntity[] = [
  {
    address: "Santa Cruz do Sul",
    description: "Empresa de bagulhos",
    name: "Mercur",
    sources: [
      {
        link: "",
      },
    ],
    typeOfSupports: ["donation"],
  },
  {
    address: "Santa Cruz do Sul",
    name: "Xalingo",
    description: "Empresa de brinquedos",
    sources: [
      {
        link: "",
      },
    ],
    typeOfSupports: ["publicNote"],
  },
  {
    address: "Santa Cruz do Sul",
    name: "JTI Tabacos",
    description: "Fumajeira",
    sources: [
      {
        link: "",
      },
    ],
    typeOfSupports: ["publicNote", "reducedPrice"],
  },
];

interface CompanyCardProps {
  company: CompanyEntity;
}

function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card>
      <div>
        <CardContent>
          <Typography component="h5" variant="h5">
            {company.name}
          </Typography>

          {company.typeOfSupports.map((support: string) => {
            switch (support) {
              case "donation":
                return (
                  <Chip
                    // icon={<FaceIcon />}
                    label="Doacão"
                    color="primary"
                  />
                );
              case "publicNote":
                return (
                  <Chip
                    // icon={<FaceIcon />}
                    label="Nota pública"
                    color="primary"
                  />
                );
              default:
                return (
                  <Chip
                    // icon={<FaceIcon />}
                    label="Reducao de precos"
                    color="primary"
                  />
                );
            }
          })}

          <Typography variant="subtitle1" color="textSecondary">
            {company.description}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary">
            {company.address}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

function List() {
  return (
    <div>
      <h1>List</h1>

      {companies.map((company: CompanyEntity) => (
        <CompanyCard company={company} />
      ))}
    </div>
  );
}

export default List;
