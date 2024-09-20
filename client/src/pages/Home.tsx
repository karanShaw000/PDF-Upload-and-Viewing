import { useFetch } from "@/hooks/useFetch"
import PdfCard from '@/components/PdfCard'
import { getAllPdf } from "@/utils/types"

export default function Home() {
    const { data, loading, error } = useFetch<getAllPdf[]>({ url: '/pdf/getallpdf' })
    return (
        <section className=" max-w-3xl w-full mx-auto flex justify-center items-center">
            {
                loading && <p className="text-center"> Loading...</p>
            }
            {
                error && <p className="text-center">{error}</p>
            }
            {
                !loading && data && (
                    <div className="w-full px-4 py-2 space-y-4">
                        {
                            data.length === 0 && <p className="text-center">No PDF Uploaded</p>
                        }
                        {
                            data.length !== 0 && data.map(file => <PdfCard key={file.fileId} fileId={file.fileId} fileName={file.fileName} />)
                        }
                    </div>
                )
            }
        </section>
    )
}
