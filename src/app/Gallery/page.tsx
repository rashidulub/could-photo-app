
import { type } from "os";
import UploadButton from "./Upload-Button";
import cloudinary from "cloudinary";
import { CldImage } from "next-cloudinary";
import { CludinaryImage } from "./Cludinarty-Images";

type searchResult = {
    public_id: string
}

export default async function GalleryPage() {
    const result = await cloudinary.v2.search
        .expression('resource_type:image')
        .sort_by('created_at', 'desc')
        .max_results(30)
        .execute() as { resources: searchResult[] };
    console.log(result);

    return <section>
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold">Gallery</h1>
            <UploadButton ></UploadButton>
            </div>

            <div className=" grid grid-cols-4 gap-4">
                {result.resources.map(result => (
                    <CludinaryImage
                    key={result.public_id}
                    src={result.public_id}
                    alt="image something"
                    width="400"
                    height="300"
                    ></CludinaryImage>
                    
                ))}
            </div>
            

        </div>
    </section>
}