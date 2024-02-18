const ContactPage = () => {
  // Sample staff data
  const staff = [
    {
      name: "John Doe",
      position: "CEO",
      email: "john@example.com",
      phone: "123-456-7890",
      photo: "/anonymous.jpg", // Replace with actual photo path
    },
    {
      name: "Jane Smith",
      position: "COO",
      email: "jane@example.com",
      phone: "987-654-3210",
      photo: "/anonymous.jpg", // Replace with actual photo path
    },
  ];

  return (
    <section className="vh-100 d-flex justify-content-center align-items-center" style={{backgroundColor: "var(--primary)"}}>
    <div className="container bg-dark p-5" style={{maxWidth: "80%", borderRadius: "18px"}}>
      <h1 className="text-center mb-5 display-4 text-white">Contact Us</h1>
      <div className="row mt-4">
        {staff.map((staffMember, index) => (
          <div key={index} className="col-md-6 mb-4">
            <div className="d-flex justify-content-center" >
              <div className="card bg-dark text-white text-center" >
                <img
                  className="card-img-top"
                  src={staffMember.photo}
                  alt={staffMember.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{staffMember.name}</h5>
                  <p className="card-text">{staffMember.position}</p>
                  <p className="card-text">Email: {staffMember.email}</p>
                  <p className="card-text">Phone: {staffMember.phone}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default ContactPage;
