export const createOrder = [
  {
    id: 1,
    status: "",
    name: "ALISADO",
    icon: "",
    childs: [
      {
        id: 4,
        status: null,
        name: "ALISADO ESPECIAL",
        icon: null,
        childs: [],
        items: [
          {
            id: 1,
            status: null,
            detail: "Basic",
            compound: true,
            price: [1.0, 2.0, 3.0],
            categoryId: null,
          },
          {
            id: 2,
            status: null,
            detail: "Premium",
            compound: true,
            price: 63,
            categoryId: null,
          },
        ],
      },
      {
        id: 5,
        status: null,
        name: "ALISADO NORMAL",
        icon: null,
        childs: [],
        items: [
          {
            id: 52,
            status: null,
            detail: "Basic",
            compound: true,
            price: [1.0, 2.0, 3.0],
            categoryId: null,
          },
        ],
      },
    ],
    items: [],
  },
  {
    id: 2,
    status: "",
    name: "SPA",
    icon: "",
    childs: [],
    items: [],
  },
  {
    id: 3,
    status: "",
    name: "CORTE",
    icon: "",
    childs: [],
    items: [],
  },
];

export const names = [
  { id: 100, name: "User test1" },
  { id: 200, name: "User test2" },
  { id: 330, name: "User test3" },
 
];
