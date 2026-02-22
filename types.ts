export interface Stock {
  symbol: string;
  name: string;
  price: number;
  target: number;
  upside: number;
  score: number;
  conversion: number;
  action: 'BUY' | 'SELL' | 'HOLD';
  buyDate: string;
  sellDate: string;
  risk: 'Low' | 'Medium' | 'High';
}
