import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { uploadPdf } from "@/utils/api/pdf";
import { useNavigate } from "react-router-dom";
import { Progress } from "./ui/progress";
import { FILE_SIZE_LIMIT } from "@/utils/constant";

export default function UploadPdfform() {
    const navigate = useNavigate()
    const [file, setFile] = useState<File | null>(null)
    const [canUpload, setCanUpload] = useState(true)
    const [uploaded, setUploaded] = useState(true)
    const [progress, setProgress] = useState(0)
    const [feedback, setFeedBack] = useState('')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files[0].type !== 'application/pdf') {
                setFeedBack("File is not PDF")
                setCanUpload(false)
            } else if (e.target.files[0].size > FILE_SIZE_LIMIT) {
                setFeedBack(`File size exceeds ${FILE_SIZE_LIMIT / 1048576} MB`)
                setCanUpload(false)
            } else {
                setCanUpload(true)
                setFeedBack('')
            }
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (file) {
            const formData = new FormData()
            formData.append('pdf', file)
            try {
                const res = await uploadPdf(formData, setProgress)
                setFile(null)
                setUploaded(true)
                alert(res.data)
                setFeedBack(res.data)
                navigate('/')
            } catch (e) {
                setUploaded(false)
                setFeedBack("File can't upload")
            }


        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 p-5">
                {
                    file && canUpload && <Progress value={progress} />
                }
                <div className="grid w-full max-w-sm items-center gap-4">
                    <Label htmlFor="pdf">Upload file</Label>
                    <Input
                        id="pdf"
                        type="file"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                    />
                    {file && !canUpload && <Label className="text-destructive">{feedback}</Label>}
                    {!uploaded && <Label className="text-destructive">{feedback}</Label>}
                </div>
                <Button type="submit" disabled={!file || !canUpload}>
                    Submit
                </Button>

            </form>
        </>
    )
}

