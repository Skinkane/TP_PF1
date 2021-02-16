import fastify from 'fastify';
import axios from 'axios';

const app = fastify({ logger: true });

app.get('/', async (req, res) => {
  return getAll();
});


const getCatFacts = () =>{
  let facts = [];
  return new Promise(resolve => {axios.get('https://cat-fact.herokuapp.com/facts').then(res => {
    let facts = [];
    let i = 0;
    while (i < 3) {
      facts.push(res.data[i].text);
      i++;
    };
    resolve(facts);
  });});
};

const getFoxDay = () =>{
  return new Promise(resolve => {
    axios.get('https://randomfox.ca/floof/').then(res => {resolve(res.data.image)});
  });
};

const getDayOfCountry = () => {
  return new Promise(resolve => {
    axios.get('https://date.nager.at/api/v2/publicholidays/2019/FR').then(res => {resolve(res.data)});
  });
};

const getAll = () => {
  let promises = Promise.all([getCatFacts(),getFoxDay(),getDayOfCountry()]);
  console.log([promises[1]]);
  let data = promises
  return data;
};


const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
