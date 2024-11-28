'use client'
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
}

interface Filters {
    region?: string | null;
    country?: string | null;
    officeHours?: boolean;
    openToCollaborate?: boolean;
    friends?: boolean;
    newMember?: boolean;
}

const usePagination = (initialData: User[], filters: Filters) => {
    const [state, setState] = useState({
        users: initialData,
        loading: false,
        page: 2,
        hasMore: true
    });

    const observer = useRef<IntersectionObserver | null>(null);

    const fetchUsers = async (page: number) => {
        try {
            setState((prevState) => ({ ...prevState, loading: true }));
            const data = await fetchData(page, filters);
            setState((prevState) => ({ ...prevState, loading: false }));
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            setState((prevState) => ({ ...prevState, loading: false }));
            return [];
        }
    };

    useEffect(() => {
        const loadFilteredUsers = async () => {
            setState((prevState) => ({ ...prevState, loading: true }));
            const data = await fetchUsers(1);
            setState({
                users: data,
                loading: false,
                page: 2,
                hasMore: data.length > 0,
            });
        };

        loadFilteredUsers();
    }, [JSON.stringify(filters)]);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !state.loading && state.hasMore) {
                setState((prevState) => ({ ...prevState, page: prevState.page + 1 }));
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
    }, [state.loading, state.hasMore]);


    useEffect(() => {
        if (state.page > 1) {
            const loadMoreUsers = async () => {
                const newUsers = await fetchUsers(state.page);
                setState((prevState) => ({
                    ...prevState,
                    users: [...prevState.users, ...newUsers],
                    hasMore: newUsers.length > 0,
                }));
            };

            loadMoreUsers();
        }
    }, [state.page]);

    return { users: state.users, loading: state.loading };
}

export default usePagination



// useEffect(() => {
//     const loadData = async () => {
//         if (state.page === 1) {
//             const data = await fetchUsers(1);
//             setState({
//                 users: data,
//                 loading: false,
//                 page: 2,
//                 hasMore: data.length > 0,
//             });
//         } else {
//             const newUsers = await fetchUsers(state.page);
//             setState((prevState) => ({
//                 ...prevState,
//                 users: [...prevState.users, ...newUsers],
//             }));
//         }
//     };

//     loadData();
// }, [filters.region, filters.country, filters.officeHours, filters.openToCollaborate, state.page]);