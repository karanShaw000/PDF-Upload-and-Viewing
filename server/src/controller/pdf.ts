import { Request, Response } from "express";
import multerUpload from "../config/multerUpload";
import multer from "multer";
import { readdir, writeFile } from "fs/promises";

import { getAllPdfResponse } from "../types";
import { createReadStream, createWriteStream, statSync, WriteStream } from "fs";
import path from "path";
import { compress } from 'compress-pdf'


class PdfController {
    private static folderPath = './uploads/'

    static UploadPdf = async (req: Request, res: Response) => {
        multerUpload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                console.error(err);
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(400).send("File is not type Pdf")
                } else if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).send("File size exceeds 20MB")

                } else {
                    return res.status(500).send(err.message);
                }
            }
            if (!req.file) {
                return res.status(400).send('Please send a file');
            }

            try {
                const fileName = Date.now() + '-' + path.basename(req.file.originalname)
                // const saveTo = path.resolve('./', "uploads");
                const filePath = path.join(this.folderPath, fileName);

                if (req.file.size > 4194304) {
                    const buffer = await compress(req.file.buffer)
                    await writeFile(filePath, buffer)

                    // deflate(req.file.buffer, (err, compressBuffer) => {
                    //     console.log('in compress', compressBuffer)
                    //
                    //     writeFile(filePath, compressBuffer).then(() => {
                    //         console.log('Buffer has been written to file successfully');
                    //         return res.send('File Compressed and Uploaded maybe')
                    //     }).catch((err) => {
                    //         console.error(err);
                    //     });
                    // })


                    // const gzip = createGzip()
                    // const unzip = createUnzip()
                    // const out = createWriteStream(filePath)
                    // req.file.stream.pipe(gzip).pipe(unzip).pipe(out)
                    return res.send('File Compressed and Uploaded ').status(200)


                } else {
                    writeFile(filePath, req.file.buffer).then(() => {
                        console.log("less size file")
                        return res.send('File uploaded!');
                    }).catch(err => console.error(err))
                }
            } catch (e) {
                return res.status(500).send("Something went wrong");
            }
        });
    }


    static getAllPdf = async (req: Request, res: Response) => {
        const arrOfPdfNames: getAllPdfResponse = []
        try {
            const pdfFiles = await readdir(PdfController.folderPath)
            pdfFiles.map(file => {
                const delimiterFirstIndex = file.indexOf('-')

                const fileName = file.slice(delimiterFirstIndex + 1)

                const fileId = file.slice(0, delimiterFirstIndex)

                const pdfObject = { fileId, fileName }
                arrOfPdfNames.push(pdfObject)

            })
            return res.status(200).json(arrOfPdfNames)
        } catch (e) {
            return res.status(500).send('Something went wrong')
        }

    }

    static getPdf = async (req: Request<{ id: string }>, res: Response) => {
        const fileId = req.params.id

        // if (!fileId) {
        //     return res.status(400).send("File Id is missing")
        // }

        try {
            const pdfFiles = await readdir(PdfController.folderPath)

            const requiredFile = pdfFiles.find(file => {
                const delimiterFirstIndex = file.indexOf('-')
                const fileIdFromFolder = file.slice(0, delimiterFirstIndex)
                if (fileIdFromFolder === fileId) return file
            })

            if (!requiredFile) {
                return res.status(400).send("File does not exists")
            }

            const requiredFileName = requiredFile.slice(requiredFile.indexOf('-') + 1)

            const path = `${PdfController.folderPath}${requiredFile}`; // path where to file is stored in server
            const rs = createReadStream(path);
            const { size } = statSync(path)
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Length", size);
            res.setHeader('File-Name', requiredFileName)
            return rs.pipe(res).status(200)

        } catch (e) {
            return res.status(500).send('Something went wrong')
        }
    }
}

export default PdfController
