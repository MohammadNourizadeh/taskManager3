import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import AuthPages from "../../components/authPages/AuthPages";

export default function LogInPage() {
    return (
        <AuthPages pageTitle="login" switchLinkAddress="/auth/signup" switchLinkName="sign up" switchLinkText="don't have account" titleIcon={faUserCheck} />
    )
}
