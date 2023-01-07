import React from 'react'
import "./Profile.css";
import Photo from '../Images/amir.jpg';

function Profile() {
    return (
        <div className='bodyProfile'>
            <div className='cardProfile'>
                <div class="img">
                    <img className='imgProfile' src={Photo} />
                </div>
                <div class="infosProfile">

                    <div class="nameProfile">
                        <h2>Shantanu Jana</h2>
                        <h4>@foolishdeveloper</h4>
                    </div>

                    <p class="textProfile">
                        I'm a Front End Developer, follow me to be the first who see my new work.
                    </p>

                    <ul class="statsProfile">
                        <li> <h3>15K</h3> <h4>Views</h4> </li>
                        <li> <h3>82</h3> <h4>Projects</h4> </li>
                        <li> <h3>1.3M</h3> <h4>Followers</h4> </li>
                    </ul>

                    <div class="linksProfile">
                        <button class="follow">Follow</button>
                        <button class="view">View profile</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile
