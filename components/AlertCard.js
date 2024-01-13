export default function AlertCard({ children }) {
    return (
    <div className='d-flex justify-content-center align-items-center vh-100 px-2' style={{backgroundColor: "var(--primary)"}}>
        <div className="card bg-dark" style={{width: "36rem", height: "16rem", borderRadius: "16px"}}>
          <div className="card-body d-flex flex-column justify-content-center text-white">
              {children}
          </div>
        </div>
    </div>
    )
}