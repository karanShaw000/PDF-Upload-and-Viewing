import { RouteObject } from 'react-router-dom'
import Home from './pages/Home'
import PdfView from './pages/PdfView'
import UploadPdf from './pages/UploadPdf'
import RootLayout from './layouts/RootLayout'
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/pdfview/:fileId",
                element: <PdfView />
            },
            {
                path: "/upload",
                element: <UploadPdf />
            },
        ]
    },
]

