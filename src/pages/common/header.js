import React from 'react';
import './Header.css';

const Header = () => {
    return(
        <section className="head-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <span className="logo-text">Byju</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;