const AboutPage = () => {
  return (
    <div className="mt-4 text-center fs-3">
      <section className="bg-dark text-white p-5 mb-4">
        <div className="card bg-transparent border-0">
          <div className="card-body">
            <h2 className="card-title display-3">Welcome to Our Virtual Campus!</h2>
            <p className="card-text">
              We provide a platform for teachers to create and share lessons with students from anywhere in the
              world. Our mission is to make learning accessible and convenient for everyone.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-success text-dark p-5 mb-4">
        <div className="card bg-transparent border-0">
          <div className="card-body">
            <h2 className="card-title display-3">Features</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-success">Teachers can easily create and manage lessons.</li>
              <li className="list-group-item bg-success">Students can join lessons and access course materials.</li>
              <li className="list-group-item bg-success">Teachers can share files, documents, and resources with students.</li>
              <li className="list-group-item bg-success">Interactive learning environment for effective collaboration.</li>
              <li className="list-group-item bg-success">Minimalistic design for a distraction-free experience.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-dark text-white p-5 mb-4">
        <div className="card bg-transparent border-0">
          <div className="card-body">
            <h2 className="card-title display-3">Get Started</h2>
            <p className="card-text">
              Ready to start learning or teaching? Sign up now and join our virtual campus community! Whether you're
              a student eager to expand your knowledge or a teacher passionate about sharing your expertise, we have
              the tools you need to succeed.
            </p>
            <p className="card-text">
              Have questions or need assistance? Feel free to <a href="/contact" className="text-light">contact us</a>, and we'll be happy
              to help.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;