'use client'
import { fetchData } from "@/apiService/memberApi";
import { useSearchParams } from "next/navigation";
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

const usePagination = (initialData: User[]) => {
    const [state, setState] = useState({
        users: initialData,
        loading: false,
        page: 1,
        hasMore: true
    });

    const searchParams = useSearchParams();

    const filters = {
        region: searchParams.get("region"),
        country: searchParams.get("country"),
        officeHours: searchParams.get("OfficeHours") === "true",
        openToCollaborate: searchParams.get("OpenToCollaborate") === "true",
        friends: searchParams.get("Friends") === "true",
        newMember: searchParams.get("NewMember") === "true",
    };

    const observer = useRef<IntersectionObserver | null>(null);

    const fetchUsers = async (page: number) => {
        try {
            const data = await fetchData(page, filters);
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

   
    useEffect(() => {
        const loadFilteredUsers = async () => {
            setState((prevState) => ({ ...prevState, loading: true, page: 1, users: [], hasMore: true }));
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
    }, [state.hasMore]);

    useEffect(() => {
        if (state.page > 1) {
            const loadMoreUsers = async () => {
                setState((prevState) => ({ ...prevState, loading: true }));
                const newUsers = await fetchUsers(state.page);
                setState((prevState) => ({
                    ...prevState,
                    users: [...prevState.users, ...newUsers],
                    hasMore: newUsers.length > 0,
                    loading: false
                }));
            };

            loadMoreUsers();
        }
    }, [state.page]);

    return { users: state.users, loading: state.loading };
}

export default usePagination;







// 'use client'
// import { fetchData } from "@/apiService/memberApi";
// import { useSearchParams } from "next/navigation";
// import { useState, useRef, useEffect } from "react";

// interface User {
//     uid: string;
//     name: string;
//     email: string;
//     imageUid: string;
//     githubHandler: string | null;
//     discordHandler: string | null;
//     twitterHandler: string | null;
//     linkedinHandler: string | null;
//     telegramHandler: string | null;
//     officeHours: string | null;
//     moreDetails: string | null;
//     bio: string | null;
//     plnFriend: boolean;
//     plnStartDate: string;
//     airtableRecId: string;
//     externalId: string;
//     openToWork: boolean;
//     isFeatured: boolean;
//     createdAt: string;
//     updatedAt: string;
//     approvedAt: string;
//     locationUid: string;
//     preferences: string | null;
//     region?: string;
//     country?: string;
// }

// const usePagination = (initialData: User[]) => {
//     const [state, setState] = useState({
//         users: initialData,
//         loading: false,
//         page: 1,
//         hasMore: true
//     });

//     const searchParams = useSearchParams();


//     const filters = {
//         region: searchParams.get("region"),
//         country: searchParams.get("country"),
//         officeHours: searchParams.get("OfficeHours") === "true",
//         openToCollaborate: searchParams.get("OpenToCollaborate") === "true",
//         friends: searchParams.get("Friends") === "true",
//         newMember: searchParams.get("NewMember") === "true",
//     };

//     const observer = useRef<IntersectionObserver | null>(null);

//     const fetchUsers = async (page: number) => {
//         try {
//             const data = await fetchData(page, filters);
//             return data;
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             return [];
//         }
//     };

//     useEffect(() => {
//         const loadFilteredUsers = async () => {
//             setState((prevState) => ({ ...prevState, loading: true }));
//             const data = await fetchUsers(1);
//             setState({
//                 users: data,
//                 loading: false,
//                 page: 2,
//                 hasMore: data.length > 0,
//             });
//         };
//         loadFilteredUsers();
//     }, [JSON.stringify(filters)]);

    
//     useEffect(() => {
//         const observerCallback = (entries: IntersectionObserverEntry[]) => {
//             const target = entries[0];
//             if (target.isIntersecting && !state.loading && state.hasMore) {
//                 setState((prevState) => ({ ...prevState, page: prevState.page + 1 }));
//             }
//         };

//         if (!observer.current) {
//             observer.current = new IntersectionObserver(observerCallback, { threshold: 1.0 });
//         }

//         const loadTrigger = document.getElementById("scroll-trigger");
//         if (loadTrigger) {
//             observer.current.observe(loadTrigger);
//         }

//         return () => {
//             if (observer.current && loadTrigger) {
//                 observer.current.unobserve(loadTrigger);
//             }
//         };
//     }, [state.hasMore]);



//     useEffect(() => {
//         if (state.page > 1) {
//             const loadMoreUsers = async () => {
//                 setState((prevState) => ({ ...prevState, loading: true }));
//                 const newUsers = await fetchUsers(state.page);
//                 setState((prevState) => ({
//                     ...prevState,
//                     users: [...prevState.users, ...newUsers],
//                     hasMore: newUsers.length > 0,
//                     loading: false
//                 }));
//             };

//             loadMoreUsers();
//         }
//     }, [state.page]);

//     return { users: state.users, loading: state.loading };
// }

// export default usePagination




// useEffect(() => {
//     const loadFilteredUsers = async () => {
//         setState((prevState) => ({ ...prevState, loading: true }));
//         const data = await fetchUsers(1);
//         setState({
//             users: data,
//             loading: false,
//             page: 2,
//             hasMore: data.length > 0,
//         });
//     };
//     loadFilteredUsers();
// }, [JSON.stringify(filters)]);






// // useEffect(() => {
// //     const loadData = async () => {
// //         if (state.page === 1) {
// //             const data = await fetchUsers(1);
// //             setState({
// //                 users: data,
// //                 loading: false,
// //                 page: 2,
// //                 hasMore: data.length > 0,
// //             });
// //         } else {
// //             const newUsers = await fetchUsers(state.page);
// //             setState((prevState) => ({
// //                 ...prevState,
// //                 users: [...prevState.users, ...newUsers],
// //             }));
// //         }
// //     };

// //     loadData();
// // }, [filters.region, filters.country, filters.officeHours, filters.openToCollaborate, state.page]);





// In this code, it fetch only initial data, others not
// import { fetchData } from "@/apiService/memberApi";
// import { useState, useEffect, useRef } from "react";

// interface User {
//     uid: string;
//     name: string;
//     email: string;
//     imageUid: string;
//     githubHandler: string | null;
//     discordHandler: string | null;
//     twitterHandler: string | null;
//     linkedinHandler: string | null;
//     telegramHandler: string | null;
//     officeHours: string | null;
//     moreDetails: string | null;
//     bio: string | null;
//     plnFriend: boolean;
//     plnStartDate: string;
//     airtableRecId: string;
//     externalId: string;
//     openToWork: boolean;
//     isFeatured: boolean;
//     createdAt: string;
//     updatedAt: string;
//     approvedAt: string;
//     locationUid: string;
//     preferences: string | null;
//     region?: string;
//     country?: string;
// }

// interface Filters {
//     region?: string | null;
//     country?: string | null;
//     officeHours?: boolean;
//     openToCollaborate?: boolean;
//     friends?: boolean;
//     newMember?: boolean;
// }

// const usePagination = (initialData: User[], filters: Filters) => {
//     const [state, setState] = useState({
//         users: initialData,
//         loading: false,
//         page: 1,
//         hasMore: true,
//     });

//     const observer = useRef<IntersectionObserver | null>(null);

//     const fetchUsers = async (page: number, isReset = false) => {
//         try {
//             setState((prevState) => ({ ...prevState, loading: true }));
//             const data = await fetchData(page, filters);

//             setState((prevState) => ({
//                 ...prevState,
//                 users: isReset ? data : [...prevState.users, ...data],
//                 hasMore: data.length > 0,
//                 loading: false,
//                 page: isReset ? 2 : prevState.page + 1,
//             }));
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setState((prevState) => ({ ...prevState, loading: false }));
//         }
//     };

//     // Handle filter changes
//     useEffect(() => {
//         fetchUsers(1, true); // Reset state and fetch fresh data
//     }, [JSON.stringify(filters)]);

//     // Infinite scroll observer
//     useEffect(() => {
//         const observerCallback = (entries: IntersectionObserverEntry[]) => {
//             const target = entries[0];
//             if (target.isIntersecting && state.hasMore && !state.loading) {
//                 fetchUsers(state.page);
//             }
//         };

//         if (!observer.current) {
//             observer.current = new IntersectionObserver(observerCallback, { threshold: 1.0 });
//         }

//         const loadTrigger = document.getElementById("scroll-trigger");
//         if (loadTrigger) observer.current.observe(loadTrigger);

//         return () => {
//             if (loadTrigger) observer.current?.unobserve(loadTrigger);
//         };
//     }, [state.hasMore, state.loading]);

//     return { users: state.users, loading: state.loading };
// };

// export default usePagination;
