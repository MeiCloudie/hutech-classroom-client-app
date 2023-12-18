import { Box, Button, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import ScoreTable from "./ScoreTable";
// import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import InputIcon from "@mui/icons-material/Input";
import OutputIcon from "@mui/icons-material/Output";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import { PaginationParams } from "../../../app/common/models/paginationPrams";

import { toast } from "react-toastify"
import { toastBasic } from "../../../app/common/configs"
// import ScoreTypeForm from "./form/ScoreTypeForm"
// import Modal from "../../common/UI/Modal"
// import InfoIcon from "@mui/icons-material/Info"
// import { Link, useParams } from "react-router-dom"

const ClassroomTranscript = () => {
  const { classroomId } = useParams<{
    classroomId: string;
  }>();
  const { classroomStore, userStore } = useStore();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      if (classroomId) {
        const isSuccess =
          await classroomStore.importScoresWithMultipleScoreType(
            classroomId,
            selectedFile
          );
        if (isSuccess) {
          toast.success(
            "Bạn đã cập nhật thành công, hãy đợi một lát để bảng điểm được thay đổi nhé!",
            toastBasic
          )
          await classroomStore.loadClassroomClassroomScores(
            new PaginationParams(1, 100, "")
          );
        }
      }
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        p: 2,
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
            textAlign: "start",
          }}
        >
          BẢNG ĐIỂM SINH VIÊN
        </Typography>

        <Box>
          {/* <Modal
            key={"add-score-type"}
            buttonText="Thêm cột điểm"
            title="THÊM CỘT ĐIỂM MỚI"
            startIcon={<LibraryAddIcon />}
            component={(handleClose) => (
              <ScoreTypeForm handleClose={handleClose} />
            )}
          /> */}
          {/* <Button
            sx={{ ml: 1 }}
            variant="contained"
            startIcon={<InfoIcon />}
            component={Link}
            to={`/cr/${classroomId}/tr/scoretypes`}
          >
            CHI TIẾT
          </Button> */}

          {userStore.isLecturer && <Box>
            <input
              accept=".xls,.xlsx"
              style={{ display: "none" }}
              id="transcript-excel-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="transcript-excel-upload">
              <Button
                sx={{ ml: 1 }}
                variant="contained"
                component="span"
                startIcon={<InputIcon />}
              >
                NHẬP TỆP
              </Button>
            </label>
            <Button
              sx={{ ml: 1 }}
              variant="contained"
              startIcon={<OutputIcon />}
            >
              XUẤT TỆP
            </Button>
          </Box>}
        </Box>
      </Box>

      <ScoreTable />
    </Box>
  );
};

export default observer(ClassroomTranscript);
