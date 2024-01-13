export default function AlertCard({ children, theme }) {
    return (
    <div className='d-flex justify-content-center align-items-center vh-100 px-2' style={{backgroundColor: "var(--primary)"}}>
        <div className={`card bg-${theme}`} style={{width: "36rem", height: "16rem", borderRadius: "16px"}}>
          <div className={`card-body d-flex flex-column justify-content-center text-${theme == "dark" ? "white" : "black"}`}>
              {children}
          </div>
        </div>
    </div>
    )
}