import React, { Fragment, useState } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
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
// import { usePosition } from "../../helpers/usePosition";
// import firebase from "firebase";
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
import Fab from "@material-ui/core/Fab";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

// const MILES = 50;

const TYPES_OF_COMPANY = {
  furniture: "Móveis",
  clothing: "Roupas",
  it: "Tecnologia a Informacao",
  restaurant: "Restaurantes",
  market: "Supermercados",
  transport: "Transportes",
  turism: "Turismo",
  health: "Saúde",
} as { [key: string]: string };

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

const SUPPORT_TEXT = new Map<string, string>([
  ["publicNote", "Nota pública"],
  ["donation", "Doacão"],
]);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      marginRight: ".5rem",
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
          <Typography
            component="h5"
            variant="h5"
            color="primary"
            style={{ fontWeight: 700 }}
          >
            {company.name}
          </Typography>

          <Typography component="p" color="secondary">
            {company.description}
          </Typography>

          <Typography component="p" color="secondary">
            {company.address}
          </Typography>

          <Typography component="p" color="secondary">
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

        <Fab
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          color="primary"
          size="small"
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </Fab>
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
            {company.supports.map((support: SupportEntity, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell align="left">
                    {SUPPORT_TEXT.get(support.type)}
                  </TableCell>

                  <TableCell align="right">
                    <IconButton aria-label="map">
                      <OpenInNewIcon color="secondary" />
                    </IconButton>
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

const useStylesList = makeStyles((theme: Theme) =>
  createStyles({
    gradient: {
      background: `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.light})`,
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    },
  })
);

function List() {
  const classes = useStylesList();

  const { filterValue, onFilterValueChange } = useQueryParam("queryTerm");
  const onChangeSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) =>
    onFilterValueChange(event.target.value);

  // const { latitude, longitude } = usePosition();

  // const lat = 0.0144927536231884;
  // const lon = 0.0181818181818182;

  // const lowerLat = latitude - lat * MILES;
  // const lowerLon = longitude - lon * MILES;

  // const greaterLat = latitude + lat * MILES;
  // const greaterLon = longitude + lon * MILES;

  // const lesserGeopoint = new firebase.firestore.GeoPoint(lowerLat, lowerLon);
  // const greaterGeopoint = new firebase.firestore.GeoPoint(
  //   greaterLat,
  //   greaterLon
  // );

  const baseConn = [
    {
      collection: "companies",
      // where: [
      //   ["geopoint", ">=", lesserGeopoint],
      //   ["geopoint", "<=", greaterGeopoint],
      // ],
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
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Box fontWeight="fontWeightBold" className={classes.gradient}>
                Gaste seu dinheirinho com quem pensou em todos no isolmaneto,
                teve idéias bacanas e cuidou bem das pessoas
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <div className="filter">
            <Typography variant="h6" color="primary" className="label">
              Filtrar por:
            </Typography>

            <Select
              // onChange={handleChange}
              input={<Input />}
              // MenuProps={MenuProps}
            >
              <MenuItem key={"all"} value={""}>
                Todos
              </MenuItem>

              {Object.keys(TYPES_OF_COMPANY).map((key: string) => (
                <MenuItem key={key} value={key}>
                  {TYPES_OF_COMPANY[key]}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Grid>

        <Grid item xs={12}>
          <TextField
            placeholder="Nome do estabelecimento"
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
