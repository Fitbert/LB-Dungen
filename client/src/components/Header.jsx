//header will import the navigation component into it for the nav button functionality, navigation will have a navbar component for that functionality
import Navigation from './Navigation.jsx';
import LdSign from '../assets/LD_Sign_600px.png'
  
export default function Header(){
    return(
        <div>
            <img src={LdSign} alt={"Language Dungeon title on a wooden sign"} />
            <Navigation/> 
        </div>
    )
};
