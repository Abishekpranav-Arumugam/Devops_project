import { LocalizationProvider, MobileDateTimePicker } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import swal from "sweetalert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useAuth from "../../../Hooks/useAuth";

const Appointment = () => {
  const { user } = useAuth();
  const [value, setValue] = React.useState(new Date());
  const [docName, setDocName] = React.useState("");
  const [problemType, setProblemType] = React.useState("");

  const handleDoctorChange = (event) => {
    setDocName(event.target.value); // Store the doctor's name
  };

  const handleProblemTypeChange = (event) => {
    setProblemType(event.target.value); // Store the problem type entered by the user
  };

  // Function to save appointment to backend
  const saveAppointment = () => {
    const appointmentData = {
      userName: user.displayName,
      userEmail: user.email,
      doctorName: docName, // Doctor's name
      appointmentDate: value, // date selected from the picker
      problemType: problemType // Problem type from the user
    };

    fetch('http://localhost:5000/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        swal("Your Appointment is Done! You will receive a mail ASAP.", {
          button: false,
          icon: "success",
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Box
      id="appointment"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <Container style={{ justifyContent: "center" }}>
          <Typography
            variant="h5"
            sx={{
              mt: 5,
              mb: 5,
            }}
          >
            Select your time and data for Appointment
          </Typography>
        </Container>
        
        {/* Doctor Name Selection */}
        <FormControl sx={{ mb: 5, minWidth: "50%" }}>
          <InputLabel id="doctor-select-label">Select Doctor Name</InputLabel>
          <Select
            labelId="doctor-select-label"
            id="doctor-select"
            value={docName}
            onChange={handleDoctorChange}
            autoWidth
            label="Select Doctor Name"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Dr. Neha A Agrawal">Dr. Neha A Agrawal</MenuItem>
            <MenuItem value="Dr. Vrushali Naik">Dr. Vrushali Naik</MenuItem>
            <MenuItem value="Dr. Tejaswini Manogna">Dr. Tejaswini Manogna</MenuItem>
            <MenuItem value="Dr. Aditya Gupta">Dr. Aditya Gupta</MenuItem>
            <MenuItem value="Dr. Vivek k Bansode">Dr. Vivek K Bansode</MenuItem>
            <MenuItem value="Dr. Pratima J Singh">Dr. Pratima J Singh</MenuItem>
            <MenuItem value="Dr. Amit Lanke">Dr. Amit Lanke</MenuItem>
            <MenuItem value="Dr. Johnny Pandit">Dr. Johnny Pandit</MenuItem>
            <MenuItem value="Dr. Sandip Nehe">Dr. Sandip Nehe</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ mb: 2 }}
          value={user.displayName}
          fullWidth
          label="Your Name"
          id="user-name"
        />
        <TextField
          sx={{ mb: 2 }}
          value={user.email}
          fullWidth
          label="Your Mail"
          id="user-email"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <MobileDateTimePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              label="Appointment Date"
              onError={console.log}
              minDate={new Date("2024-01-01T00:00")}
              inputFormat="yyyy/MM/dd hh:mm a"
              mask="___/__/__ __:__ _M"
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>

        <TextField
          sx={{ mt: 2, mb: 2 }}
          fullWidth
          label="Problem Type"
          id="problem-type"
          onChange={handleProblemTypeChange} // Track changes for problem type
        />

        <Button
          sx={{ p: 1, mt: 2, mb: 5 }}
          onClick={saveAppointment}
          fullWidth
          variant="contained"
        >
          <AddCircleIcon /> Confirm
        </Button>
      </Container>
    </Box>
  );
};

export default Appointment;
