
//map through array of links to different page views on the site via nav links in navigation component
export default function Navbar({ links }) {
    return (
      <nav >
        <div>
          <div>
            <ul>
              {links.map((link) => link)}
            </ul>
          </div>
        </div>
      </nav>
    );
  }