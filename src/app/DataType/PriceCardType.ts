export interface PriceCardType {
  item: {
    categoryIcon: string;
    category: string;
    unit: string;
    today: number;
    change: {
      dir: "up" | "down";
      pct: number;
    };
  };
}