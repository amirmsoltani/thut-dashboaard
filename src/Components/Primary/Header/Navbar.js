import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
function Navbar({items}) {
    return (
        <nav className="nav">
            {
                items.map(item =>
                    <Link className="nav_item" to={item.slug} key={item.slug}>
                        {item.text}
                    </Link>
                )
            }
        </nav>
    )
}
const mapStateToProps=state=>({items:state.Primary.nav});
export default connect(mapStateToProps)(Navbar);