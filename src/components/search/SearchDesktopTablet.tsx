import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { css } from 'emotion';
import * as React from 'react';
import { LIGHT_GREY } from '../../colors';
import SearchResultDesktopTablet from '../searchResult/SearchResultDesktopTablet';
import { SearchProps } from '.';

const SearchDesktopTablet: React.FunctionComponent<SearchProps> = (props) => {
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
          padding: 20px 30px;
          border-bottom: 1px solid ${LIGHT_GREY};
          align-items: center;
        `}
        onSubmit={submitHandler}>
        <div style={{ flex: 1 }}>
          <TextField inputProps={{role: 'textbox '}} label='Search' fullWidth value={pendingSearch} onChange={(e) => setPendingSearch(e.target.value)} />
        </div>
        <Button type='submit' color='primary' variant='contained' role="button">
          Search
      </Button>
      </form>
    </section>
    <SearchResultDesktopTablet fetching={fetching} result={result}/>
  </Container>;
};

export default SearchDesktopTablet;
