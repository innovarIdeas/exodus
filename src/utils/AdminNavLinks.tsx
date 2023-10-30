interface AdminNavLinks {
  id: number;
  name: string;
  to: string;
  image: string;
}

export const AdminNavLinks: AdminNavLinks[] = [
  {
    id: 1,
    name: "Books",
    to: "/books",
    image: "/img/books.png",
  },
  {
    id: 2,
    name: "Orders",
    to: "/orders",
    image: "/img/orders.png",
  },
  {
    id: 3,
    name: "Users",
    to: "/users",
    image: "/img/users.png",
  },
  {
    id: 4,
    name: "Invoices",
    to: "/invoices",
    image: "/img/invoice.png",
  },
  {
    id: 5,
    name: "Discounts",
    to: "/discounts",
    image: "/img/discounts.png",
  },
  {
    id: 6,
    name: "Transactions",
    to: "/transactions",
    image: "/img/transaction.png",
  },
  {
    id: 7,
    name: "Constants",
    to: "/constants",
    image: "/img/constants.png",
  },
];
