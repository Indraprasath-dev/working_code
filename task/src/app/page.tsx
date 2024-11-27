// import ClientMember from "@/components/Pagination";

// interface MemberProps {
//     searchParams: { [key: string]: string | undefined };
// }

// const Member = ({ searchParams }: MemberProps) => {
//     const region = searchParams.region;
//     const country = searchParams.country;
//     const officeHours = searchParams.OfficeHours === "true";
//     const openToCollaborate = searchParams.OpenToCollaborate === "true";
//     const friends = searchParams.Friends === "true";
//     const newMember = searchParams.NewMember === "true";

//     return (
//     <>
//         {/* right side */}
//         <div className="member__content mt-10">
//                     <div className="member__content_header">
//                         <div className="member__content_title">
//                             <h1 className="member__content_h1"> Members <span className="member__content_span">(1234)</span></h1>
//                         </div>
//                         <div className="member__content_search">
//                             <input type="text" placeholder="Search by Mentor Name, Team or Project" />
//                             <img src="./search.svg"></img>
//                         </div>
//                         <span className="member__content_line"></span>
//                         <div>
//                             <div>Sort by:</div>
//                         </div>

//                         <div className="member__content_sort">
//                             <div className="mr-2">
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="pointer-events-none relative top-px mr-1 h-4 mb-[2px]"><path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"></path></svg>
//                             </div>
//                             <div className="mr-2">
//                                 Ascending
//                             </div>
//                             <div>
//                                 <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.61427 5.53233C3.81426 5.77481 4.18574 5.77481 4.38573 5.53233L7.65534 1.56814C7.92431 1.24202 7.69234 0.75 7.26961 0.75L0.730393 0.75C0.307659 0.75 0.0756859 1.24202 0.344665 1.56814L3.61427 5.53233Z" fill="currentColor"></path></svg>
//                             </div>
//                         </div>

//                         <div className="member__content_view">
//                             <div className="member__content_view_grid">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="stroke-1.5 h-6 w-6 stroke-blue-700"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
//                             </div>
//                             <div className="member__content_view_list">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="stroke-1.5 h-6 w-6 stroke-slate-600 group-focus:stroke-slate-900"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
//                             </div>
//                         </div>
//                     </div>
//             <ClientMember
//                 region={region}
//                 country={country}
//                 officeHours={officeHours}
//                 openToCollaborate={openToCollaborate}
//                 friends={friends}
//                 newMember={newMember} />
//         </div>
//         </>
//     );
// };

// export default Member;
