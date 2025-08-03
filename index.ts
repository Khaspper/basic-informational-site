const e = require("express");
const path = require("path");
import type { Request, Response } from "express";

const app = e();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"));
  console.log('We got a request for "/"');
});

app.get("/about", (req: Request, res: Response) => {
  res.sendFile("about.html", { root: __dirname });
  console.log('We got a request for "/about"');
});

app.get("/contact-me", (req: Request, res: Response) => {
  res.sendFile("contactMe.html", { root: __dirname });
  console.log('We got a request for "/contact-me"');
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).sendFile("notFound.html", { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});
