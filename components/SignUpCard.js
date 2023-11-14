export default function SignUpCard({ children }) {
    return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{backgroundColor: "#fcba03"}}>
        <div className="card" style={{width: "24rem"}}>
          <div className="card-body">
            <h5 className="card-title">Sign Up</h5>
            <p className="card-text">Please sign up using your Google account.</p>
            {children}
          </div>
        </div>
    </div>
    )
}