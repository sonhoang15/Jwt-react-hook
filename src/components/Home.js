import React from 'react';
import './Home.scss'
import img1 from '../asset/illu-editor.webp'


const Home = () => {
    return (
        <>
            <div className="banner">
                <div className="content-left">
                    <div className='block-content'>
                        <i className="fa fa-codepen" aria-hidden="true"></i>
                        <h1>The best place to build, test, and discover front-end code.</h1>
                    </div>
                    <p>Code is a
                        <strong> social development environment</strong> for front-end designers and developers.
                        Build and deploy a website, show off your work, build test cases to learn and debug, and find inspiration.
                    </p>
                </div>
                <div className="content-right">
                    <img className="img" src={img1} alt="banner" />
                    <div className="filter-content">
                        <div className="background" />
                        <div className="firt-box">
                            <header>
                                <i className="fa fa-cog" aria-hidden="true"></i>
                                <div>HTML</div>
                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                            </header>
                            <div className="content">
                                <code>
                                    <span className="code-div">&lt;div</span>
                                    <span className="code-class"> className</span>
                                    <span className='punctuation'>=</span>
                                    <span className="code-react">"react"</span>
                                    <span className="code-div">&gt;&lt;/div&gt;</span>
                                </code>
                            </div>
                        </div>
                        <div className="seccond-box firt-box">
                            <header>
                                <i className="fa fa-cog" aria-hidden="true"></i>
                                <div>SCSS</div>
                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                            </header>
                            <div className="content">
                                <code>
                                    <p className="p1">
                                        <span className="code-class">.react</span>
                                        <span className='punctuation'>{' {'}</span>
                                    </p>
                                    <p className="p2">
                                        <span className="code-scss-background bg">background</span>
                                        <span className='punctuation'>:</span>
                                        <span className="code-scss-react code-class">linear-gradient</span>
                                        <span className='punctuation'>(</span>
                                    </p>

                                    <p className="p3">
                                        <span className="code-scss--119deg deg">-119deg</span>
                                        <span className='punctuation'>,</span>
                                    </p>

                                    <p className="p4">
                                        <span className="code-scss-react deg code-class">$gray</span>
                                        <span className="code-scss--119deg"> 0%</span>
                                        <span className='punctuation'>,</span>
                                    </p>

                                    <p className="p5">
                                        <span className="code-scss-react deg code-class">$dark-gray</span>
                                        <span className="code-scss--119deg"> 100%</span>
                                        <span className='punctuation'>)</span>
                                        <span className='punctuation'>;</span>
                                        <span className='punctuation'>{' }'}</span>
                                    </p>
                                </code>
                            </div>
                        </div>
                        <div className="third-box firt-box">
                            <header>
                                <i className="fa fa-cog" aria-hidden="true"></i>
                                <div>JS</div>
                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                            </header>
                            <div className="content">
                                <code>
                                    <span className="code-class">var</span>
                                    <span className='punctuation'>{" "}</span>
                                    <span className="code-colors">colors</span>
                                    <span className='punctuation'>= [</span>
                                    <span className="code-react">"#74B087"</span>
                                    <span className='punctuation'>,</span>
                                    <span className="code-react">"#DE7300"</span>
                                    <span className='punctuation'>,</span>
                                    <span className="code-react">"#74B087"</span>
                                    <pan className='punctuation'>];</pan>
                                    <span className="HeaderHero-module_cc-HDcib"></span>
                                    <br />
                                    <p className='text-function'>
                                        <span className="code-class">function</span>
                                        <span className='punctuation'>{" "} </span>
                                        <span className="code-colors">animate</span>
                                        <span className='punctuation'>  () {"{"} {"}"};</span>
                                    </p>

                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='document container'>
                <h3>CODE</h3>
                <p>Web-based code editors have revolutionized how front-end designers and developers create, test, and share their work. Platforms like CodePen are more than just coding environments — they are social, collaborative spaces that blend creativity with functionality. With just a browser, developers can build fully functional websites, test out CSS animations, JavaScript interactions, and HTML structures in real-time, without needing to set up local environments or install complex tools.

                    One of the greatest strengths of these platforms is their live preview system, allowing users to instantly see the result of their code — making the learning and debugging process significantly faster and more visual. Whether you're experimenting with new CSS techniques or trying to reproduce a tricky JavaScript bug, the immediate feedback loop enhances understanding and boosts productivity.

                    Additionally, the ability to "fork" (duplicate) other people's code and experiment with it fosters a vibrant learning ecosystem. You can explore thousands of public Pens, discover creative user interfaces, animations, and effects, and learn from how others solve design problems. It’s not just a tool — it’s a community where beginners and experts alike can share knowledge, showcase portfolios, and find inspiration from each other.

                    In short, web coding platforms are not only powerful environments for testing and development — they are bridges between people, ideas, and innovation.</p>
            </div>
            <div className='document container'>
                <h3>Marketing Style</h3>
                <p>Imagine a place where your code comes to life instantly — where creativity meets productivity, and innovation is just one line of code away. That’s exactly what web-based coding platforms like CodePen offer. Whether you're a curious beginner or a seasoned developer, these platforms empower you to build, test, and share your front-end creations in seconds. No setup. No installation. Just open your browser, and let your ideas flow.

                    With real-time previews, live collaboration, and thousands of inspiring projects to explore, it’s more than a code editor — it’s your creative playground. You can fork, remix, and reinvent ideas shared by developers around the world, while showcasing your own work with pride. Start building. Start connecting. Start creating something amazing.
                </p>
            </div>
            <div className='document container'>
                <h3>Academic Style</h3>
                <p>Web-based development environments have emerged as a pivotal resource in modern front-end engineering education and practice. Platforms such as CodePen provide a dynamic, browser-based interface where users can implement, test, and iterate on HTML, CSS, and JavaScript code in real-time. These tools eliminate the overhead associated with local development environments, thus reducing the barrier to entry for beginners and increasing experimentation for advanced users.

                    The pedagogical advantages are clear: immediate feedback accelerates the learning process, and the ability to explore and modify community-shared code fosters a collaborative and constructivist learning model. Moreover, such platforms support professional prototyping, portfolio building, and the dissemination of front-end development knowledge at scale. They are not merely tools — they are engines for innovation and inclusive learning in the digital age.</p>
            </div>
            <div className='document container'>
                <h3>Casual Style</h3>
                <p>
                    If you’ve ever wanted to try coding without installing a bunch of stuff, web coding platforms like CodePen are made for you. Just open a browser, and boom — you’re writing HTML, CSS, and JavaScript in no time. You can see your changes live as you type, which makes it super easy to learn, experiment, and fix bugs right away.

                    And it’s not just for beginners. Even pros use it to prototype ideas, show off cool effects, or test out new layouts. Plus, you can explore tons of public projects, remix other people’s work, and build your own code collection. It’s like a playground for coders, where you can learn, share, and have fun — all at the same time.
                </p>
            </div>
        </>
    );
}

export default Home;