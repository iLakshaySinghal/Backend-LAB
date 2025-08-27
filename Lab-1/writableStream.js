const fs = require("fs");

const filePath = "output.txt";
const data = "Hello, Node.js!";

const writeStream = fs.createWriteStream(filePath, { flags: "w", encoding: "utf8" });

writeStream.write(data, (err) => {
  if (err) {
    console.error("Error writing to file:", err.message);
  } else {
    console.log("Data has been written successfully!");
  }
});

writeStream.end();
