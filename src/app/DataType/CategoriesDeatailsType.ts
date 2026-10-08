export interface CategoriesDeatailsType {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryIcon: string;
  categoryNameBn: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  unit: "kg" | "liter" | "piece" | "dozen";
  change: {
    dir: "up" | "down";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}