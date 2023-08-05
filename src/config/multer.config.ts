import { diskStorage } from 'multer';
import { extname } from 'path';

export const dirUsers = './uploads/users/';

export const multerConfig = {
  storage: diskStorage({
    destination: dirUsers,
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, 'photo-' + uniqueSuffix + extname(file.originalname));
    },
  }),
};
