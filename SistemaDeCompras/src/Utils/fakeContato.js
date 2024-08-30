import { faker } from '@faker-js/faker';

const FakeContatos = (setContato, contato) => {
  if (!contato) {
    const ListContatos = Array.from({ length: 10 }, (_, id) => ({
      id: id + 1,
      name: faker.person.firstName(),
      numero: faker.phone.number(),
      fornecedor: faker.person.jobType(),
    }));


    setContato(ListContatos);
  }
};

export default FakeContatos;