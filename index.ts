import { createServer } from "node:http";
import { promises as fs } from "node:fs";

const hostname = "localhost";
const port = 8080;

let indexPage: string,
  aboutPage: string,
  contactMePage: string,
  notFoundPage: string;

async function getFiles() {
  try {
    indexPage = await fs.readFile("./index.html", "utf8");
    aboutPage = await fs.readFile("./about.html", "utf8");
    contactMePage = await fs.readFile("./contactMe.html", "utf8");
    notFoundPage = await fs.readFile("./notFound.html", "utf8");
  } catch (error) {
    console.log(error);
  }
}

getFiles()
  .then(() => {
    const server = createServer((req, res) => {
      res.setHeader("Content-Type", "text/html");
      switch (req.url) {
        case "/":
          res.statusCode = 200;
          res.end(indexPage);
          break;
        case "/about":
          res.statusCode = 200;
          res.end(aboutPage);
          break;
        case "/contact-me":
          res.statusCode = 200;
          res.end(contactMePage);
          break;

        default:
          res.statusCode = 400;
          res.end(notFoundPage);
          break;
      }
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch((error) => console.log(error));
