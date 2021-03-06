import React, { useState } from "react";
import clsx from "clsx";
import { default as MaterialCard } from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Shimmer from "../../components/Shimmer";
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
import { CompanyEntity, SupportEntity } from "../../redux/entities";
import { SUPPORT_TEXT } from "../../redux/constans";

interface CompanyCardProps {
  company: CompanyEntity;
}

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

export function LoadingCard() {
  return (
    <MaterialCard className="card" variant="outlined">
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
    </MaterialCard>
  );
}

function Card({ company }: CompanyCardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <MaterialCard className="card" variant="outlined">
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

          {company.facebook && <p>Facebook: {company.facebook}</p>}

          {company.instagram && <p>Instagram: {company.instagram}</p>}

          {company.whatsapp && <p>Whatsapp: {company.whatsapp}</p>}

          {company.siteUrl && <p>Site URL: {company.siteUrl}</p>}
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
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

                  <TableCell align="right">{support.source}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Collapse>
    </MaterialCard>
  );
}

export default Card;
