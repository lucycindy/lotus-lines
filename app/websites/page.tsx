import Link from "next/link";
import Image from "next/image";
import { getWebsitePosts } from "@/lib/notion";
import BackButton from "@/components/BackButton";
import Breadcrumb from "@/components/Breadcrumb";

export const revalidate = 30;


export default async function WebsitesPage() {
    const posts = await getWebsitePosts();

    return (
        <div className="min-h-screen content-wrapper pb-16">
            <Breadcrumb section="websites" />
            <div className="w-full mt-6">
                <BackButton href="/" />
            </div>
            <h1 className="mt-8 text-center text-[clamp(1.5rem,2.5vw,2rem)] font-medium text-[#b83143]">
                websites
            </h1>

            <div className="mt-20 flex justify-center">
                <p className="text-[#737373] text-[15px] md:text-[clamp(1rem,1.1vw,1.15rem)]">
                    projects to be added soon
                </p>
            </div>
        </div>
    );
}
