import Link from "next/link";

const HomePage = () => (
    <div>
        <h1 className="m-10 p-10">Home Page</h1>
        <Link href="/123" className="border ">Go to Dynamic Page with ID 123 </Link>
    </div>
);

export default HomePage;
