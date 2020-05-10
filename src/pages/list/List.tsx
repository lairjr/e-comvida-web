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
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import MapIcon from "@material-ui/icons/Map";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

interface SupportEntity {
  link: string;
  type: string;
}

interface CompanyEntity {
  address: string;
  description: string;
  name: string;
  phone: string;
  supports: SupportEntity[];
}

const companies: CompanyEntity[] = [
  {
    address: "Rua Marechal Floriano 1 - Santa Cruz do Sul - RS - Brazil",
    description: "Alguma descricao simples",
    name: "Mercur",
    phone: "(51) 91111-2222",
    supports: [
      {
        link:
          "https://gauchazh.clicrbs.com.br/economia/noticia/2020/03/empresa-mercur-de-santa-cruz-do-sul-paralisa-atividades-e-manda-mais-de-400-funcionarios-para-casa-ck80rltlm06jy01pq245srgav.html",
        type: "publicNote",
      },
    ],
  },
  {
    address: "Rua Marechal Floriano 1 - Santa Cruz do Sul - RS - Brazil",
    name: "Xalingo",
    description: "Alguma descricao simples",
    phone: "(51) 91111-2222",
    supports: [
      {
        link: "",
        type: "publicNote",
      },
    ],
  },
  {
    address: "Rua Marechal Floriano 1 - Santa Cruz do Sul - RS - Brazil",
    name: "JTI Tabacos",
    description: "Alguma descricao simples",
    phone: "(51) 91111-2222",
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
  useFirestoreConnect([{ collection: "companies" }]);
  const companies = useSelector((state: any) => state.firestore.data.companies);
  console.log(companies);

  return (
    <Card className="card" variant="outlined">
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

          <Typography variant="subtitle1" color="textSecondary">
            {company.phone}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
        <IconButton aria-label="facebook">
          <FacebookIcon />
        </IconButton>

        <IconButton aria-label="whatsapp">
          <WhatsAppIcon />
        </IconButton>

        <IconButton aria-label="instagram">
          <InstagramIcon />
        </IconButton>

        <IconButton aria-label="fastfood">
          <FastfoodIcon />
        </IconButton>

        <IconButton aria-label="map">
          <MapIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function List() {
  return (
    <Container>
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

      <Grid container spacing={1}>
        {companies.map((company: CompanyEntity) => (
          <Grid item lg={4} sm={6} xs={12}>
            <CompanyCard company={company} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default List;
