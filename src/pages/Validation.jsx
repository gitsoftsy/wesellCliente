import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Validation() {
    const navigate = useNavigate()

    useEffect(() => {
        const statusPage = JSON.parse(localStorage.getItem('statusPage'))

        if (statusPage == undefined) {
            navigate('/home')
        } else {
            navigate(statusPage.url)
        }
    }, [])
}