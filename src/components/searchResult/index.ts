export interface SearchResultProps {
  result: any[] | null;
  fetching: boolean;
}

export async function fetchGithubRepos(search: string) {
  const res = await fetch(`https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc`);
  if (res.ok) {
    return await res.json();
  }
  throw new Error('failed search');
}