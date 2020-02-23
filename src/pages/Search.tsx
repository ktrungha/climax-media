import { useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import SearchDesktopTablet from '../components/search/SearchDesktopTablet';
import SearchMobile from '../components/search/SearchMobile';
import { SEARCH_PARAM_NAME } from '../constants';
import { fetchGithubRepos } from '../components/searchResult';

const Search: React.FC = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  const history = useHistory();
  const updateUrl = React.useCallback((str: string) => {
    const trimmedStr = str.trim();
    if (!!trimmedStr) {
      const params = new URLSearchParams();
      params.set(SEARCH_PARAM_NAME, trimmedStr);
      history.replace({ search: params.toString() });
    }
  }, [history])

  const searchStr = React.useMemo(() => {
    const params = new URLSearchParams(history.location.search);
    const retval = params.get(SEARCH_PARAM_NAME);
    return retval;
  }, [history.location.search]);

  const [fetching, setFetching] = React.useState(false);
  const [result, setResult] = React.useState<any[] | null>(null);
  React.useEffect(() => {
    const fn = async () => {
      try {
        if (searchStr) {
          setFetching(true);
          const result = await fetchGithubRepos(searchStr);
          setResult(result.items);
        }
      } catch (error) {
      } finally {
        setFetching(false);
      }
    }
    fn();
  }, [searchStr])

  const Component = React.useMemo(() => {
    return mobile ? SearchMobile : SearchDesktopTablet
  }, [mobile]);

  return <Component
    search={searchStr || undefined}
    fetching={fetching}
    result={result}
    performSearch={updateUrl} />;
}

export default Search;
