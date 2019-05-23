import React, { Component } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import M from 'materialize-css'

export default class AboutUs extends Component {
    componentDidMount() {
        var modal = document.querySelectorAll('.modal');
        M.Modal.init(modal)
    }

    render() {
        return (
            <>
                <Register {...this.props} />
                <Login {...this.props} />
                <div className="row" >
                    <div className="col s12 m12">
                        <img src={require("../assets/teamphoto.png")} alt="teamphoto" style={{ height: '300px' }} />
                    </div>
                    <h2 className="header" style={{ justifyContent: 'left' }}>Team behind Motion Slayer</h2>
                    <div >
                        <div className="col s3 m3" style={{ fontFamily: 'Arial' }}>
                            <div className="card yellow darken-1">
                                <div className="card-image">
                                    <img alt='memberphoto' src={require("../assets/team/azhar.png")} style={{ height: '260px' }} />
                                    <span className="card-title" style={{ backgroundColor: '#B0B0B0', opacity: '0.9', height: '60px', color: 'black', borderRadius: '0 25px 0 0' }}>Azhar Nazli</span>
                                </div>
                                <div className="card-content" style={{ color: 'black', fontSize: '16px' }}>
                                    <p>Industrial Engineering graduate with high interest in modern technology and programming.</p>
                                </div>
                                <div className="card-action">
                                    <a href="https://www.linkedin.com/in/azhar-nazli-667aab15b/" target="_blank" rel="noopener noreferrer" style={{ color: '#003399', fontSize: '24px' }}><span role='img' aria-label="logo"><img alt="linkedinlogo" src={require("../assets/linkedinlogo.png")} style={{ height: '30px' }}></img></span></a>
                                    <a href="https://github.com/azharnazli" target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontSize: '24px' }}><span role='img' aria-label="logo"><img alt="githublogo" src={require("../assets/githublogo.png")} style={{ height: '30px' }}></img></span></a>
                                </div>
                            </div>
                        </div>
                        <div className="col s3 m3" style={{ fontFamily: 'Arial' }}>
                            <div className="card yellow darken-1">
                                <div className="card-image">
                                    <img alt='memberphoto' src={require("../assets/team/reyhan.png")} style={{ height: '260px' }} />
                                    <span className="card-title" style={{ backgroundColor: '#B0B0B0', opacity: '0.9', height: '60px', color: 'black', borderRadius: '0 25px 0 0' }}>Reyhan Huditama</span>
                                </div>
                                <div className="card-content" style={{ color: 'black', fontSize: '16px' }}>
                                    <p>Food Science & Technology graduate with high interest in modern technology and programming.</p>
                                </div>
                                <div className="card-action">
                                    <a href="https://www.linkedin.com/in/reyhan-huditama/" target="_blank" rel="noopener noreferrer" style={{ color: '#003399', fontSize: '24px' }}><span role='img' aria-label="logo"><img alt="linkedinlogo" src={require("../assets/linkedinlogo.png")} style={{ height: '30px' }}></img></span> </a>
                                    <a href="https://github.com/huditama" target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontSize: '24px' }}><span role='img' aria-label="logo"><img alt="githublogo" src={require("../assets/githublogo.png")} style={{ height: '30px' }}></img></span> </a>
                                </div>
                            </div>
                        </div>
                        <div className="col s3 m3" style={{ fontFamily: 'Arial' }}>
                            <div className="card yellow darken-1">
                                <div className="card-image">
                                    <img alt='memberphoto' src={require("../assets/team/william.png")} style={{ height: '260px' }} />
                                    <span className="card-title" style={{ backgroundColor: '#B0B0B0', opacity: '0.9', height: '60px', color: 'black', borderRadius: '0 25px 0 0' }}>William Suryawan</span>
                                </div>
                                <div className="card-content" style={{ color: 'black', fontSize: '16px' }}>
                                    <p >Former Founder of a TOP100 Southeast Asia Startup with technical knowledge in programming.</p>
                                </div>
                                <div className="card-action">
                                    <a href="https://www.linkedin.com/in/williamsuryawan/" target="_blank" rel="noopener noreferrer" style={{ color: '#003399', fontSize: '24px' }}><span role='img' aria-label="logo"><img alt="linkedinlogo" src={require("../assets/linkedinlogo.png")} style={{ height: '30px' }}></img></span> </a>
                                    <a href="https://github.com/williamsuryawan" target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontSize: '24px' }}><span role='img' aria-label="logo"><img alt="githublogo" src={require("../assets/githublogo.png")} style={{ height: '30px' }}></img></span> </a>
                                </div>
                            </div>
                        </div>
                        <div className="col s3 m3" style={{ fontFamily: 'Arial' }}>
                            <div className="card yellow darken-1">
                                <div className="card-image">
                                    <img alt='memberphoto' src={require("../assets/team/willy.png")} style={{ height: '260px' }} />
                                    <span className="card-title" style={{ backgroundColor: '#B0B0B0', opacity: '0.9', height: '60px', color: 'black', borderRadius: '0 25px 0 0' }}>Willy Prayogo</span>
                                </div>
                                <div className="card-content" style={{ color: 'black', fontSize: '16px' }}>
                                    <p >Computer Engineering Major, specialized in Robotics and Industrial Automation </p>
                                </div>
                                <div className="card-action">
                                    <a href="https://www.linkedin.com/in/willyprayogo26/" target="_blank" rel="noopener noreferrer" style={{ color: '#003399', fontSize: '24px' }}><span role='img' aria-label="logo"><img alt="linkedinlogo" src={require("../assets/linkedinlogo.png")} style={{ height: '30px' }}></img></span> </a>
                                    <a href="https://github.com/willyprayogo26" target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontSize: '24px' }}><span role='img' aria-label="logo"><img alt="githublogo" src={require("../assets/githublogo.png")} style={{ height: '30px' }}></img></span> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col s12 m12" >
                        <h2 className="header" style={{ justifyContent: 'left' }}>Technology Behind Motion Slayer</h2>
                        <h4 className="header" style={{ justifyContent: 'left' }}> Machine Learning </h4>
                        <img alt='techlogo' src={require("../assets/logo/tensorflow-logo.png")} style={{ height: '50px' }} />
                    </div>
                    <div className="col s4 m4" style={{ color: 'orange' }}>
                        <h4 className="header" style={{ justifyContent: 'left' }}> MobileNet</h4>
                    </div>
                    <div className="col s4 m4" style={{ color: 'orange' }}>
                        <h4 className="header" style={{ justifyContent: 'left' }}> K-Nearest Neighbors</h4>
                    </div>
                    <div className="col s4 m4" style={{ color: 'orange' }}>
                        <h4 className="header" style={{ justifyContent: 'left' }}> Speech Command</h4>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col s12 m12" >
                        <h4 className="header" style={{ justifyContent: 'left' }}>Back End </h4>
                        <div className="col s3 m3" >
                            <img alt='techlogo' src={require("../assets/logo/mongoose-logo.png")} style={{ height: '90px' }} />
                        </div>
                        <div className="col s4 m4" >
                            <img alt='techlogo' src={require("../assets/logo/mongoDB-logo.png")} style={{ height: '60px' }} />
                        </div>
                        <div className="col s2 m2" >
                            <img alt='techlogo' src={require("../assets/logo/mocha-logo.svg")} style={{ height: '100px' }} />
                        </div>
                        <div className="col s2 m2" >
                            <img alt='techlogo' src={require("../assets/logo/chai-logo.png")} style={{ height: '100px' }} />
                        </div>
                        <div className="col s1 m1" >
                            <img alt='techlogo' src={require("../assets/logo/istambul-logo.png")} style={{ height: '95px' }} />
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col s12 m12" >
                        <h4 className="header" style={{ justifyContent: 'left', marginTop: '20px' }}>Front End </h4>
                        <div className="col s4 m4" >
                            <img alt='techlogo' src={require("../assets/logo/React-logo.png")} style={{ height: '90px' }} />
                        </div>
                        <div className="col s4 m4" >
                            <img alt='techlogo' src={require("../assets/logo/redux-logo.png")} style={{ height: '90px' }} />
                        </div>
                        <div className="col s3 m3" >
                            <img alt='techlogo' src={require("../assets/logo/p5js-logo.svg")} style={{ height: '60px' }} />
                        </div>
                        <div className="col s1 m1" >
                            <img alt='techlogo' src={require("../assets/logo/materialize-logo.png")} style={{ height: '90px' }} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
