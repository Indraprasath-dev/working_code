import { API_BASE_URL, DEFAULT_LIMIT, REGIONS, COUNTRIES } from "@/constants/constants";

export const fetchData = async (pageNumber: number,
    filters: {
        region?: string | null;
        country?: string | null;
        officeHours?: boolean;
        openToCollaborate?: boolean;
        friends?: boolean;
        newMember?: boolean;
    }) => {
    try {
        const res = await fetch(`${API_BASE_URL}?pagination=true&page=${pageNumber}&limit=${DEFAULT_LIMIT}`)
        if (!res.ok) {
            console.error(`Error: ${res.status} ${res.statusText}`)
        }
        const jsonData = await res.json()
        for (let i = 0; i < jsonData.length; i++) {
            jsonData[i].region = REGIONS[i % REGIONS.length]
            jsonData[i].country = COUNTRIES[i % COUNTRIES.length]
        }

        const filteredData = jsonData.filter((user: any) => {
            const matchesRegion = filters.region ? user.region === filters.region : true;
            const matchesCountry = filters.country ? user.country === filters.country : true;
            const matchesEngagementType =
                (filters.officeHours && user.officeHours !== null) ||
                (filters.openToCollaborate && user.openToWork === true) ||
                (filters.friends && user.plnFriend === true) ||
                (filters.newMember && user.isFeatured === true);

            return (
                matchesRegion &&
                matchesCountry &&
                (matchesEngagementType ||
                    (!filters.officeHours && !filters.openToCollaborate && !filters.friends && !filters.newMember))
            );
        });
        return filteredData;
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}
