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

interface MemberListProps {
    member: User;
}

const Card = ({ member }: MemberListProps) => {

    return (
        <div className="member__list card">
            <div className="member__image-container">
                <div className="member__image">
                    <img src="./photo.jpg" alt="photo" />
                </div>
            </div>
            <div className="member__details">
                <div className="member__name">{member.name}</div>
                <div className="member__department">{member.region}</div>
                <div className="member__department">{member.country}</div>
            </div>
            <div className="member__divider"></div>
            <div className="member__product-container">
                <span className="member__product-span"></span>
                <div className="member__product">Engineering</div>
            </div>
        </div>
    );
};

export default Card;
