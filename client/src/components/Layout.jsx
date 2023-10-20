import { Helmet } from "react-helmet";
import { Navbar } from "./Navbar";

// eslint-disable-next-line react/prop-types
export function Layout({ title, content, children }) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={content} />
            </Helmet>

            <Navbar />

            <div className="container mt-5">
                {children}
            </div>

        </>
    )
}