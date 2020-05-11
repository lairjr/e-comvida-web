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
import { RootState } from "../../redux/store";
import { usePosition } from "../../helpers/usePosition";
import firebase from "firebase";

interface GeoPoint {
  Pc: number;
  Vc: number;
}

interface SupportEntity {
  link: string;
  type: string;
}

interface CompanyEntity {
  id: string;
  address: string;
  description: string;
  geopoint: GeoPoint;
  name: string;
  phone: string;
  supports: SupportEntity[];
}

interface CompanyCardProps {
  company: CompanyEntity;
}

function CompanyCard({ company }: CompanyCardProps) {
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
                    key="donation"
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
                    key="publicNote"
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
                    key="post"
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
  const { latitude, longitude } = usePosition();

  const lat = 0.0144927536231884;
  const lon = 0.0181818181818182;

  const lowerLat = latitude - lat * 50;
  const lowerLon = longitude - lon * 50;

  const greaterLat = latitude + lat * 50;
  const greaterLon = longitude + lon * 50;

  const lesserGeopoint = new firebase.firestore.GeoPoint(lowerLat, lowerLon);
  const greaterGeopoint = new firebase.firestore.GeoPoint(
    greaterLat,
    greaterLon
  );

  useFirestoreConnect([
    {
      collection: "companies",
      where: [
        ["geopoint", ">=", lesserGeopoint],
        ["geopoint", "<=", greaterGeopoint],
      ],
    },
  ]);
  const companies = useSelector(
    (state: RootState) => state.firestore.ordered.companies
  );

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
        {companies ? (
          companies.map((company: CompanyEntity) => (
            <Grid item lg={4} sm={6} xs={12} key={company.id}>
              <CompanyCard company={company} />
            </Grid>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Grid>
    </Container>
  );
}

export default List;
