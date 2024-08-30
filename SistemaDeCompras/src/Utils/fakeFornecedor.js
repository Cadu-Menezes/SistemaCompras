import { faker } from '@faker-js/faker';

const FakeFornecedores = (setFornecedor, fornecedor) => {
  if (!fornecedor) {
    const ListFornecedores = Array.from({ length: 10 }, (_, id) => ({
      id: id + 1,
      name: faker.person.firstName(),
      tipo: faker.person.jobType(),
    }));


    setFornecedor(ListFornecedores);
  }
};

export default FakeFornecedores;