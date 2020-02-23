export function rangeArray(n: number) {
  const retval = new Array(n);
  for(let i = 0; i < n; i++) {
    retval[i] = i;
  }
  return retval;
}