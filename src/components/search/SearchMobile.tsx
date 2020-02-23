import { Button, TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { css } from 'emotion';
import * as React from 'react';
import { LIGHT_GREY } from '../../colors';
import { SearchProps } from '.';
import SearchResultMobile from '../searchResult/SearchResultMobile';

const SearchMobile: React.FunctionComponent<SearchProps> = props => {
  const { performSearch, result, fetching, search } = props;
  const [pendingSearch, setPendingSearch] = React.useState(search || '');

  const submitHandler = React.useCallback(e => {
    e.preventDefault();
    performSearch(pendingSearch);
  }, [performSearch, pendingSearch])

  return <Container>
    <section>
      <form className={css`
      display: flex;
      padding: 10px 15px;
      border-bottom: 1px solid ${LIGHT_GREY};
      align-items: center;
    `}
        onSubmit={submitHandler}>
        <div style={{ flex: 1 }}>
          <TextField inputProps={{ role: 'textbox ' }} label='Search' fullWidth value={pendingSearch} onChange={(e) => setPendingSearch(e.target.value)} />
        </div>
        <Button type='submit' color='secondary' variant='contained' role="button">
          Search
        </Button>
      </form>
    </section>
    <SearchResultMobile fetching={fetching} result={result} />
  </Container>;
};

export default SearchMobile;
