const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://www.kleinanzeigen.de"; //main url
const angebotstyp = "/s-anzeige:angebote"; //nur angebote, kein gesuche
const preis_range = "/preis:350:550"; //350€-500€
let suchtext = "iphone 13 mini"; //suchtext

const tags = ["batteriezustand"]; //schlagwörter, die die beschreibung enthalten soll
const non_tags = ["displayschaden", "kein paypal"]; //schlagwörter, die nicht in beschreibung stehen sollen

suchtext = suchtext.replace(/\s/g, "-");

fullUrl = url + angebotstyp + preis_range + "/" + suchtext + "/k0";

async function filterArticles(article_links) {
  const filteredArticles = [];

  for (let i = 0; i < article_links.length; i++) {
    const pageHTML = await axios.get(article_links[i]);
    const $ = cheerio.load(pageHTML.data);
    let text =
      $("#viewad-title").text().toString().trim().toLowerCase() +
      ": " +
      $("#viewad-description-text").text().toString().trim().toLowerCase();

    let contains_tags = false;
    let contains_non_tags = false;

    for (let i = 0; i < tags.length; i++) {
      if (text.includes(tags[i].toLowerCase())) {
        contains_tags = true;
      } else {
        contains_tags = false;
        break;
      }
    }

    for (let i = 0; i < non_tags.length; i++) {
      if (text.includes(non_tags[i].toLowerCase())) {
        contains_non_tags = true;
        break;
      }
    }

    if (contains_tags == true && contains_non_tags == false) {
      filteredArticles.push(article_links[i]);
    }
  }

  return filteredArticles;
}

async function main() {
  const pageHTML = await axios.get(fullUrl);
  const $ = cheerio.load(pageHTML.data);

  const articles_page = $("a.ellipsis");

  const article_links = [];

  articles_page.each(function (i, el) {
    article_links.push("https://www.kleinanzeigen.de" + el.attribs.href);
  });

  console.log(article_links);

  result = await filterArticles(article_links);

  console.log(result);
}

main();
