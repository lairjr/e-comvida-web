import React, { Fragment, useState } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import {
  useFirestoreConnect,
  ReduxFirestoreQuerySetting,
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { usePosition } from "../../helpers/usePosition";
import firebase from "firebase";
import Shimmer from "../../components/Shimmer";
import useQueryParam from "../../helpers/useQueryParam";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Collapse from "@material-ui/core/Collapse";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const MILES = 50;

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      fontFamily: "Roboto",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

function LoadingCard() {
  return (
    <Card className="card" variant="outlined">
      <CardActionArea>
        <CardContent>
          <Shimmer>
            <div
              style={{
                height: "22px",
                marginTop: "13px",
                width: "200px",
              }}
            ></div>
          </Shimmer>

          <br />

          <Shimmer>
            <div
              style={{
                height: "13px",
                marginTop: "13px",
                width: "120px",
              }}
            ></div>
          </Shimmer>

          <br />

          <Shimmer>
            <div
              style={{
                height: "13px",
                marginTop: "13px",
                width: "250px",
              }}
            ></div>
          </Shimmer>

          <br />

          <Shimmer>
            <div
              style={{
                height: "13px",
                marginTop: "13px",
                width: "180px",
              }}
            ></div>
          </Shimmer>

          <br />
          <br />
          <br />

          <Shimmer>
            <div
              style={{
                height: "13px",
                marginTop: "13px",
                width: "250px",
              }}
            ></div>
          </Shimmer>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function LoadingList() {
  return (
    <Fragment>
      <Grid item xs={12}>
        <LoadingCard />
      </Grid>

      <Grid item xs={12}>
        <LoadingCard />
      </Grid>

      <Grid item xs={12}>
        <LoadingCard />
      </Grid>
    </Fragment>
  );
}

function CompanyCard({ company }: CompanyCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="card" variant="outlined">
      <CardActionArea>
        <CardContent>
          <Typography component="h5" variant="h5" color="primary">
            {company.name}
          </Typography>

          <Typography className={classes.text} component="p" color="secondary">
            {company.description}
          </Typography>

          <Typography className={classes.text} component="p" color="secondary">
            {company.address}
          </Typography>

          <Typography className={classes.text} component="p" color="secondary">
            {company.phone}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
        <IconButton aria-label="facebook">
          <FacebookIcon color="secondary" />
        </IconButton>

        <IconButton aria-label="whatsapp">
          <WhatsAppIcon color="secondary" />
        </IconButton>

        <IconButton aria-label="instagram">
          <InstagramIcon color="secondary" />
        </IconButton>

        <IconButton aria-label="fastfood">
          <FastfoodIcon color="secondary" />
        </IconButton>

        <IconButton aria-label="map">
          <MapIcon color="secondary" />
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography variant="subtitle1" color="primary">
                  Contribuicões
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography variant="subtitle1" color="primary">
                  Fonte
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {company.supports.map((support: SupportEntity) => {
              return (
                <TableRow>
                  <TableCell className={classes.text} align="left">
                    {support.type}
                  </TableCell>

                  <TableCell className={classes.text} align="right">
                    {support.link}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Collapse>
    </Card>
  );
}

function List() {
  const { filterValue, onFilterValueChange } = useQueryParam("queryTerm");
  const onChangeSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) =>
    onFilterValueChange(event.target.value);

  const { latitude, longitude } = usePosition();

  const lat = 0.0144927536231884;
  const lon = 0.0181818181818182;

  const lowerLat = latitude - lat * MILES;
  const lowerLon = longitude - lon * MILES;

  const greaterLat = latitude + lat * MILES;
  const greaterLon = longitude + lon * MILES;

  const lesserGeopoint = new firebase.firestore.GeoPoint(lowerLat, lowerLon);
  const greaterGeopoint = new firebase.firestore.GeoPoint(
    greaterLat,
    greaterLon
  );

  const baseConn = [
    {
      collection: "companies",
      where: [
        ["geopoint", ">=", lesserGeopoint],
        ["geopoint", "<=", greaterGeopoint],
      ],
    },
  ] as ReduxFirestoreQuerySetting[];
  const firestoneConn = filterValue
    ? ([
        ...baseConn,
        {
          collection: "companies",
          where: [
            ["search", "array-contains", filterValue.toLocaleLowerCase()],
          ],
        },
      ] as ReduxFirestoreQuerySetting[])
    : baseConn;

  useFirestoreConnect(firestoneConn);

  const companies = useSelector(
    (state: RootState) => state.firestore.ordered.companies
  );

  return (
    <Container>
      <Grid container spacing={4} style={{ paddingTop: "2rem" }}>
        <Grid item xs={12}>
          <span className="topic">
            Estamos em quarentena e queremos gastar nosso
          </span>

          <br />

          <span className="topic">
            dinheirinho com empresas que suportam o isolamento
          </span>
        </Grid>

        <Grid item xs={12}>
          <TextField
            placeholder="Pesquise"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            fullWidth
            value={filterValue || ""}
            onChange={onChangeSearchTerm}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ paddingTop: "3rem" }}>
        {companies ? (
          companies.map((company: CompanyEntity) => (
            <Grid item xs={12} key={company.id}>
              <CompanyCard company={company} />
            </Grid>
          ))
        ) : (
          <LoadingList />
        )}
      </Grid>
    </Container>
  );
}

export default List;
