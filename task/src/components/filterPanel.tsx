'use client'
import "../styles/filter.css";
import { useRouter, useSearchParams } from "next/navigation"

const regions = ["Africa", "Asia", "Europe", "NorthAmerica", "NotDefined", "Oceania", "SouthAmerica"]
const countries = ["Argentina", "Armenia", "Australia", "Belarus", "Belgium", "Brazil", "Cambodia", "Cameroon", "Canada", "Chile"]

const FilterPanel = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (params.get(key) === value) {
            params.delete(key)
        } else {
            params.set(key, value);
        }

        router.push(`/members?${params.toString()}`)
    }

    const handleRegion = (region: string) => {
        const params = new URLSearchParams(searchParams.toString()) 

        if (params.get('region') === region) {
            params.delete('region') 
        } else {
            params.set('region', region) 
        }
     
        router.push(`/members?${params.toString()}`) 
    } 
    
    const handleCountry = (country: string) => {
        const params = new URLSearchParams(searchParams.toString()) 
    
        if (params.get('country') === country) {
            params.delete('country') 
        } else {
            params.set('country', country) 
        }
    
        router.push(`/members?${params.toString()}`) 
    }
    

    const handleClearFilters = () => {
        router.push("/members")
    }

    const handleToggle = (toggleKey: string) => {
        const params = new URLSearchParams(searchParams.toString()) 
        const isActive = params.get(toggleKey) === 'true' 

        if (isActive) {
            params.delete(toggleKey) 
        } else {
            params.set(toggleKey, 'true') 
        }

        router.push(`/members?${params.toString()}`) 
    } 
    
    return (
        <>
            <div className="filter__controls pt-5 pl-10 pr-7">
                <div className="filter__controls-label">
                    Filters
                </div>
                <div className="filter__controls-clear">
                    <button onClick={handleClearFilters}>Clear Filters</button>
                </div>
            </div>
            <div className="filter__controls-span"></div>

            <div className="member__filters pt-5 pl-10 pr-">
                <div className="filter__office-hours filter">
                    <h3 className="filter__title">Only Show Members with Office Hours</h3>
                    <label className="switch ">
                        <input type="checkbox" checked={searchParams.get('OfficeHours') === 'true'} onChange={() => handleToggle("OfficeHours")}/>
                        <span className="slider -ml-1" ></span>
                    </label>
                </div>
                <div className="filter__collaboration filter">
                    <h3 className="filter__title" >Open to Collaborate</h3>
                    <label className="switch">
                        <input type="checkbox" checked={searchParams.get('OpenToCollaborate') === 'true'} onChange={() => handleToggle("OpenToCollaborate")}/>
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="filter__friends filter">
                    <h3 className="filter__title">Include Friends of Protocol Labs</h3>
                    <label className="switch">
                        <input type="checkbox" checked={searchParams.get('Friends') === 'true'}  onChange={() => handleToggle("Friends")} />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="filter__new-members filter">
                    <h3 className="filter__title">New Members</h3>
                    <label className="switch">
                        <input type="checkbox" checked={searchParams.get('NewMember') === 'true'} onChange={() => handleToggle("NewMember")}/>
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            <div className="pl-10 pr-7">
                <span className="filter__span"></span>
                <h2>Region</h2>
                <div className="filter__region">
                    {regions.map((region) =>{
                        const isActive = searchParams.get('region') === region
                        return (
                        <button key={region} onClick={()=>handleRegion(region)} className={`Filter__button ${isActive ? 'active' : ''}`}>{region}</button>
                    ) 
                    })}
                </div>
            </div>

            <div className="pl-10 pr-7 pb-6">
                <span className="filter__span"></span>
                <h2>Country</h2>
                <div className="filter__region">
                    {countries.map((country) => {
                        const isActive = searchParams.get('country') === country       
                        return(
                        <button key={country} onClick={()=>handleCountry(country)} className={`Filter__button ${isActive ? 'active' : ''}`}>{country}</button>
                    )
                    })}
                </div>
            </div></>
    )
}

export default FilterPanel