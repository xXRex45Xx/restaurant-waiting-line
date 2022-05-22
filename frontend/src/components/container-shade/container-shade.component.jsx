import "./container-shade.styles.css";

export default function ContainerShade({ children }) {
    return (
        <div className="containerShade">
            <div className="containerShade_children">
                {children}
            </div>
        </div>
    )
}