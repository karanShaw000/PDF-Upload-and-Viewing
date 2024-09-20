import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"
import { getAllPdf } from "@/utils/types"
import { useNavigate } from "react-router-dom"
import DownloadPdfButton from "./DownloadPdfButton"

interface PDFCardProps extends getAllPdf { }

export default function PdfCard({ fileId, fileName }: PDFCardProps) {
    const navigate = useNavigate()
    return (
        <Card className="w-full md:flex items-center justify-between py-4 ">
            <CardHeader className="flex-1">
                <CardTitle className="truncate">{fileName}</CardTitle>
            </CardHeader>
            <CardContent className="flex md:justify-center  items-center justify-end  gap-4 py-1">
                <Button variant="outline" size={'icon'} onClick={() => navigate(`/pdfview/${fileId}`)}>
                    <EyeIcon />
                </Button>
                <DownloadPdfButton fileName={fileName} fileId={fileId} />
            </CardContent>
        </Card>
    )
}
