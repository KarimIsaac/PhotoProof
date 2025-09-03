
const express = require("express"); 
const router = express.Router(); 
const Album = require("../models/Album"); 
const Photo = require("../models/Photo"); 
const verify = require("../verifyToken"); 
const User = require("../models/User");
const { createAlbumValidation } = require("../validation"); 
const fs = require("fs"); 

 
//Hämta alla album
router.get("/", verify, async (req, res) => {
  const userId = req.user._id;

  try {
        const user = await User.findById(userId);
        let albums;
        const userRole = user.role;

    if (userRole === 'Admin') {
        albums = await Album.find();
      
    } else {
      albums = await Album.find({ owner: userId });
       
    }
    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
});

//hämta med id
router.get("/:id", verify, async (req, res) => {
  try {
    
    const album = await Album.findById(req.params.id);
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json({ error: err.message }); // Om något går fel
  }
});

//hämta album baserad på invite email det delats till  (för customers)
router.get("/email/:email", verify, async (req, res) => {
  try {
    const albums = await Album.find({
      invites: {
        $elemMatch: {
          email: req.params.email,
        },
      },
    });
    res.status(200).json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message }); // Om något går fel
  }
});

//hämta alla med foreign key owner
router.get("/user/:id", verify, async (req, res) => {
  const userId = req.user._id;
  
    if(userId === req.params.id){
      try {
        const albums = await Album.find({ owner: req.params.id });
        res.status(200).json(albums);
      } catch (err) {
        res.status(500).json({ error: err.message }); // Om något går fel
      }
}else{
  res.status(401).json({ error: "Not authorized" });
  
}});

//Skapa nytt album
router.post("/", verify, async (req, res) => {
  //Ladda upp fil om req.files finns
  if (req.files) {
    const file = req.files.file;
    //Spara fil till path
    file.mv(
      `${__dirname}/../../photo_proofing_app/public/Images/AlbumCovers/${req.body.cover}`,
      async (err) => {
        if (err) {
          return res.status(500).json({ Error: err });
        }
      }
    );
  }
  
  //Joi validering
  const { error } = createAlbumValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message); //Om något går fel

  const album = new Album({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    cover: req.body.cover,
    owner: req.body.owner,
  });

  try {
    const newAlbum = await album.save();
    res.status(200).json({ Created: newAlbum._id });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//Raderar ett album
router.delete("/:id", verify, async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    // Radera album från databasen
    await Album.deleteOne({ _id: req.params.id });

    // Försök radera album cover
    fs.unlink(
      `${__dirname}/../../photo_proofing_app/public/Images/AlbumCovers/${album.cover}`,
      (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting album cover:", err);
        }
      }
    );

    // Hämta alla foton kopplade till albumet
    const photos = await Photo.find({ album: req.params.id });

    // Cascade radera från databasen
    await Photo.deleteMany({ album: req.params.id });

    // Försök radera alla foto- och vattenstämplade filer
    photos.forEach((photo) => {
      fs.unlink(
        `${__dirname}/../../photo_proofing_app/public/Images/Photos/${photo.name}`,
        (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting photo:", err);
          }
        }
      );

      fs.unlink(
        `${__dirname}/../../photo_proofing_app/public/Images/Watermarked/wm_${photo.name}`,
        (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting watermarked photo:", err);
          }
        }
      );
    });

    res.json({ Removed: req.params.id });
  } catch (err) {
    console.error("Error deleting album:", err);
    res.status(500).json({ error: err.message });
  }
});

//Uppdaterar ett album
router.patch("/:id", verify, async (req, res) => {
  try {
    if (req.files) {
      //Ladda upp Album Cover
      if (req.body.cover) {
        const file = req.files.file;
        file.mv(
          `${__dirname}/../../photo_proofing_app/public/Images/AlbumCovers/${req.body.cover}`,
          async (err) => {
            if (err) {
              return res.status(500).json({ Error: err });
            }
          }
        );
      }
      //Ta bort bildfilen om den finns
      if (req.body.oldCover) {
        fs.unlinkSync(
          `${__dirname}/../../photo_proofing_app/public/Images/AlbumCovers/${req.body.oldCover}`
        );
      }
    }
    //Hitta album och uppdatera med nya värden beroende på den data som skickats med
    const album = await Album.findById(req.params.id);
    req.body.name ? (album.name = req.body.name) : null;
    req.body.description ? (album.description = req.body.description) : null;
    req.body.tags ? (album.tags = req.body.tags) : null;
    req.body.cover ? (album.cover = req.body.cover) : null;
    req.body.owner ? (album.owner = req.body.owner) : null;
    req.body.done
    ? album.invites.forEach((invite) => {
      if (invite.email === req.body.email) {
        invite.done = req.body.done;
        invite.comment = req.body.comment; // Update the comment field
      }
    })
  : null;
    req.body.allowDownload
      ? (album.done = album.invites.map((invite) => {
          if (invite.email === req.body.email) {
            invite.downloadableImages = "hi";
          }
        }))
      : null;
    //Lägger till ny email i arrayen med data
    req.body.addEmail
      ? album.invites.push({
          email: req.body.addEmail.email,
          watermarked: req.body.addEmail.watermarked,
        })
      : null;
    //Tar bort en email från arrayen med data
    req.body.removeEmail
      ? (album.invites = album.invites.filter(
          (invite) => invite.email !== req.body.removeEmail.email
        ))
      : null;
    //sätter watermarked till det motsatta värdet(boolean)
    req.body.toggleWatermark
      ? (album.invites = album.invites.map((invite) => {
          if (invite.email === req.body.toggleWatermark.email) {
            invite.watermarked = !invite.watermarked;
          }
          return invite;
        }))
      : null;
    req.body.photos ? (album.photos = req.body.photos) : null;
    await album.save();
    res.json({ Updated: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Om något går fel
  }
});

module.exports = router;