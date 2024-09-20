import { useFetch } from "@/hooks/useFetch"
import { useParams } from "react-router-dom"
// import RenderPdf from "@/components/RenderPdf"

export default function PdfView() {
    const param = useParams()
    const { data, loading, error, header } = useFetch<Blob>({ url: `/pdf/getpdf/${param.fileId}`, responseType: 'blob' })
    return (
        <>
            {
                error && <p className="text-center">{error}</p>
            }

            <div>
                {
                    data && (
                        /* <RenderPdf url={URL.createObjectURL(data)} /> */
                        <iframe src={URL.createObjectURL(new File([data], header['file-name']))} className="h-[90vh] w-screen px-4" />
                    )
                }
            </div>
        </>

    )
}




