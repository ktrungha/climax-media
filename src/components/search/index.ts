export interface SearchProps {
  fetching: boolean;
  search?: string;
  result: any[] | null;
  performSearch(str: string): void;
}
