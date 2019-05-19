import React, { Component } from 'react'

export default class AboutUs extends Component {
  render() {
    return (
      <>
    
    <div className="row" >
        <div className="col s12 m12">
            <img src={require("../assets/togetherphoto.jpeg")} alt="teamphoto" style={{height: '300px'}}/>
        </div>
        <h2 className="header" style={{justifyContent: 'left'}}>Team behind Motion Slayer</h2>
        <div >
            <div class="col s3 m3" style={{fontFamily: 'Arial'}}>
                <div class="card yellow darken-1">
                    <div class="card-image">
                    <img alt='memberphoto' src={require("../assets/tutorial/up.png")} />
                    <span class="card-title">Azhar Nazli</span>
                    </div>
                    <div class="card-content" style={{color: 'black', fontSize: '16px'}}> 
                    <p>I am a very simple card. I am good at containing small bits of information.</p>
                    </div>
                    <div class="card-action">
                        <a href="https://www.linkedin.com/in/azhar-nazli-667aab15b/" target="_blank" rel="noopener noreferrer" style={{color: '#003399', fontSize: '24px'}}><span role='img' aria-label="logo"><img alt="linkedinlogo" src={require("../assets/linkedinlogo.png")} style={{ height: '30px' }}></img></span> LinkedIn</a>
                        <a href="https://github.com/azharnazli" target="_blank" rel="noopener noreferrer" style={{color: 'black', fontSize: '24px'}}><span role='img' aria-label="logo"><img alt="githublogo" src={require("../assets/githublogo.png")} style={{ height: '30px' }}></img></span> Github</a>
                    </div>
                </div>
            </div>
            <div class="col s3 m3" style={{fontFamily: 'Arial'}}>
                <div class="card yellow darken-1">
                    <div class="card-image">
                    <img alt='memberphoto' src={require("../assets/tutorial/up.png")} />
                    <span class="card-title">Reyhan Huditama</span>
                    </div>
                    <div class="card-content" style={{color: 'black', fontSize: '16px'}}> 
                    <p>I am a very simple card. I am good at containing small bits of information.</p>
                    </div>
                    <div class="card-action">
                        <a href="https://www.linkedin.com/in/reyhan-huditama/" target="_blank" rel="noopener noreferrer" style={{color: '#003399', fontSize: '24px'}}><span role='img' aria-label="logo"><img alt="linkedinlogo" src={require("../assets/linkedinlogo.png")} style={{ height: '30px' }}></img></span> LinkedIn</a>
                        <a href="https://github.com/huditama" target="_blank" rel="noopener noreferrer" style={{color: 'black', fontSize: '24px'}}><span role='img' aria-label="logo"><img alt="githublogo" src={require("../assets/githublogo.png")} style={{ height: '30px' }}></img></span> Github</a>
                    </div>
                </div>
            </div>
            <div class="col s3 m3" style={{fontFamily: 'Arial'}}>
                <div class="card yellow darken-1">
                    <div class="card-image">
                    <img alt='memberphoto' src={require("../assets/tutorial/up.png")} />
                    <span class="card-title">William Suryawan</span>
                    </div>
                    <div class="card-content" style={{color: 'black', fontSize: '16px'}}> 
                    <p>I am a very simple card. I am good at containing small bits of information.</p>
                    </div>
                    <div class="card-action">
                        <a href="https://www.linkedin.com/in/williamsuryawan/" target="_blank" rel="noopener noreferrer" style={{color: '#003399', fontSize: '24px'}}><span role='img' aria-label="logo"><img alt="linkedinlogo" src={require("../assets/linkedinlogo.png")} style={{ height: '30px' }}></img></span> LinkedIn</a>
                        <a href="https://github.com/williamsuryawan" target="_blank" rel="noopener noreferrer" style={{color: 'black', fontSize: '24px'}}><span role='img' aria-label="logo"><img alt="githublogo" src={require("../assets/githublogo.png")} style={{ height: '30px' }}></img></span> Github</a>
                    </div>
                </div>
            </div>
            <div class="col s3 m3" style={{fontFamily: 'Arial'}}>
                <div class="card yellow darken-1">
                    <div class="card-image">
                    <img alt='memberphoto' src={require("../assets/tutorial/up.png")} />
                    <span class="card-title">Willy Prayogo</span>
                    </div>
                    <div class="card-content" style={{color: 'black', fontSize: '16px'}}> 
                    <p>I am a very simple card. I am good at containing small bits of information.</p>
                    </div>
                    <div class="card-action">
                        <a href="https://www.linkedin.com/in/willyprayogo26/" target="_blank" rel="noopener noreferrer" style={{color: '#003399', fontSize: '24px'}}><span role='img' aria-label="logo"><img alt="linkedinlogo" src={require("../assets/linkedinlogo.png")} style={{ height: '30px' }}></img></span> LinkedIn</a>
                        <a href="https://github.com/willyprayogo26" target="_blank" rel="noopener noreferrer" style={{color: 'black', fontSize: '24px'}}><span role='img' aria-label="logo"><img alt="githublogo" src={require("../assets/githublogo.png")} style={{ height: '30px' }}></img></span> Github</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col s12 m12" >
            <h2 className="header" style={{justifyContent: 'left'}}>Technology Behind Motion Slayer</h2>
            <h4 className="header" style={{justifyContent: 'left'}}>Back End </h4>
            <div class="col s3 m3" >
                <img alt='techlogo' src={require("../assets/logo/mongoose-logo.png")} style={{height: '90px'}} />  
            </div>
            <div class="col s4 m4" >
                <img alt='techlogo' src={require("../assets/logo/mongoDB-logo.png")} style={{height: '60px'}} />  
            </div>
            <div class="col s2 m2" >
                <img alt='techlogo' src={require("../assets/logo/mocha-logo.svg")} style={{height: '100px'}} />  
            </div>
            <div class="col s2 m2" >
                <img alt='techlogo' src={require("../assets/logo/chai-logo.png")} style={{height: '100px'}} />  
            </div>
            <div class="col s1 m1" >
                <img alt='techlogo' src={require("../assets/logo/istambul-logo.png")} style={{height: '95px'}} />  
            </div>
        </div>
    </div>
    <div className="row" style={{marginTop: '20px'}}>
        <div className="col s12 m12" >
            <h4 className="header" style={{justifyContent: 'left', marginTop: '20px'}}>Front End </h4>
            <div class="col s3 m3" >
                <img alt='techlogo' src={require("../assets/logo/React-logo.png")} style={{height: '90px'}} />  
            </div>
            <div class="col s2 m2" >
                <img alt='techlogo' src={require("../assets/logo/redux-logo.png")} style={{height: '90px'}} />  
            </div>
            <div class="col s4 m4" >
                <img alt='techlogo' src={require("../assets/logo/tensorflow-logo.png")} style={{height: '50px'}} />  
            </div>
            <div class="col s2 m2" >
                <img alt='techlogo' src={require("../assets/logo/p5js-logo.svg")} style={{height: '60px'}} />  
            </div>
            <div class="col s1 m1" >
                <img alt='techlogo' src={require("../assets/logo/materialize-logo.png")} style={{height: '90px'}} />  
            </div>
        </div>
    </div>
  
    </>
    )
  }
}
