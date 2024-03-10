const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-us">
          <h2>Contact Us</h2>
          <p>Your company address here</p>
          <p>+123 456 7890</p>
          <p>email@example.com</p>
        </div>
        <div className="social-media">
          <h2>Follow Us</h2>
          {/* Uncomment the lines below if react-icons is installed */}
          {/* <a href="https://twitter.com"><FaTwitter /></a>
          <a href="https://facebook.com"><FaFacebookF /></a>
          <a href="https://instagram.com"><FaInstagram /></a> */}
          <a href="https://twitter.com">Twitter</a>
          <a href="https://facebook.com">Facebook</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;