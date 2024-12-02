"use client";
import "../styles/member.css";
import "../styles/loader.css"
import usePagination from "@/hooks/usePagination";
import Card from "./memberCard";
import Loader from "./loader";

interface User {
    uid: string;
    name: string;
    email: string;
    imageUid: string;
    githubHandler: string | null;
    discordHandler: string | null;
    twitterHandler: string | null;
    linkedinHandler: string | null;
    telegramHandler: string | null;
    officeHours: string | null;
    moreDetails: string | null;
    bio: string | null;
    plnFriend: boolean;
    plnStartDate: string;
    airtableRecId: string;
    externalId: string;
    openToWork: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    approvedAt: string;
    locationUid: string;
    preferences: string | null;
    region?: string;
    country?: string;
}

interface MemberProps {
    initialData: User[];
}

const Member = ({initialData}: MemberProps) => {


    const {users, loading} = usePagination(initialData);
    
    // useEffect(() => {
    //     if (scrollContainerRef.current) {
    //         scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    //     } else {
    //         window.scrollTo({ top: 0, behavior: "smooth" });
    //     }
    // }, [JSON.stringify(filters)]);

    return (
        <div  className="member__card-wrapper">
        {/* </div><div key={JSON.stringify(filters)}  className="member__card-wrapper"> */}
            <div className="">
                {loading && <Loader />}
            </div>
            <div className="member__card">
                {users.map((item, index) => (
                    <Card key={`${item.uid}-${index}`} member={item} />
                ))}
                <div id="scroll-trigger" className="infinite__scroll-trigger"></div>
            </div>
            
        </div>
    );
};

export default Member;
