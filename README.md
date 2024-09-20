
# About The Project


A full stack application using React.js that allows users to upload
PDF files and view them. The application compress PDFs larger than 4 MB without compromising quality.


# Prerequisites

In server, for compression i have used the library 'compress-pdf' which internally uses [Ghostscript](https://www.ghostscript.com). So we need to install Ghostscript into our local host system to run server properly.

### Debian systems

Install Ghostscript

```bash
apt-get install ghostscript
```

### Official installation guide to install Ghostscript

* [Installation from official documentation](https://ghostscript.com/doc/current/Install.htm)

* [Download Ghostscript](https://ghostscript.com/download/gsdnld.html)

# Installation and Setup

1. Install Ghostscript in host machine

2. Clone the repo
   ```sh
   git clone https://github.com/karanShaw000/PDF-Upload-and-Viewing.git
   ```
3. Change Directory to PDF-Upload-and-Viewing
   ```sh
   cd PDF-Upload-and-Viewing
   ```
4. Change Directory to client
   ```sh
   cd client
   npm install
   npm run dev
   ```
   This will run the client in localhost:5173
5. Change Directory to server
   ```sh
   cd server
   npm install
   npm run dev
   ```   
   This will run the server in localhost:5000


# Dependencies

**Client:** React, React-Router, file-saver, axios, shadcn.

**Server:** compress-pdf, express, multer


# Usage

**Client:** In Frontend, there are three pages 
- / -> home page where fetch all the pdf file's fileId and fileName and render each one to into a card component which contain two buttons. One for preview which redirect the user to '/pdfview/:fileId' and preview the pdf. Second to download where the where I fetch the pdf content from the sever and using the package 'file-save' give the user to download the pdf.

- /upload -> In this page user can upload the pdf. Here user can only upload pdf with file size limit less the 20 MB. The file size limit can be change in 

```sh
cd utils/constant.ts
```

This also alert the user when file is uploaded and also have a progress when user click the submit button.

- /pdfview/:fileId -> This display the pdf in iframe tag. I fetch the pdf file in blob  and using this blob i create a ObjectURL and then pass this url into the iframe.

**_NOTE:_** Since im using iframe tag so the pdf viewer ui change with respect to the user's browser

**Server:** In server, I used multer to storage the pdf from the client in the disk storage. In the multer middleware, compression is done when server receive the file size greater than 4MB. During saving the file I have generalise the name of the file in this format:

```javascript
const fileName = Date.now() + '-' + path.basename(req.file.originalname)
```

so Date.now() becomes the 'fileId' and the rest after '-' delimiter is the 'fileName' which users sends.
There are three routes: 
- /getallpdf -> Sends a response which contains an array of object where each object contains the fileId and fileName.

- /getpdf/:id -> Finds the File which corresponds to the 'id' in param and send the file to client in readlable stream.

- /uploadpdf -> Receives the pdf using multer and compress it if file size excceds 4MB.

# PDF compression
During research, I found three ways to compress pdf:
- zlib module by node gives us compression function like defalte, gzip,etc. It did not work in my case. In my opinion, this methods compress the file into zip. So we need to decompress it which we can use infalte, gunzip,etc which revert back to the original size. This will be good if we want to store big file in database but to send back the original file we need to decompress it to its original size.

- Ghostscript which can compress the pdf and we can store it in database and can send that same compress file as pdf with reduced file size. The problem was it run in C language. I found two libraries which can run ghostscript in node and use ghostscript under the hood which were:'compress-pdf' and 'ghostscript4js'. In this project I used 'compress-pdf'

-Paid third parties libraries like PDFKit, etc.

The Compression of PDF in written in multer middleware. When the file is receive, we donot store the file in diskstroage. When storage it in memory storage. After File validation(type and file size) and check if file size is greater than 4MB, we  compress the file using 'compress-pdf'. This package provides us with a 'compress()' function which take file buffer as parameter and using fs module's writeFile(), we write down the compress buffer into the 'filepath' where we want to store the compress file.

## Features

**Client:**
- Upload PDF 
- Preview PDF
- Download PDF
- Responsive to Mobile sizes

**Server:**
- Download PDF
- Upload PDF 
- PDF compression



## What can we Improve

**Client**: 
- The PDF Viewer need consitency UI .

**Server:**
- We can use 'ghostscript4js' library to have more control on pdf compression and also use to compress images.


## Lessons Learned
- Learned about the basic of Typescript.

**Client:** 
- How we can accept readStream data from server into blob. We can acheive in axios by giving the parameter 'response-type: blob'.
- Learned about 'react-pdf' and 'react-pdf/renderer' library, but still cannot find the solution to display the pdf in pdf Viewer
-Learned about the basic how file are send to server.

**Server:**
- Learned about multer and how we can check the type and size of file server received.
- Learned about the folder struture of a backend using express and typescript.
- Learned about how controller and routes should be written. 
- Learned about ghostscript interpreter which is used to compress pdf and the libraries like 'compress-pdf' and 'ghostscript4js' that uses ghostscript under the hood.


## Related


- [ghostscript4js](https://github.com/NickNaso/ghostscript4js)
- [How to compress pdf using ghostscript in bash](https://gist.github.com/ahmed-musallam/27de7d7c5ac68ecbd1ed65b6b48416f9)

