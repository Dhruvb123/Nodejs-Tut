const http = require("http");
const url = require("url");
const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.end();
    return;
  }
  const curURL = url.parse(req.url, true); // pass true as param so that query key gives obj of search params
  console.log(curURL);
  switch (curURL.pathname) {
    case "/":
      res.end("Home Page");
      break;
    case "/about":
      const Username = curURL.query.name;
      if (Username) {
        res.end(`About Page\nHi ${Username}`);
      } else {
        res.end("About Page");
      }
      break;
    case "/search":
      const searchQuery = curURL.query.search_query;
      res.end("This is your query: " + searchQuery);
      break;
    default:
      res.end("404");
      break;
  }
});

server.listen(3000);
