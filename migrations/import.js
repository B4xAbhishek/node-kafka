const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://admin:Kanaklata%40123@cluster0.sgzf8.mongodb.net/test';
const dbName = 'users';

const fs = require('fs');

const startTime = process.hrtime();

const jsonFolder = 'E:/WebDev/JSON';
const files = fs.readdirSync(jsonFolder);
const jsonData = [];

for (const file of files) {
  const fileData = fs.readFileSync(jsonFolder + '/' + file);
  if (Array.isArray(JSON.parse(fileData)) === true && file.includes('json')){
    console.log("Array of Objects => False")
    fs.rename(jsonFolder + '/' + file, 'E:/WebDev/Error/'+file, (err) => {
      if (err) {
        // Handle the error if one occurred
        console.error(err);
      } else {
        // The file was moved successfully
        console.log(`The ${file} was moved successfully`);
      }
    });
  }else{
    console.log('Object is pushed in jsonData')
    jsonData.push(JSON.parse(fileData));
  }
}

MongoClient.connect(url, function(err, client) {
  const db = client.db(dbName);

  const collection = db.collection('mycol');

  collection.insertMany(jsonData, async (err, result) => {
    if(err){
    console.log('err is => ', err.message)
    } else { 
    console.log(`successfully inserted ${result.insertedCount}`);
    }
    await client.close();
    const endTime = process.hrtime(startTime);
    const elapsedTime = endTime[0] * 1000 + endTime[1] / 1000000;

    console.log(`Elapsed time: ${elapsedTime}ms`);
  });
});