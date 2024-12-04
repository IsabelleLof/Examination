// Wonton Schema
export type Wonton = {
  id: number;
  type: "wonton";
  name: string;
  description: string;
  price: number;
  ingredients: string[];
};

// Dip Schema
export type Dip = {
  id: number;
  type: "dip";
  name: string;
  description: string;
  price: number;
};

// Drink Schema
export type Drink = {
  id: number;
  type: "drink";
  name: string;
  description: string;
  price: number;
};

// Menu Response Schema
export type Menu = {
  items: (Wonton | Dip | Drink)[]; // Array of items, which can be Wonton, Dip, or Drink
};

// Order Schema
enum OrderState {
  "waiting",
  "processing",
  "done",
}

export type Order = {
  id: number | string;
  items: (Wonton | Dip | Drink)[] | number[]; // Either full items or just item IDs (for request)
  orderValue: number;
  eta: string;
  timestamp: string;
  state: OrderState;
};
