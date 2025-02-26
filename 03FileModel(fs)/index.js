const fs = require("fs"); // using inbuilt file module

fs.writeFileSync(
  "./test.txt",
  "Hi this Line was written by index.js first update\n"
);

// returns a void
fs.readFile("./test.txt", "utf-8", (err, res) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Prev Res: ", res);
  }
});

// throws error (no such file or directory exists)
// fs.appendFile("./testAppend.txt", "New Line\n", (err) => {
//   if (err) throw err;
// });
//

fs.appendFileSync(
  "./test.txt",
  "Hi this Line was written by index.js\n",
  (err) => {
    if (err) throw err;
  }
);

// returns a res
const res = fs.readFileSync("./test.txt", "utf-8");
console.log("Result: ", res);
