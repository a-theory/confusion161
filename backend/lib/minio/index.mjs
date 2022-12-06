import Minio from "minio";

export async function initMinio(){
    const isDevelopment = process.env.API_MODE === "DEVELOPMENT";
    const minioClient = new Minio.Client({
        endPoint: isDevelopment ? '127.0.0.1' : "minio.default",
        port: 9000,
        useSSL: false,
        accessKey: 'rootuser',
        secretKey: 'rootpass123',
    });

    await minioClient.bucketExists('mysite', function(err, exists) {
        if (!exists) {
            minioClient.makeBucket('mysite', (err) => {
                if (err) {
                    console.log('minio error '+err);
                }
            });
        }
        if (err) {
            return console.log(err)
        }
    });

    await minioClient.bucketExists('mysiteimages', function(err, exists) {
        if (err) {
            return console.log(err)
        }
        if (!exists) {
            minioClient.makeBucket('mysiteimages', (err) => {
                if (err) {
                    console.log('minio error '+err);
                }
            });
        }
    });

    return minioClient;
}
