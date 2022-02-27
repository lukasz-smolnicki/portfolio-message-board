import React from 'react'

const About = () => {
    return (
        <section>
            <h1 id='message-board'>Message Board</h1>
            <blockquote>
                <p>A simple message board app build in React.
                    Live demo <a href='https://lukasz-smolnicki-message-board.herokuapp.com/'><em>here</em></a>.</p>
            </blockquote>
            <h2 id='general-information'>General information</h2>
            <p>Message Board App. A system by which users may send, read and reply messages</p>
            <p>The main goal is to:</p>
            <ul>
                <li>build an application using react</li>
                <li>store data in localhost</li>
                <li>create reusable components</li>
                <li>do not repeat the code</li>
            </ul>
            <h2 id='technologies-used'>Technologies Used</h2>
            <ul>
                <li>JavaScript</li>
                <li>React.js</li>
                <li>React Router V6</li>
                <li>Bootstrap</li>
            </ul>
            <h2 id='features'>Features</h2>
            <h3 id='thread-post-list'>Thread &amp; Post List</h3>
            <ul>
                <li>[x] Add item when user is logged in</li>
                <li>[x] Delete item when user is logged in</li>
                <li>[x] Edit item when user is logged in</li>
                <li>[x] Sort list</li>
                <li>[x] Filter list</li>
                <li>[x] Display list items number</li>
            </ul>
            <h3 id='other'>Other</h3>
            <ul>
                <li>[x] Pagination</li>
                <li>[x] SignIn form with validation</li>
                <li>[x] SignUp form with validation</li>
            </ul>
            <h2 id='setup'>Setup</h2>
            <p>Clone the repository to your computer, open CLI from the folder run <em>npm i</em> &amp; <em>npm start</em> comand.</p>
            <h2 id='project-status'>Project Status</h2>
            <p>Project is: <em>in progress</em></p>
            <h2 id='to-improvment'>To improvment</h2>
            <ul>
                <li>[ ] Change class component to function component</li>
                <li>[ ] Change props drilling to react Context or Redux</li>
                <li>[ ] Add hooks (useState etc.)</li>
            </ul>
            <h2 id='todo'>Todo</h2>
            <ul>
                <li>[ ] Connect app to database</li>
            </ul>
            <h2 id='contact'>Contact</h2>
            <p><a href='mailto:lukasz.smolnicki@gmail.com'>lukasz.smolnicki@gmail.com</a></p>

        </section>
    )
}

export default About