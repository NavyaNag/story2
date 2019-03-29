const express = require('express');
const template = require("mustache");
const path = require('path');
var app = require('express')();
app.use("/", express.static(path.join(__dirname, "./public")));
app.get('/Storybook/page/:id', (req,res) =>{
  var PageNumber = req.params.id;
  console.log(PageNumber);
  var pageDetails = getmypage(PageNumber);
  res.send(pageDetails);
});

function getmypage(PageNumber){
  const fs = require('fs');
  var  data = fs.readFileSync('storybook.json', (err) => {if (err) throw err;});
  let data1 = JSON.parse(data);
  var pageData = { "telugu_txt":data1.title,
                  "english_txt":data1.title_en,
                  "next_page_url":PageNumber -1 +2,
                  "image":data1.cover_image,
                };
  if(Number == 1){
    var page = fs.readFileSync('view/title.mustache','utf8',  (err) => {if (err) throw err;});
    var myPage = template.render( page.toString(), pageData); 
    return(myPage);
  }
  else if(PageNumber >= 2){
    var pages = data1.pages;
    var currentPage = pages[PageNumber - 2];
    if(currentPage == null){
         var endData = { "endPage":"Visit vizag u wil have fun!!!!!",
                        "previous_page_url":PageNumber-1,
                       };
         var page = fs.readFileSync('view/endpage.mustache','utf8',  (err) => {if (err) throw err;});
         var myPage = template.render(page.toString(), endData);
         return(myPage);
    }
    else{
      var pageData = {"telugu_txt":currentPage.telugu,
                  "english_txt":currentPage.english,
                  "next_page_url":PageNumber -1 +2,
                  "previous_page_url":PageNumber-1,
                  "image":currentPage.image,
                }; 
    var page = fs.readFileSync('view/page.mustache','utf8',  (err) => {if (err) throw err;});
    var myPage = template.render( page.toString(), pageData);
    return (myPage);
    }
  }
} 
app.listen(4000, () => {
  console.log('server started');  
});