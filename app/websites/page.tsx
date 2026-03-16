import Link from "next/link";
import Image from "next/image";
import { getWebsitePosts } from "@/lib/notion";

export default async function WebsitesPage() {
    const posts = await getWebsitePosts();

    return (
        <div className="min-h-screen bg-[#f0efec] px-8 py-16">
            <h1 className="mt-8 text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
                websites
            </h1>

            <div className="mt-20 flex justify-center">
                <p className="text-[#737373] text-[clamp(1rem,1.1vw,1.15rem)]">
                    projects to be added soon
                </p>
            </div>
        </div>
    );
}
