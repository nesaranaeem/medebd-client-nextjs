import Footer from "@/components/footer/Footer";
import NavBar from "@/components/menu/header/NavBar";
import SearchMenu from "@/components/menu/searchMenu/SearchMenu";

export default function MainLayout({ children }) {
  return (
    <>
      <div className="navbar-wrapper sticky top-0 bg-white z-50">
        <NavBar />
      </div>
      <SearchMenu />
      <main className="bg-gray-700 py-5">{children}</main>

      <Footer />
    </>
  );
}
