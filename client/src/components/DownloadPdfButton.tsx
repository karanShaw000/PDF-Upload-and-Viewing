import { getAllPdf } from "@/utils/types";
import { Button } from "./ui/button";
import { DownloadIcon } from "lucide-react";
import { getRequest } from "@/utils/getRequest";
import { saveAs } from "file-saver";

export default function DownloadPdfButton({ fileId, fileName }: getAllPdf) {
    const downloadPdfHandler = async () => {
        try {
            const res = await getRequest({ url: `/pdf/getpdf/${fileId}`, responseType: 'blob' })
            saveAs(res.data, fileName)
        } catch (e) {
            console.log(e)
        }


    }
    return (
        <Button size={'icon'} onClick={downloadPdfHandler}>
            <DownloadIcon />
        </Button>
    )
}
