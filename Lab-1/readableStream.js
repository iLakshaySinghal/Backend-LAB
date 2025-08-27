const fs = require("fs");
const path = "data.txt";

// Check if file exists before creating stream
fs.access(path, fs.constants.F_OK, (err) => {
  if (err) {
    console.error("Error: File not found!");
    return;
  }

  const readStream = fs.createReadStream(path, { encoding: "utf8" });

  readStream.on("data", (chunk) => {
    console.log("Received chunk:", chunk);
  });

  readStream.on("end", () => {
    console.log("Finished reading file.");
  });

  readStream.on("error", (error) => {
    console.error("An error occurred while reading:", error.message);
  });
});
