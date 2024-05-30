
const generatePin = () => {
  let pin = "";
  for (let i = 0; i < 6; i++) {
    pin += Math.floor(Math.random() * 10).toString();
  }
  return pin;
};

module.exports = { generatePin };
