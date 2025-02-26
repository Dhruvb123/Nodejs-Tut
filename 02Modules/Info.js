var person = {
  name: "dhruv",
  email: "ljqedg@123",
  age: 22,
};
function display() {
  return person;
}

function update() {
  return { ...person, name: "abcd" };
}

module.exports = { display, update };
