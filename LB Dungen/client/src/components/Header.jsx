//header will import the navigation component into it for the nav button functionality, navigation will have a navbar component for that functionality
import Navigation from './Navigation.jsx';
  
export default function Header(){
    return(
        <div>
            <h1>Language Dungeon</h1>
            <Navigation/> 
        </div>
    )
};
