const formatter = new Intl.NumberFormat('en-IN');
export const formatNumber = (n: number) => formatter.format(n);
