import { Navbar } from "@/app/components/Navbar"



export default function HomeLayout({ children }) {



    return (
      <div>
        <header>
            <Navbar></Navbar>
        </header>

        <main></main>
      </div>
    )
  }