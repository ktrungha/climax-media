import styled from '@emotion/styled';
import * as React from 'react';
import { SearchResultProps } from '.';
import RepoResultItemDesktopTablet from '../repoResultItem/RepoResultItemDesktopTablet';
import { Typography } from '@material-ui/core';

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
      result ?
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
    {
      fetching && <>
        <ItemWrapper>
          <RepoResultItemDesktopTablet />
        </ItemWrapper>
        <ItemWrapper>
          <RepoResultItemDesktopTablet />
        </ItemWrapper>
        <ItemWrapper>
          <RepoResultItemDesktopTablet />
        </ItemWrapper>
        <ItemWrapper>
          <RepoResultItemDesktopTablet />
        </ItemWrapper>
        <ItemWrapper>
          <RepoResultItemDesktopTablet />
        </ItemWrapper>
      </>
    }
  </Section>;
};

export default SearchResultDesktopTablet;
