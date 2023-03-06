import AWS from "aws-sdk";
import "dotenv/config";

const S3Services = (data, filename) => {
  const s3Bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.ACCESS_SECRET_KEY
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read"
  };
  return new Promise((resolve, reject) => {
    s3Bucket.upload(params, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.Location);
      }
    });
  });
};

export default S3Services;
