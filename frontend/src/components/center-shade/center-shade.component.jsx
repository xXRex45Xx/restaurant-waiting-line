import "./center-shade.styles.css"

export default function CenterShade({ children }) {
    return (
        <div className="centerShade">
            <div className="centerShade_children">
                {children}
            </div>
        </div>
    )
}