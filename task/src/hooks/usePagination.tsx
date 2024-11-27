import { fetchData } from "@/apiService/memberApi";
import { useState, useRef, useEffect } from "react";

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
    engagementType?: string;
}

interface Filters {
    region?: string;
    country?: string;
    officeHours?: boolean;
    openToCollaborate?: boolean;
    friends?: boolean;
    newMember?: boolean;
}

const usePagination = (initialData: User[], filters: Filters) => {
    const [users, setUsers] = useState<User[]>(initialData);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observer = useRef<IntersectionObserver | null>(null);

    const fetchUsers = async (page: number) => {
        try {
            setLoading(true);
            const data = await fetchData(page, filters);
            setLoading(false);
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
            return [];
        }
    };

    useEffect(() => {
        const loadFilteredUsers = async () => {
            setLoading(true);
            const data = await fetchUsers(1); 
            setUsers(data);
            setPage(2); 
            setHasMore(data.length > 0);
            setLoading(false);
        };

        loadFilteredUsers(); 
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !loading && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        if (!observer.current) {
            observer.current = new IntersectionObserver(observerCallback, { threshold: 1.0 });
        }

        const loadTrigger = document.getElementById("scroll-trigger");
        if (loadTrigger) {
            observer.current.observe(loadTrigger);
        }

        return () => {
            if (observer.current && loadTrigger) {
                observer.current.unobserve(loadTrigger);
            }
        };
    }, [loading, hasMore]);

    useEffect(() => {
        if (page > 1) {
            const loadMoreUsers = async () => {
                const newUsers = await fetchUsers(page);
                setUsers((prevUsers) => [...prevUsers, ...newUsers]);
                setHasMore(newUsers.length > 0);
            };

            loadMoreUsers();
        }
    }, [page]);

    return { users, loading, hasMore };

}   

export default usePagination