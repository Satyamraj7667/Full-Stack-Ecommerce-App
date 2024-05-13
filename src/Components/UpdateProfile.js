import { Female, Male } from "@mui/icons-material";
import { Button, MenuItem, Select, TextField } from "@mui/material";
const UpdateProfile = (props) => {

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
    const DOB = formatDate(props.DateofBirth);
    const Email = props.Email;
    const Phone = props.Phone;


    return (
        <>
            <div className="container" style={{ display: "flex", flexDirection: "column" }}>
                <div className="title" style={{ padding: "20px" }}>
                    <h2>Update your Info</h2>
                </div>
                <div className="Name" style={{ marginInlineStart: "20px", paddingTop: "10px", display: "flex", justifyContent: "start" }}>
                    <TextField required id="firstname" label="First name" variant="standard" defaultValue={FirstName} style={{ paddingRight: "20px" }} /> <span>
                        <TextField required id="lastname" label="Last name" variant="standard" defaultValue={LastName} />
                    </span>
                </div>
                <div className="Gender" style={{ marginInlineStart: "20px", paddingTop: "20px" }}>
                    <Select
                        variant="standard"
                        id="gender"
                        disabled
                        defaultValue={Gender}
                        label="Gender"
                    >
                        <MenuItem value="Male"><Male /> Male</MenuItem>
                        <MenuItem value="Female"><Female /> Female</MenuItem>

                    </Select>
                </div>
                <div className="Phone" style={{ marginInlineStart: "20px", paddingTop: "20px" }}>
                    <TextField required type="tel" id="mobile" label="Mobile" variant="standard" defaultValue={Phone} />
                </div>
                <div className="Email" style={{ marginInlineStart: "20px", paddingTop: "20px" }}>
                    <TextField required type="email" id="email" label="Email" variant="standard" defaultValue={Email} />
                </div>
                <div className="DOB" style={{ marginInlineStart: "20px", paddingTop: "30px" }}>
                    Date of Birth : <input type="date" id="DOB" label="Date of Birth" variant="standard" defaultValue={DOB} disabled style={{ width: "120px", borderTop: "0px", borderLeft: "0px", borderRight: "0px" }} />
                </div>
                <div className="submit" style={{ marginInlineStart: "20px", paddingTop: "30px", paddingBottom: "20px" }}>
                    <Button type="submit" variant="contained">Update</Button>
                </div>
            </div>
        </>
    );

}
export default UpdateProfile;