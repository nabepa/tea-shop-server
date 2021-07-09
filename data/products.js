let products = {
  '00': {
    id: '00',
    category: 'green',
    name: 'sencha',
    flavour: 'Fresh, delicate Umami touch.',
    price: 15.55,
    stock: 3,
    url: 'https://res.cloudinary.com/dukjzo7tf/image/upload/v1625295884/tea-shop/green-sencha.jpg',
    // createdAt
  },

  '01': {
    id: '01',
    category: 'green',
    name: 'raindrop',
    flavour: 'Fresh, grassy after rain day.',
    price: 18.95,
    stock: 2,
    url: 'https://res.cloudinary.com/dukjzo7tf/image/upload/v1625293684/tea-shop/green-raindrop.jpg',
  },

  '02': {
    id: '02',
    category: 'herbal',
    name: 'festival',
    flavour: 'Tosty, sweet and fruity.',
    price: 12.45,
    stock: 4,
    url: 'https://res.cloudinary.com/dukjzo7tf/image/upload/v1625293684/tea-shop/herbal-festival.jpg',
  },
};

export function getAll() {
  return { ...products };
}

export function getById(id) {
  return { ...products[id] };
}

export function getByName(name) {
  return Object.keys(products).find((key) => products[key].name === name);
}

export function create(category, name, flavour, price, stock, url) {
  const id = Date.now().toString();
  const product = {
    id,
    category,
    name,
    flavour,
    price,
    stock,
    url,
  };
  products[id] = product;
  return product;
}

export function update() {}

export function remove() {}
