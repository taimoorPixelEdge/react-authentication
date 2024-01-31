import React, { useEffect } from 'react';

const Home = (props: { name: string }) => {
    useEffect(() => {
        // Check if the refresh flag is set
        const refreshFlag = localStorage.getItem('refreshFlag');
    
        if (refreshFlag === 'true') {
          // Refresh the page
          window.location.reload();
    
          // Clear the refresh flag in local storage
          localStorage.removeItem('refreshFlag');
        }
      }, []);
    
    return (
        <div className="text-white">
            {props.name ? 'Welcome to the application you are logged in as ' + props.name : 'Welcome to the application'}
        </div>
    );
};

export default Home;
