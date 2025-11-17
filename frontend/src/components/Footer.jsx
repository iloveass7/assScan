import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          Made with <span className="heart">♥</span> for students everywhere
        </p>
        <p className="footer-copyright">
          © {currentYear} AssScan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer