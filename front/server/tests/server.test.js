const {sum} = require('../server');
const {connect} =require('../src/sequelize')

const c ={
  database: 'backend',
  dialect: 'postgres',
  username: 'backend',
  password: 'das!"das@!#~!"&',
  host: 'db',
}
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
test('connects', async () => {
   const {response:responsed, error} = await connect(credentials=c, close=true, mode='check')
  expect(responsed).toBe('Connection has been established successfully.');
});
