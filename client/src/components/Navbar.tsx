import { NavLink } from "react-router-dom"
import { Button } from "./ui/button"

export default function Navbar() {
    return (
        <header className="px-2 py-2">
            <nav>
                <ul className=" flex items-center justify-center gap-4">
                    <li >
                        <NavLink to={"/"} >
                            <Button>Home</Button>
                        </NavLink>
                    </li>
                    <li >
                        <NavLink to={"/upload"} >
                            <Button>Upload</Button>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>

    )
}

