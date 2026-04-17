import "./styles.css"
import "tailwindcss"

import {Construction} from "lucide-react"

export default function Quiz() {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen gap-10">
            <Construction className="flex text-primary w-40 h-40"/>
            <h1 className="flex text-primary text-7xl">Work in progress...</h1>
        </div>
    )
}