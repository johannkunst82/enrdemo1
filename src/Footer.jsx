import React from "react";

function Footer() {
  return (
    <>
    <p style={{height: "200px"}}></p>
    <footer
      className="bg-light text-muted py-3 mt-auto mt-5"
      style={{ width: "100%" }}
    >
      <div className="container text-center">
        <span className="justify-content-left">
          {/* Links */}
          <a href="#privacy" className="text-muted text-decoration-none mx-3">
            Impressum
          </a>
          <a href="#privacy" className="text-muted text-decoration-none mx-3">
            Datenschutz
          </a>
          <a href="#terms" className="text-muted text-decoration-none mx-3">
            AGB
          </a>
        </span>
        <br />
        <span className="small justify-content-right">
            Copyright &copy; {new Date().getFullYear()} KI Energy Optimisation and Transmogrification Wizard Reloaded Plus Plus
        </span>
      </div>
    </footer>
    </>
  );
}

export default Footer;