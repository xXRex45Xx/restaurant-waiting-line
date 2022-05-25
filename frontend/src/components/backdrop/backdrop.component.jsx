import "./backdrop.styles.css"

export default function Backdrop ({onConfirm}) {
    return (
        <div className="backdrop" onClick={onConfirm}></div>
    )
}