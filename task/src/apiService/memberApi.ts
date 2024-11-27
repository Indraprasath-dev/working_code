const regions = ["Africa", "Asia", "Europe", "NorthAmerica", "NotDefined", "Oceania", "SouthAmerica"]
const countries = ["Argentina", "Armenia", "Australia", "Belarus", "Belgium", "Brazil", "Cambodia", "Cameroon", "Canada", "Chile"]

export const fetchData = async (pageNumber: number,
    filters: {
        region?: string;
        country?: string;
        officeHours?: boolean;
        openToCollaborate?: boolean;
        friends?: boolean;
        newMember?: boolean;
    }) => {
    try {
        const res = await fetch(`https://stag-protocol-labs-network-api.herokuapp.com/v1/members?pagination=true&page=${pageNumber}&limit=60`)
        if (!res.ok) {
            console.error(`Error: ${res.status} ${res.statusText}`)
        }
        const jsonData = await res.json()
        for (let i = 0; i < jsonData.length; i++) {
            jsonData[i].region = regions[i % regions.length]
            jsonData[i].country = countries[i % countries.length]
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
        console.error('Error fetching members:', error)
        return []
    }
}
