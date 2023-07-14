import './Footer.css'
import { useEffect } from 'react';

function Footer() {
    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
        script1.type = 'module';
        document.body.appendChild(script1);
    
        const script2 = document.createElement('script');
        script2.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
        script2.setAttribute('nomodule', '');
        document.body.appendChild(script2);
    
        return () => {
          // Cleanup script tags if necessary
          document.body.removeChild(script1);
          document.body.removeChild(script2);
        };
      }, []);

    return (
        <footer className="footer">
            <div className="sb_footer section_padding">
                <div className="sb_footer-links">
                    <div className="sb_footer-links-div">
                        <h4>Website made by</h4>
                            <p>Nah Choon Yan</p>
                            <p>Lee Si Yuan</p>
                    </div>
                    <div className="sb_footer-links-div">
                        <h4>Key Technologies</h4>
                            <p>ReactJS</p>
                            <p>PostgreSQL</p>
                            <p>Supabase</p>
                            <p>Git</p>
                            <p>CSS</p>
                    </div>
                    <div className="sb_footer-links-div">
                        <h4>Partners</h4>
                            <p>NUS Sky Lab</p>
                    </div>
                    <div className="sb_footer-links-div">
                        <h4>Company</h4>
                        <a href="/about">
                            <p>About</p>
                        </a>
                        <a href="/motivation">
                            <p>Motivation</p>
                        </a>
                    </div>
                    <div className="sb_footer-links-div">
                        <div className="socialmedia">
                            <a href='/'><span className="facebook"><ion-icon name="logo-facebook"></ion-icon></span></a>
                            <a href='/'><span className="twitter"><ion-icon name="logo-twitter"></ion-icon></span></a>
                            <a href='/'><span className="linkedin"><ion-icon name="logo-linkedin"></ion-icon></span></a>
                            <a href='/'><span className="instagram"><ion-icon name="logo-instagram"></ion-icon></span></a>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="sb_footer-below">
                    <div className="sb_footer-copyright">
                        <p>
                            @{new Date().getFullYear()} tskManager. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer