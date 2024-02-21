export default function GradBack({ children, theme }) {
    return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100 px-2' style={{background: "var(--grad)"}}>
        {children}
    </div>  
    )
}