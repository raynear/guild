import React, { useState } from 'react';

import {Card, CardContent, Grid, Typography} from '@mui/material';

const GuildCard = (props:any) => {
  const [name, setName] = useState('');

  const onChangeName = (e:any) => {
    setName(e.target.value);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{props.name}</Typography>
        <Grid container>
          <Grid item xs={9} sx={{p:1}}>
            <Card sx={{p:1}}>
              <Grid container>
                <Grid item xs={3}>
                  <img alt="emblem" width="80"  src="/assets/guild2.png" />
                </Grid>
                <Grid container item xs={3} justifyContent="center">
                  <Typography variant="body1">Game NFT</Typography>
                  <Typography variant="h6">100</Typography>
                </Grid>
                <Grid container item xs={3} justifyContent="center">
                  <Typography variant="body1">{"..Volume.."}</Typography>
                  <Typography variant="h6">100</Typography>
                </Grid>
                <Grid container item xs={3} justifyContent="center">
                  <Typography variant="body1">{"..Revenue.."}</Typography>
                  <Typography variant="h6">100</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={3} sx={{p:1}}>
            <Card sx={{p:1, height:"100%"}}>
                <Grid container justifyContent="center">
                  <Typography variant="body1">My Revenue</Typography>
                  <Typography variant="h6">100</Typography>
                </Grid>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GuildCard;