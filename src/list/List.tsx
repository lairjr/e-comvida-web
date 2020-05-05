import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import CardActionArea from "@material-ui/core/CardActionArea";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./List.css";

interface SupportEntity {
  link: string;
  type: string;
}

interface CompanyEntity {
  address: string;
  description: string;
  name: string;
  supports: SupportEntity[];
}

const companies: CompanyEntity[] = [
  {
    address: "Santa Cruz do Sul",
    description: "Empresa de bagulhos",
    name: "Mercur",
    supports: [
      {
        link:
          "https://gauchazh.clicrbs.com.br/economia/noticia/2020/03/empresa-mercur-de-santa-cruz-do-sul-paralisa-atividades-e-manda-mais-de-400-funcionarios-para-casa-ck80rltlm06jy01pq245srgav.html",
        type: "publicNote",
      },
    ],
  },
  {
    address: "Santa Cruz do Sul",
    name: "Xalingo",
    description: "Empresa de brinquedos",
    supports: [
      {
        link: "",
        type: "publicNote",
      },
    ],
  },
  {
    address: "Santa Cruz do Sul",
    name: "JTI Tabacos",
    description: "Fumajeira",
    supports: [
      {
        link: "",
        type: "donation",
      },
      {
        link: "",
        type: "reducedPrice",
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
      <CardActionArea>
        <CardContent>
          <Typography component="h5" variant="h5">
            {company.name}
          </Typography>

          {company.supports.map((support: SupportEntity) => {
            switch (support.type) {
              case "donation":
                return (
                  <a
                    href={support.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Chip clickable label="Doacão" color="primary" />
                  </a>
                );
              case "publicNote":
                return (
                  <a
                    href={support.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Chip clickable label="Nota pública" color="primary" />
                  </a>
                );
              default:
                return (
                  <a
                    href={support.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Chip clickable label="Reducao de precos" color="primary" />
                  </a>
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
      </CardActionArea>
    </Card>
  );
}

function List() {
  return (
    <div>
      <div className="search">
        <TextField
          label="Pesquise"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>

      {companies.map((company: CompanyEntity) => (
        <CompanyCard company={company} />
      ))}
    </div>
  );
}

export default List;
