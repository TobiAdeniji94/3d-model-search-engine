import { Nav, NavLink } from "@/components/Nav"
import SearchBar from "@/components/SearchBar"

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        {/* <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink> */}
        {/* <input
          type="text"
          placeholder="Search..."
          className="search-bar" // You can define styles for this class in your CSS
          style={{
            marginLeft: "auto", // Pushes the search bar to the far right
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        /> */}
        <div className="ml-auto w-full max-w-md">
          <SearchBar />
        </div>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  )
}
