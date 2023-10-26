/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet"
import { Navbar } from "./Navbar";

export function Layout({ title, content, children }) {
  return (
  <>

    <Helmet>
      <title>{title}</title>
      <meta name='description' content={content} />
    </Helmet>

    <Navbar />

    <div>
      {children}
    </div>
  </>
  )
}