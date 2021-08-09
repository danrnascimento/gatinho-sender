const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3333, () => console.log(`App is listening on port ${3333}.`));

app.post("/upload", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(500).json({
        error: "file is required",
      });
    }

    const { image } = req.files;
    const { nsfw } = req.body;

    image.mv(`./api/images/${Math.random()}-${image.name}`);

    console.log(
      "[upload file] success:",
      JSON.stringify({ image: image.name, nsfw })
    );

    res.status(200).json({
      data: {
        message: "Success",
        name: image.name,
        size: image.size,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

app.post("/url", async (req, res) => {
  try {
    if (!req.body.url) {
      return res.status(500).json({
        error: "url is required",
      });
    }

    const { url, nsfw } = req.body;

    console.log("[save url] success:", JSON.stringify({ url, nsfw }));

    res.status(200).json({
      data: {
        message: "Success",
        url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});
