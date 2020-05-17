import React, { Fragment } from "react";

import { default as MaterialCard } from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./List.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {
  useFirestoreConnect,
  ReduxFirestoreQuerySetting,
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { usePosition } from "../../helpers/usePosition";
// import firebase from "firebase";
import useQueryParam from "../../helpers/useQueryParam";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Card, { LoadingCard } from "./Card";
import { TYPES_OF_COMPANY } from "../../redux/constans";
import { CompanyEntity } from "../../redux/entities";
import { Hidden } from "@material-ui/core";
import CitySelect from "../../components/CitySelect";

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

const useStylesList = makeStyles((theme: Theme) =>
  createStyles({
    gradient: {
      background: `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.light})`,
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    },
    control: {
      marginLeft: "1rem",
      maxWidth: "300px",
    },
  })
);

function List() {
  const classes = useStylesList();

  const {
    filterValue: nameFilterValue,
    onFilterValueChange: onNameFilterValueChange,
  } = useQueryParam("name");
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    onNameFilterValueChange(event.target.value);

  const {
    filterValue: cityFilterValue,
    onFilterValueChange: onCityFilterValueChange,
  } = useQueryParam("city");
  const onCityChange = (event: any, value: any) => {
    onCityFilterValueChange(value ? value.id : "");
  };

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
  const firestoneConn = nameFilterValue
    ? ([
        ...baseConn,
        {
          collection: "companies",
          where: [
            ["search", "array-contains", nameFilterValue.toLocaleLowerCase()],
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
              <Typography
                component="h4"
                variant="h4"
                className={classes.gradient}
              >
                Gaste seu dinheirinho com quem pensou em todos no isolamento e
                cuidou bem das pessoas
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Hidden smDown>
          <Grid item xs={12}>
            <div className="filter">
              <Typography variant="h6" color="primary" className="label">
                Filtrar por:
              </Typography>

              <FormControl variant="outlined" className={classes.control}>
                <InputLabel id="sector">Setor</InputLabel>

                <Select
                  labelId="sector"
                  // value={age}
                  // onChange={handleChange}
                  label="Setor"
                >
                  <MenuItem value="">
                    <em>Todos</em>
                  </MenuItem>

                  {Object.keys(TYPES_OF_COMPANY).map((key: string) => (
                    <MenuItem key={key} value={key}>
                      {TYPES_OF_COMPANY[key]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.control}>
                <CitySelect
                  onChange={onCityChange}
                  renderInput={(params: any) => (
                    <TextField {...params} label="Cidade" variant="outlined" />
                  )}
                />
              </FormControl>
            </div>
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <Grid item xs={12}>
            <MaterialCard
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
            >
              <CardContent>
                <Typography color="secondary">Filtros</Typography>

                <Grid container>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="sector">Setor</InputLabel>

                      <Select
                        labelId="sector"
                        // value={age}
                        // onChange={handleChange}
                        label="Setor"
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>Todos</em>
                        </MenuItem>

                        {Object.keys(TYPES_OF_COMPANY).map((key: string) => (
                          <MenuItem key={key} value={key}>
                            {TYPES_OF_COMPANY[key]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <CitySelect
                        onChange={onCityChange}
                        renderInput={(params: any) => (
                          <TextField {...params} label="Cidade" fullWidth />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </MaterialCard>
          </Grid>
        </Hidden>

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
            value={nameFilterValue || ""}
            onChange={onChangeName}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ paddingTop: "3rem" }}>
        {companies ? (
          companies.map((company: CompanyEntity) => (
            <Grid item xs={12} key={company.id}>
              <Card company={company} />
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
