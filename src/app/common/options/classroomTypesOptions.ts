import { MySelectionInputOption } from "../../../features/common/forms/MySelectionInput";
import { ClassroomTypes } from "../../layout/enums/ClassroomTypes";

export const classroomTypesOptions : MySelectionInputOption[] = [
    { label: "Phòng Lý Thuyết", value: ClassroomTypes.TheoryRoom },
    { label: "Phòng Thực Hành", value: ClassroomTypes.PracticeRoom },
]