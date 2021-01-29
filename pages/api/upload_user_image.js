import multer from "multer";
import nextConnect from "next-connect";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images/user",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
//singleまたはarrayの引数はHTML側のファイルフィールドのパラメータ値
apiRoute.use(upload.single("file"));

apiRoute.post((req, res) => {
  res.status(200).json({ error: `Method '${req.method}' Not Allowed` });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
