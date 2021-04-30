const router = require('express').Router()
const { photos } = require('../../controllers/index.js')

router.get('/photos/:albumId/:page', photos.getDataPhotos)
router.get('/photos-view/:id', photos.getDataPhotosByID)
router.get('/list-album',photos.getAlbumList)
router.post('/photos/add', photos.addDataPhotos)
router.post('/photos/edit/:id', photos.editDataPhotos)
router.post('/photos/delete', photos.deleteDataPhotos)

module.exports = router