import styled from '@emotion/styled';
import { Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { SearchResultProps } from '.';
import { rangeArray } from '../../utils';
import RepoResultItemMobile from '../repoResultItem/RepoResultItemMobile';

const Section = styled.section`
  padding: 10px 15px;
`;

const ItemWrapper = styled.article`
`;

const SearchResultMobile: React.FunctionComponent<SearchResultProps> = (props) => {
  const { result, fetching } = props;
  return <Section>
    <Grid container spacing={2} role="list">
      {
        fetching ?
          rangeArray(5).map(i =>
            <Grid key={i} item xs={12} sm={6}>
              <ItemWrapper><RepoResultItemMobile /></ItemWrapper>
            </Grid>)
          : result ?
            result.length === 0 ?
              <Typography>
                No matching result found
            </Typography>
              :
              result.map(item => <Grid item xs={12} sm={6} key={item.id}>
                <ItemWrapper><RepoResultItemMobile data={item} /></ItemWrapper>
              </Grid>)
            :
            <></>
      }
    </Grid>

  </Section>;
};

export default SearchResultMobile;
