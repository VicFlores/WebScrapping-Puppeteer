import puppeteer from "puppeteer";
import fs from "fs/promises";

async function openWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    executablePath: "/usr/bin/google-chrome-stable",
  });

  const page = await browser.newPage();

  await page.goto("https://www.example.com");
  await browser.close();
}

/* openWebPage(); */

async function scheenshot() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    executablePath: "/usr/bin/google-chrome-stable",
  });

  const page = await browser.newPage();

  await page.goto("https://www.example.com");
  await page.screenshot({ path: "example.png" });
  await browser.close();
}

/* scheenshot() */

async function navigateWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    executablePath: "/usr/bin/google-chrome-stable",
  });

  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");
  /* Buscar etiqueta con una ruta /login */
  await page.click('a[href="/login"]');
  await new Promise((r) => setTimeout(r, 3000));
  await browser.close();
}

/* navigateWebPage() */

async function getDataFromWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    executablePath: "/usr/bin/google-chrome-stable",
  });

  const page = await browser.newPage();

  await page.goto("https://example.com/");

  const result = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText;
    const description = document.querySelector("p").innerText;
    const more = document.querySelector("a").innerText;

    return {
      title,
      description,
      more,
    };
  });

  console.log(result);

  await browser.close();
}

/* getDataFromWebPage() */

async function handleDinamicWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    executablePath: "/usr/bin/google-chrome-stable",
  });

  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");

  const result = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".quote");

    const quotesData = [...quotes].map((quote) => {
      const quouteText = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;
      const tags = [...quote.querySelectorAll(".tag")].map(
        (tag) => tag.innerText
      );

      return {
        quouteText,
        author,
        tags,
      };
    });

    return quotesData;
  });

  await fs.writeFile("meat-category.json", JSON.stringify(result, null, 2));

  await browser.close();
}

handleDinamicWebPage();
