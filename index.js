/*jshint esversion: 9 */
const fs = require("fs");
const { title } = require("process");

const data = require("./newData.json"); // only read once

// newData.json data example
// [
//   {
//     "title": "A Within Temptation turnéjának budapesti állomásán segítettük a szervezőket és a zenekart",
//     "origin": {
//       "ID": 47,
//       "post_title": "A Within Temptation turnéjának budapesti állomásán segítettük a szervezőket és a zenekart",
//       "post_name": "a-within-temptation-turnejanak-budapesti-allomasan-segitettuk-a-szervezoket-es-a-zenekart",
//       "post_date": "2014-02-27 08:05:44",
//       "post_content": [
//         "http://www.lightpositive.hu/wp-content/uploads/2016/12/Within_Temptation-3-1.jpg",
//         "http://www.lightpositive.hu/wp-content/uploads/2016/12/Within_Temptation-2-1.jpg",
//         "http://www.lightpositive.hu/wp-content/uploads/2016/12/Within_Temptation-1-1.jpg"
//       ]
//     },
//     "url": "https://res.cloudinary.com/lightpositive/image/upload/v1647560668/uploads/A%20Within%20Temptation%20turn%C3%A9j%C3%A1nak%20budapesti%20%C3%A1llom%C3%A1s%C3%A1n%20seg%C3%ADtett%C3%BCk%20a%20szervez%C5%91ket%20%C3%A9s%20a%20zenekart/Within_Temptation-2-1.jpg",
//     "id": "uploads/A Within Temptation turnéjának budapesti állomásán segítettük a szervezőket és a zenekart/Within_Temptation-2-1",
//     "category": "news"
//   },
// ]

let newData;
let category;
const festivalText = "galleryLayout_festival.html";
const corporateText = "galleryLayout_corporate.html";
const idTemp = { id: "" };
let urls;
let text;
for (const key in data) {
  if (Object.hasOwnProperty.call(data, key)) {
    newData = data[key];
    if (newData.category == "corporate") {
      category = corporateText;
    } else {
      category = festivalText;
    }
    // idTemp.id = 203;
    console.log(newData.origin.ID, idTemp.id);
    if (newData.origin.ID != idTemp.id) {
      idTemp.id = newData.origin.ID;
      urls = [newData.url];
    } else {
      urls = [...urls, `\n  - `, newData.url].join("");
    }
    // prettier ignore
    text = `---
title: ${newData.title}
coverImage:
  - ${newData.url}
date: ${newData.origin.post_date}
galleryImages: 
  - ${urls}
layout: ${category}
---
`;

    if (newData.category == "corporate") {
      // save file
      fs.mkdir(
        `references/corporate/${newData.origin.post_name.slice(0, 50)}`,
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
      fs.writeFile(
        `references/corporate/${newData.origin.post_name.slice(
          0,
          50
        )}/index.md`,
        text,
        "utf8",
        function (err) {
          if (err) {
            console.log("An error occured while writing Object to File.");
            return console.log(err);
          }
          console.log("File has been saved.");
        }
      );
      // save file
    } else {
      // save file
      fs.mkdir(
        `references/festivals/${newData.origin.post_name.slice(0, 50)}`,
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
      fs.writeFile(
        `references/festivals/${newData.origin.post_name.slice(
          0,
          50
        )}/index.md`,
        text,
        "utf8",
        function (err) {
          if (err) {
            console.log("An error occured while writing Object to File.");
            return console.log(err);
          }
          console.log("File has been saved.");
        }
      );
      // save file
    }
  }
}
