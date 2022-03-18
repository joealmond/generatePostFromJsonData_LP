/*jshint esversion: 9 */
const fs = require("fs");

const dataCloudinary = require("./cloudinaryUploadedData.json"); // only read once
const dataRelations = require("./lp_fullwp_term_relationships.json"); // only read once

// data from lp_full.wp_terms.json
const egyeb = 1;
const topMenu = 2;
const socialLinks = 3;
const postFormatAside = 4;
const news = 9;
const festivals = 10;
const corporate = 11;
const blog = 12;

// result data
let newData = [];

// structure of lp_fullwp_term_relationships.json
// {
//   "object_id" : 2016,
//   "term_taxonomy_id" : 10,
//   "term_order" : 0
// }

// structure of cloudinaryUploadedData.json
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
//     "id": "uploads/A Within Temptation turnéjának budapesti állomásán segítettük a szervezőket és a zenekart/Within_Temptation-2-1"
//   },
// ]

for (const keyOut in dataCloudinary) {
  if (Object.hasOwnProperty.call(dataCloudinary, keyOut)) {
    const elemOut = dataCloudinary[keyOut];
    for (const keyIn in dataRelations) {
      if (Object.hasOwnProperty.call(dataRelations, keyIn)) {
        const elemIn = dataRelations[keyIn];
        if (elemOut.origin.ID === elemIn.object_id) {
          switch (elemIn.term_taxonomy_id) {
            case egyeb:
              elemOut.category = "egyeb";
              break;
            case topMenu:
              elemOut.category = "topMenu";
              break;
            case socialLinks:
              elemOut.category = "socialLinks";
              break;
            case postFormatAside:
              elemOut.category = "postFormatAside";
              break;
            case news:
              elemOut.category = "news";
              break;
            case festivals:
              elemOut.category = "festivals";
              break;
            case corporate:
              elemOut.category = "corporate";
              break;
            case blog:
              elemOut.category = "blog";
              break;
            default:
              elemOut.category = "none";
          }
        }
      }
    }
    newData = [...newData, elemOut];
  }
}

// save JSON Object
let jsonContent = JSON.stringify(newData);
fs.writeFile("newData.json", jsonContent, "utf8", function (err) {
  if (err) {
    console.log("An error occured while writing JSON Object to File.");
    return console.log(err);
  }
  console.log("JSON file has been saved.");
});
// save JSON Object end
