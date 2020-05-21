import React, { Fragment } from "react";

import { default as MaterialCard } from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useFirestoreConnect, WhereOptions } from "react-redux-firebase";
import { useSelector } from "react-redux";
import useQueryParam from "../../helpers/useQueryParam";
import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import FormControl from "@material-ui/core/FormControl";
import Card, { LoadingCard } from "../list/Card";
import { CompanyEntity, GroupActivityEntity } from "../../redux/entities";
import { Hidden } from "@material-ui/core";
import CitySelect from "../../components/CitySelect";
import SectorSelect from "../../components/SectorSelect";
import { suggestionsByName } from "../../redux/selectors";

function LoadingSuggestions() {
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

const useStylesSuggestions = makeStyles((theme: Theme) =>
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

function Suggestions() {
  const classes = useStylesSuggestions();

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
    collection: "suggestions",
    where: where.length > 0 ? where : undefined,
    orderBy: ["name", "desc"],
  });

  const companies = useSelector(suggestionsByName(nameFilterValue));
  console.log(companies);

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
                Sugestões de empresas
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
          <LoadingSuggestions />
        )}
      </Grid>
    </Container>
  );
}

export default Suggestions;
