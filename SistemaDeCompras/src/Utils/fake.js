import { faker } from '@faker-js/faker';

const FakeProdutos = (setProduto, products) => {
  if (!products) {
    const ListProdutos = Array.from({ length: 3 }, (_, id) => ({
      id: id + 1,
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
    }));
    setProduto(ListProdutos);
  }
};

export default FakeProdutos;