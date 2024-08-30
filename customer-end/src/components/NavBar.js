import 'bootstrap-icons/font/bootstrap-icons.css';
import './Style.css'; 

function isActive(page, activePage) {
  return page === activePage ? 'active' : '';
}

function NavBar({ currentPage }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand gradient-text-0" href="/">Shop <i className="bi bi-cart-fill"></i> </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mx-auto">
            <a 
              className={` nav-link gradient-text-${isActive('Home', currentPage)}`} 
              href="/" 
              style={{ pointerEvents: 'none' }}>
              Home
            </a>
            <a className={`nav-link gradient-text-${isActive('Link', currentPage)}`} href="#">Link</a>
          </div>
          <ul className="navbar-nav mb-2 mb-lg-0 ">
            <li className="nav-item dropdown dropstart">
              <a 
                className="nav-link dropdown-toggle gradient-text-" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                Account
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item gradient-text-" href="/profile"> <i className="bi bi-person"></i> Profile</a></li>
                <li><a className="dropdown-item gradient-text-" href="">Another action</a></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li>
                  <a 
                    className="dropdown-item gradient-text-" 
                    href="#" 
                    onClick={() => {
                      localStorage.removeItem('token');
                      window.location.href = '/signin';
                    }}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
