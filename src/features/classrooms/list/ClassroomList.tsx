import React from "react";
import ClassroomCard from "./ClassroomCard";
import { Classroom } from "../../../app/models/Classroom";
import { ClassroomTypes } from "../../../app/layout/enums/ClassroomTypes";
import { ClassroomSemester } from "../../../app/layout/enums/ClassroomSemesters";
import { Subject } from "../../../app/models/Subject";
import { Major } from "../../../app/models/Major";
import { Faculty } from "../../../app/models/Faculty";
import Member from "../../../app/common/models/Member";

// const types = ["Phòng Lý Thuyết", "Phòng Thực Hành"];
// const semesters = ["1", "2", "3"];

const major: Major = {
  id: "m1",
  code: "7480201",
  title: "Công Nghệ Thông Tin",
  totalCredits: 152,
  nonCumulativeCredits: 5,
  createDate: new Date(2022, 11, 1),
};

const subject: Subject = {
  id: "s1",
  code: "CMP1024",
  title: "Lập trình ứng dụng với Java",
  totalCredits: 3,
  createDate: new Date(2022, 11, 1),
  major: major,
};

const faculty: Faculty = {
  id: "s1",
  name: "Khoa Công Nghệ Thông Tin",
  createDate: new Date(2022, 11, 1),
};

const member: Member = {
  userName: "nguyenvana",
  email: "nguyenvana@gmail.com",
  firstName: "Nguyen Van",
  lastName: "A",
};

const classrooms: Classroom[] = [
  {
    id: "c1",
    title: "CMP1024",
    room: "E1-09.05",
    type: ClassroomTypes.TheoryRoom,
    studyPeriod: "01/01/2023 - 06/06/2023",
    class: "20DTHD3",
    schoolYear: "2022",
    semester: ClassroomSemester.II,
    description: "Lập trình ứng dụng với Java",
    studyGroup: "20",
    practicalStudyGroup: "0",
    createDate: new Date(2022, 11, 1),

    subject: subject,
    faculty: faculty,
    lecturer: member,
  },
  {
    id: "c2",
    title: "CMP111",
    room: "E1-09.05",
    type: ClassroomTypes.TheoryRoom,
    studyPeriod: "01/01/2023 - 06/06/2023",
    class: "20DTHD3",
    schoolYear: "2022",
    semester: ClassroomSemester.II,
    description: "Lập trình Web",
    studyGroup: "20",
    practicalStudyGroup: "0",
    createDate: new Date(2022, 11, 1),

    subject: subject,
    faculty: faculty,
    lecturer: member,
  },
  {
    id: "c2",
    title: "CMP111",
    room: "E1-09.05",
    type: ClassroomTypes.TheoryRoom,
    studyPeriod: "01/01/2023 - 06/06/2023",
    class: "20DTHD3",
    schoolYear: "2022",
    semester: ClassroomSemester.II,
    description: "Lập trình Web",
    studyGroup: "20",
    practicalStudyGroup: "0",
    createDate: new Date(2022, 11, 1),

    subject: subject,
    faculty: faculty,
    lecturer: member,
  },
];

const ClassroomList = () => {
  return (
    <React.Fragment>
      {classrooms.map((c, index) => (
        <ClassroomCard key={index} classroom={c} />
      ))}
    </React.Fragment>
  );
};

export default ClassroomList;
