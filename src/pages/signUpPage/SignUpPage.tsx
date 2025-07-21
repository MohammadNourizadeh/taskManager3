import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import AuthPages from "../../components/authPages/AuthPages";

export default function SignUpPage() {
    return (
        <AuthPages pageTitle="sign up" switchLinkAddress="/auth/login" switchLinkName="login" switchLinkText="already have account" titleIcon={faCheckSquare} />
    )
}
