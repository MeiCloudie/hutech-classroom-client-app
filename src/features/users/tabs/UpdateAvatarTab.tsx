import React, { useState, ChangeEvent } from "react"
import { Button, Container, Grid, Typography } from "@mui/material"

const UpdateAvatarTab: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]

    if (selectedFile) {
      setFile(selectedFile)
      // You can call a function here to handle the file update
      handleFileUpdate(selectedFile)
    }
  }

  const handleFileUpdate = async (selectedFile: File) => {
    // You can perform actions here, such as updating state or making API calls

    // For example, simulate a delay to mimic an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log the selected file
    console.log("Selected File:", selectedFile)
  }

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="avatar-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="avatar-upload">
            <Button variant="contained" component="span">
              CHỌN TỆP ẢNH
            </Button>
          </label>
        </Grid>
        {file && (
          <Grid item xs={12}>
            <div>
              <Typography variant="subtitle1">
                Tệp đã chọn: {file.name}
              </Typography>
              <img
                src={URL.createObjectURL(file)}
                alt="Selected File"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginTop: "8px",
                }}
              />
            </div>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default UpdateAvatarTab
