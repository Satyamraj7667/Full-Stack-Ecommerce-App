import React from 'react'

function ProfileDetails(props) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Extract date components
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are 0-indexed
        const year = date.getFullYear();
        // Return formatted date string
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    };

    const FirstName = props.FirstName;
    const LastName = props.LastName;
    const Gender = props.Gender;
    const DateofBirth = formatDate(props.DateofBirth);
    const Email = props.Email;
    const Phone = props.Phone;

    return (
        <>
            <div className="container p-3" style={{ display: "flex", flexDirection: "column", fontFamily: '"Roboto",sans-serif',justifyContent:"space-around" }}>

                <div className="element" style={{ display: "flex",justifyContent:"space-evenly" }}>
                    <div>
                       Name 
                    </div>
                    <div>:</div>
                    <div>
                        {FirstName} {LastName}
                    </div>
                </div>

                <div className="element" style={{ display: "flex",justifyContent:"space-evenly" }}>
                    <div>
                       Gender  
                    </div>
                    <div>:</div>
                    <div>
                        {Gender}
                    </div>
                </div>

                <div className="element" style={{ display: "flex",justifyContent:"space-evenly" }}>
                    <div>
                       Date of Birth 
                    </div>
                    <div>:</div>
                    <div>
                        {DateofBirth} 
                    </div>
                </div>

                <div className="element" style={{ display: "flex" ,justifyContent:"space-evenly"}}>
                    <div>
                       Email 
                    </div>
                    <div>:</div>
                    <div>
                        {Email}
                    </div>
                </div>

                <div className="element" style={{ display: "flex",justifyContent:"space-evenly" }}>
                    <div>
                       Mobile 
                    </div>
                    <div>:</div>
                    <div>
                        {Phone}
                    </div>
                </div>

            </div>

        </>
    )
}

export default ProfileDetails