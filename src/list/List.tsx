import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

interface SourceEntity {
  link: string;
}

interface CompanyEntity {
  name: string;
  description: string;
  address: string;
  sources: SourceEntity[];
}

const companies: CompanyEntity[] = [
  {
    name: "Mercur",
    description: "Empresa de bagulhos",
    address: "Santa Cruz do Sul",
    sources: [
      {
        link: "",
      },
    ],
  },
  {
    name: "Xalingo",
    description: "Empresa de brincedos",
    address: "Santa Cruz do Sul",
    sources: [
      {
        link: "",
      },
    ],
  },
  {
    name: "JTI Tabacos",
    description: "Fumajeira",
    address: "Santa Cruz do Sul",
    sources: [
      {
        link: "",
      },
    ],
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

          <Typography variant="subtitle1" color="textSecondary">
            {company.description}
          </Typography>
        </CardContent>
      </div>

      <CardMedia
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      />
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
