const fs = require("fs");

const inputFile = "input_Q6.txt";
const outputFile = "output_Q6.txt";

const readStream = fs.createReadStream(inputFile, { encoding: "utf8" });
const writeStream = fs.createWriteStream(outputFile, { flags: "w", encoding: "utf8" });

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log(`Data from '${inputFile}' has been successfully piped to '${outputFile}'.`);
});

readStream.on("error", (err) => {
  console.error("Error reading file:", err.message);
});

writeStream.on("error", (err) => {
  console.error("Error writing file:", err.message);
});
