const obj = JSON.parse(fs.readFileSync("hometimeline.json","utf-8"));
for(let i=0;i<50;i++){
  console.log("@" + obj[i].user.screen_name + " : " + obj[i].text + "\n--------------------");
}
