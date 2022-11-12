import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
    return (
        <>
            <Header />
                 <main class="px-7 sm:px-10 md:px-28 lg:px-32">
                    { children }
                </main>
            <Footer />
        </>
    )
}

export default Layout