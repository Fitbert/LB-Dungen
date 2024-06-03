//logo and login/sign up modal buttons here for logged out users

import { useHistory } from 'react-router-dom';

export default function SplashPage() {
    const history = useHistory();

    return (
    <body className="--background bungee-regular">
    <header >
        <header className="text-center">
            <h1>Welcome to The Language Dungeon</h1>
        </header>
    </header>
    
    <main>
        <img src="./Assets/LD_Logo_1000px.png" alt="logo"  />
    <h2>About The Language Dungeon</h2>
    <p>The Language Dungeon is your ultimate destination for language learning and exploration. Embark on an exciting journey through the realms of words and unlock the secrets of effective communication.</p>
    

    
    <h2>Get Started</h2>
    <p>Begin your adventure!</p>
    <button>Sign Up Now</button>
    </main>
    
    <footer>
        &copy; 2023 The Language Dungeon. All rights reserved.
    </footer>

    <script src="cursor.js"></script>
</body>
    );
    
   
}
