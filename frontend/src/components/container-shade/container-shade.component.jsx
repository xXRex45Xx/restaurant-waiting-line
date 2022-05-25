import "./container-shade.styles.css";

export default function ContainerShade({ children, className }) {
    return (
        <div className={`containerShade ${className}`}>
            <div className="containerShade_children">
                {children}
            </div>
        </div>
    )
}