import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer class="bg-danger fixed-bottom text-center text-lg-start">
            <div class="text-center p-3">
                © 2022 Created by: <a class="link-dark text-decoration-none" href="https://github.com/lukasz-smolnicki"><FontAwesomeIcon icon={faGithub} /> Łukasz Smolnicki</a>
            </div>
        </footer>
    )
}

export default Footer