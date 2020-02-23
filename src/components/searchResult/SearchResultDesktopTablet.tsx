import styled from '@emotion/styled';
import * as React from 'react';
import { SearchResultProps } from '.';
import RepoResultItemDesktopTablet from '../repoResultItem/RepoResultItemDesktopTablet';
import { Typography } from '@material-ui/core';
import { rangeArray } from '../../utils';

const Section = styled.section`
  padding: 20px 30px;
`;

const ItemWrapper = styled.article`
  margin: 15px;
`;

const SearchResultDesktopTablet: React.FunctionComponent<SearchResultProps> = (props) => {
  const { result, fetching } = props;

  return <Section role="list">
    {
      fetching ?
        rangeArray(5).map(i =>
          <ItemWrapper key={i}>
            <RepoResultItemDesktopTablet />
          </ItemWrapper>)
        : result ?
          result.length === 0 ?
            <Typography>
              No matching result found
            </Typography>
            :
            result.map(item => <ItemWrapper key={item.id}>
              <RepoResultItemDesktopTablet data={item} />
            </ItemWrapper>)
          : <></>

    }
  </Section>;
};

export default SearchResultDesktopTablet;
