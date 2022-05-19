import "./login-input.styles.css"

export default function LoginInput({ placeholder, id, name }) {
    return (
        <input placeholder={placeholder} name={name} />
    )
}