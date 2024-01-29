import React from 'react';

const Home = (props: { name: string }) => {
    return (
        <div>
            {props.name ? 'Welcome to the application you are logged in ' + props.name : 'Welcome to the application you are not logged in'}
        </div>
    );
};

export default Home;
