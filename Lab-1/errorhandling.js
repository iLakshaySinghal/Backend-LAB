const fs = require("fs");

const filePath = "Ques2.txt";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.error("Error: File not found!");
    } else {
      console.error("An error occurred while reading the file:", err.message);
    }
    return;
  }

  console.log("File contents:");
  console.log(data);
});
