import fastify from 'fastify';
import axios from 'axios';

const app = fastify({ logger: true });

app.get('/', async (req, res) => {
  return getAll();
});


const getCatFacts = () =>{
  return new Promise(resolve => {axios.get('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3').then(res => {
    let facts = [];
    let i = 0;
    while (i < res.data.length) {
      facts.push(res.data[i].text);
      i++;
    }
    resolve(facts);
  }).catch(fail => resolve(null));});
};

const getFoxDay = () =>{
  return new Promise(resolve => {
    axios.get('https://randomfox.ca/floof/').then(res => {resolve(res.data.image)}).catch(fail => resolve(null));
  });
};

const getDayOffCountry = (countryCode ) => {
  return new Promise(resolve => {
    axios.get('https://date.nager.at/api/v2/publicholidays/2021/'+countryCode).then(res => {resolve(res.data)}).catch(fail => resolve(null));
  });
};

const getAll = () => {
  return Promise.all([getCatFacts(),getFoxDay(),getDayOffCountry('FR')]).then(res => {
    let data = {};
    data['foxPicture'] = res[1];
    data['catFacts'] = res[0];
    data['holidays'] = res[2];
    return data;
  });
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
