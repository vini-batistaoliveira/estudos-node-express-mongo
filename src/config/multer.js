const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const storageType ={
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,path.resolve(__dirname, '..', '..', 'temp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err)cb(err); //repassou o erro do multer para controller
                
                //aqui trata o nome da imagem
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                
                cb(null, file.key);
            });
        },
    }),

    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'upload-testes3-rocketseat',
        contentType: multerS3.AUTO_CONTENT_TYPE, //ler tipo arquivo upload e atribui o content type
        acl: 'public-read', //permissao de leitura
        key: (req, file, cb) =>{
            crypto.randomBytes(16, (err, hash) => {
                if(err)cb(err); //repassou o erro do multer para controller
                
                //aqui trata o nome da imagem
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                
                cb(null, fileName);
            });
        }
    }),

}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
    storage: storageType[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 2 * 1024 * 1014,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/jpg',
            'image/png',
            'image/gif',
        ];

        if(allowedMimes.includes(file.mimetype)){
            //primeiro parametro é o erro e o segundo é sucesso
            cb(null, true);
        } else{
            //aqui deu erro
           
            cb(new Error('Invalid file type.'))
        }
    },
};
