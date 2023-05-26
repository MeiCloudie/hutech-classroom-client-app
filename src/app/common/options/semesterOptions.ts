import { MySelectionInputOption } from "../../../features/common/forms/MySelectionInput";
import { ClassroomSemester } from "../../layout/enums/ClassroomSemesters";

export const semesterOptions : MySelectionInputOption[] = [
    { label: "Học kỳ I", value: ClassroomSemester.I },
    { label: "Học kỳ II", value: ClassroomSemester.II },
    { label: "Học kỳ III", value: ClassroomSemester.III },
]