import express from 'express'
import PdfController from '../controller/pdf'

const router = express.Router()


router.post('/uploadpdf', PdfController.UploadPdf)
router.get('/getallpdf', PdfController.getAllPdf)
router.get('/getpdf/:id', PdfController.getPdf)



export default router
