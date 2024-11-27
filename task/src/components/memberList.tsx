"use client";
import "../styles/member.css";
import { useSearchParams } from "next/navigation";
import usePagination from "@/hooks/usePagination";
import Card from "./memberCard";

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

const Member = ({ initialData }: MemberProps) => {

    const searchParams = useSearchParams();

    const filters = {
        region: searchParams.get("region") || undefined,
        country: searchParams.get("country") || undefined,
        officeHours: searchParams.get("OfficeHours") === "true",
        openToCollaborate: searchParams.get("OpenToCollaborate") === "true",
        friends: searchParams.get("Friends") === "true",
        newMember: searchParams.get("NewMember") === "true",
    };

    const { users, loading } = usePagination(initialData, filters);

    return (
        <div className="member__card-wrapper">
            <div className="member__card">
                {users.map((item) => (
                    <Card key={item.uid} member={item} />
                ))}
                <div id="scroll-trigger" className="infinite__scroll-trigger"></div>
            </div>
            <div className="loader">
                {loading && <div>Loading...</div>}
            </div>
        </div>
    );
};

export default Member;
