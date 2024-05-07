// CardButton.js
import React from 'react';
import './CardButton.css';
const CardButton = ({ title, value, onClick }) => {
    return (
        <div className="card-button" onClick={onClick}>
            <div className="value">{value}</div>
            <div className="title">{title}</div>
        </div>
    );
};

export default CardButton;



// // CardButton.js
// import React from 'react';

// const CardButton = ({ title, value ,onClick }) => {
//     return (<>
    
//         <div className="card-button" onClick={onClick}>
//             {title}
//         </div>
//         <div className="value">{value}</div>
//         </>
//     );
// };

// export default CardButton;
