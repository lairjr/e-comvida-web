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
import { useFirestoreConnect, WhereOptions } from "react-redux-firebase";
import { useSelector } from "react-redux";
import useQueryParam from "../../helpers/useQueryParam";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Card, { LoadingCard } from "./Card";
import { CompanyEntity, GroupActivityEntity } from "../../redux/entities";
import { Hidden } from "@material-ui/core";
import CitySelect from "../../components/CitySelect";
import SectorSelect from "../../components/SectorSelect";
import { companiesByName } from "../../redux/selectors";

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

const mapCitySearch = (cityValue: string | null): WhereOptions | null =>
  cityValue ? ["city", "==", cityValue.toLocaleLowerCase()] : null;

const mapSectorSearch = (sectorValue: string | null): WhereOptions | null =>
  sectorValue
    ? ["sectors", "array-contains-any", sectorValue.split("|")]
    : null;

const aggregateQueries = (
  queries: WhereOptions[],
  query: WhereOptions | null
) => {
  if (query) {
    return [...queries, query];
  }
  return queries;
};

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

  const {
    filterValue: sectorFilterValue,
    onFilterValueChange: onSectorFilterValueChange,
  } = useQueryParam("sector");
  const onSectorChange = (event: any, value: any) => {
    if (value) {
      const filterValue = value
        .map((groupActivity: GroupActivityEntity) => groupActivity.id)
        .join("|");
      onSectorFilterValueChange(`${filterValue}`);
    } else {
      onSectorFilterValueChange("");
    }
  };

  const where = [
    mapSectorSearch(sectorFilterValue),
    mapCitySearch(cityFilterValue),
  ].reduce(aggregateQueries, []);

  useFirestoreConnect({
    collection: "companies",
    where: where.length > 0 ? where : undefined,
    orderBy: ["name", "desc"],
  });

  const companies = useSelector(companiesByName(nameFilterValue));

  return (
    <Container>
      <Grid container spacing={4} style={{ paddingTop: "2rem" }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Hidden smDown>
                <Typography
                  component="h4"
                  variant="h4"
                  className={classes.gradient}
                >
                  Gaste seu dinheirinho com quem pensou em todos no isolamento e
                  cuidou bem das pessoas
                </Typography>
              </Hidden>

              <Hidden mdUp>
                <Typography
                  component="h6"
                  variant="h6"
                  className={classes.gradient}
                >
                  Gaste seu dinheirinho com quem pensou em todos no isolamento e
                  cuidou bem das pessoas
                </Typography>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>

        <Hidden smDown>
          <Grid item xs={12}>
            <div className="filter">
              <Typography variant="h6" color="primary" className="label">
                Filtrar por:
              </Typography>

              <FormControl className={classes.control}>
                <CitySelect
                  onChange={onCityChange}
                  renderInput={(params: any) => (
                    <TextField {...params} label="Cidade" variant="outlined" />
                  )}
                />
              </FormControl>

              <FormControl style={{ marginLeft: "1rem" }}>
                <SectorSelect
                  onChange={onSectorChange}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="Atividade da empresa"
                      variant="outlined"
                    />
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
                      <CitySelect
                        onChange={onCityChange}
                        renderInput={(params: any) => (
                          <TextField {...params} label="Cidade" fullWidth />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <SectorSelect
                        onChange={onSectorChange}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            label="Atividade da empresa"
                            fullWidth
                          />
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
          <Fragment>
            {companies.length > 0 ? (
              companies.map((company: CompanyEntity) => (
                <Grid item xs={12} key={company.id}>
                  <Card company={company} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography component="h5" variant="h5" color="secondary">
                  :(
                </Typography>
                <Typography component="h5" variant="h5" color="secondary">
                  nenhum lugar encontrado
                </Typography>
                <Typography component="h5" variant="h5" color="secondary">
                  ainda estamos melhorando nossa busca
                </Typography>
              </Grid>
            )}
          </Fragment>
        ) : (
          <LoadingList />
        )}
      </Grid>
    </Container>
  );
}

export default List;
