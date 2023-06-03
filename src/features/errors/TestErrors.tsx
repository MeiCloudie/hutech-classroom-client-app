import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ValidationError from "./ValidationError";

const TestErrors = () => {
  const baseUrl = process.env.REACT_APP_HUTECH_CLASSROOM_BASE_URL;
  const [errors, setErrors] = useState(null);

  function handleNotFound() {
    axios
      .get(baseUrl + "results/not-found")
      .catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios
      .get(baseUrl + "results/bad-request")
      .catch((err) => console.log(err.response));
  }

  function handleNoContent() {
    axios
      .get(baseUrl + "results/no-content")
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorized() {
    axios
      .get(baseUrl + "results/unauthorized")
      .catch((err) => console.log(err.response));
  }

  function handleConflict() {
    axios
      .get(baseUrl + "results/conflict")
      .catch((err) => console.log(err.response));
  }

  function handleForbid() {
    axios
      .get(baseUrl + "results/forbid")
      .catch((err) => console.log(err.response));
  }

  function handleInternalServerError() {
    axios
      .get(baseUrl + "results/internal-server-error")
      .catch((err) => console.log(err.response));
  }

  function handleValidationError() {
    axios.post(baseUrl + "classrooms", {}).catch((err) => setErrors(err));
  }

  return (
    <React.Fragment>
      <Typography variant="h2" component="h2" fontWeight="bold" gutterBottom>
        Test Error component
      </Typography>
      <Box mt={2} mb={2}>
        <ButtonGroup fullWidth variant="contained" size="large">
          <Button onClick={handleNotFound} color="primary">
            404 - Not Found
          </Button>
          <Button onClick={handleBadRequest} color="primary">
            400 - Bad Request
          </Button>
          <Button onClick={handleNoContent} color="primary">
            204 - No Content
          </Button>
          <Button onClick={handleUnauthorized} color="primary">
            401 - Unauthorized
          </Button>
          <Button onClick={handleConflict} color="primary">
            409 - Conflict
          </Button>
          <Button onClick={handleForbid} color="primary">
            403 - Forbid
          </Button>
          <Button onClick={handleInternalServerError} color="primary">
            500 - Internal Server Error
          </Button>
          <Button onClick={handleValidationError} color="primary">
            422 - Validation Error
          </Button>
        </ButtonGroup>
      </Box>
      {errors && <ValidationError errors={errors} />}
    </React.Fragment>
  );
};

export default TestErrors;
