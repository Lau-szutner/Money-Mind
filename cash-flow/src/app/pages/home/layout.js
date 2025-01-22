import { Navbar } from "@/app/components/Navbar";

export default function HomeLayout({ children }) {
  return (
    <div>
      <header>
        <nav>
          <Navbar></Navbar>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
