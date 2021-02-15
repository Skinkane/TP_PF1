import fastify from 'fastify';
import axios from 'axios';

const app = fastify({ logger: true });

app.get('/', async (req, res) => {
  return {
    catfacts: getCatFacts(),
    foxes: getFoxDay(),
    day: getDayOfCountry()
  };
});

const getCatFacts = async(id) =>{
  axios.get('https://cat-fact.herokuapp.com/facts/{id}').then(res => {});
};

const getFoxDay = async(id) =>{
  axios.get('https://randomfox.ca/floof/').then(res => {});
};

const getDayOfCountry = async(id) =>{
  axios.get('https://randomfox.ca/floof/').then(res => {});
};

const start = async () => {
  try {
    await app.listen(5000);
    getCatFacts(1);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
