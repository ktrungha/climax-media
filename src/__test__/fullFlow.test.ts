import { fireEvent, within } from "@testing-library/react";
import fetchMock from 'fetch-mock';
import { SEARCH_PARAM_NAME } from "../constants";
import mock from './mock.json';
import noResultMock from './noResultMock.json';
import { renderApp } from "./testUtils";

describe('<App />', () => {

  beforeEach(() => {
    fetchMock.resetHistory();
  })

  it('Full flow mobile', async () => {
    const { queries } = renderApp({ width: 310 });

    // should see 0 loading item
    {
      const items = queries.queryAllByRole('listitem');
      expect(items.length).toBe(0);
    }

    const searchStr = 'asdf';
    const searchInput = queries.getByRole('textbox')
    fireEvent.change(searchInput, { target: { value: searchStr } });
    fetchMock.getOnce(`https://api.github.com/search/repositories?q=${searchStr}&sort=stars&order=desc`, mock);

    fireEvent.click(queries.getByRole('button'));

    // should see 5 loading items
    {
      const items = queries.getAllByRole('listitem');
      expect(items.length).toBe(5);
    }

    // after waiting for API response. Should see the name of the first repo
    {
      await queries.findAllByText('asdf');
      const items = queries.getAllByRole('listitem');
      expect(items.length).toBe(mock.items.length);

      const firstItem = within(items[0]);
      firstItem.getByText('Stars: 6766');
      firstItem.getByText('Forks: 314');
      firstItem.getByText('asdf-vm');
      firstItem.getByText('asdf');
    }
  })

  it('Full flow no result mobile', async () => {
    const { queries } = renderApp({ width: 310 });

    // should see 0 loading item
    {
      const items = queries.queryAllByRole('listitem');
      expect(items.length).toBe(0);
    }

    const searchStr = 'asdf';
    const searchInput = queries.getByRole('textbox')
    fireEvent.change(searchInput, { target: { value: searchStr } });
    fetchMock.getOnce(`https://api.github.com/search/repositories?q=${searchStr}&sort=stars&order=desc`, noResultMock, { overwriteRoutes: true });

    fireEvent.click(queries.getByRole('button'));

    // should see 5 loading items
    {
      const items = queries.getAllByRole('listitem');
      expect(items.length).toBe(5);
    }

    // after waiting for API response, should see no result
    await queries.findByText('No matching result found');
  })

  it('Pasted URL mobile', async () => {
    const searchStr = 'asdf';
    const params = new URLSearchParams();
    params.set(SEARCH_PARAM_NAME, searchStr);

    fetchMock.getOnce(`https://api.github.com/search/repositories?q=${searchStr}&sort=stars&order=desc`, mock, { overwriteRoutes: true });
    const { queries } = renderApp({ width: 310, path: `/?${params.toString()}` });
    // should see 5 loading items
    {
      const items = queries.getAllByRole('listitem');
      expect(items.length).toBe(5);
    }

    // after waiting for API response. Should see the name of the first repo
    {
      await queries.findAllByText('asdf');
      const items = queries.getAllByRole('listitem');
      expect(items.length).toBe(mock.items.length);

      const firstItem = within(items[0]);
      firstItem.getByText('Stars: 6766');
      firstItem.getByText('Forks: 314');
      firstItem.getByText('asdf-vm');
      firstItem.getByText('asdf');
    }
  })

  it('Full flow desktop', async () => {
    const { queries } = renderApp({ width: 1024 });

    // should see 0 loading item
    {
      const items = queries.queryAllByRole('listitem');
      expect(items.length).toBe(0);
    }

    const searchStr = 'asdf';
    const searchInput = queries.getByRole('textbox')
    fireEvent.change(searchInput, { target: { value: searchStr } });
    fetchMock.getOnce(`https://api.github.com/search/repositories?q=${searchStr}&sort=stars&order=desc`,
      mock, { overwriteRoutes: true });

    fireEvent.click(queries.getByRole('button'));

    // should see 5 loading items
    {
      const items = queries.getAllByRole('listitem');
      expect(items.length).toBe(5);
    }

    // after waiting for API response. Should see the name of the first repo
    {
      await queries.findAllByText('asdf');
      const items = queries.getAllByRole('listitem');
      expect(items.length).toBe(mock.items.length);

      const firstItem = within(items[0]);
      // desktop version should see avatar
      expect(firstItem.getByAltText('avatar').getAttribute('src')).toEqual('https://avatars2.githubusercontent.com/u/17869024?v=4');
      firstItem.getByText('Stars: 6766');
      firstItem.getByText('Forks: 314');
      firstItem.getByText('asdf-vm');
      firstItem.getByText('asdf');
      // desktop version should see description
      firstItem.getByText('Extendable version manager with support for', { exact: false });
    }
  })

  it('Full flow no result desktop', async () => {
    const { queries } = renderApp({ width: 1024 });

    // should see 0 loading item
    {
      const items = queries.queryAllByRole('listitem');
      expect(items.length).toBe(0);
    }

    const searchStr = 'asdf';
    const searchInput = queries.getByRole('textbox')
    fireEvent.change(searchInput, { target: { value: searchStr } });
    fetchMock.getOnce(`https://api.github.com/search/repositories?q=${searchStr}&sort=stars&order=desc`, noResultMock, { overwriteRoutes: true });

    fireEvent.click(queries.getByRole('button'));

    // should see 5 loading items
    {
      const items = queries.getAllByRole('listitem');
      expect(items.length).toBe(5);
    }

    // after waiting for API response, should see no result
    await queries.findByText('No matching result found');
  })

  it('Pasted URL desktop', async () => {
    const searchStr = 'asdf';
    const params = new URLSearchParams();
    params.set(SEARCH_PARAM_NAME, searchStr);

    fetchMock.getOnce(`https://api.github.com/search/repositories?q=${searchStr}&sort=stars&order=desc`, mock, { overwriteRoutes: true });
    const { queries } = renderApp({ width: 1024, path: `/?${params.toString()}` });

    // should see 5 loading items
    {
      const items = queries.getAllByRole('listitem');
      expect(items.length).toBe(5);
    }

    // after waiting for API response. Should see the name of the first repo
    {
      await queries.findAllByText('asdf');
      const items = queries.getAllByRole('listitem');
      expect(items.length).toBe(mock.items.length);

      const firstItem = within(items[0]);
      // desktop version should see avatar
      expect(firstItem.getByAltText('avatar').getAttribute('src')).toEqual('https://avatars2.githubusercontent.com/u/17869024?v=4');
      firstItem.getByText('Stars: 6766');
      firstItem.getByText('Forks: 314');
      firstItem.getByText('asdf-vm');
      firstItem.getByText('asdf');
      // desktop version should see description
      firstItem.getByText('Extendable version manager with support for', { exact: false });
    }
  })
});
