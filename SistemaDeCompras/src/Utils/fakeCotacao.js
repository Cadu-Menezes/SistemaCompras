import { faker } from '@faker-js/faker';

const FakeCotacoes = (setCotacoes, cotacao) => {
  if (!cotacao) {
    const ListCotacoes = Array.from({ length: 10 }, (_, id) => ({
      id: id + 1,
      data: faker.date.recent(),
      preco: faker.finance.amount(),
      produto: faker.commerce.product(),
    }));


    setCotacoes(ListCotacoes);
  }
};

export default FakeCotacoes;