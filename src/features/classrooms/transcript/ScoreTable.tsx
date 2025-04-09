import {
    DataGrid,
    GridColDef,
    GridRowsProp,
    GridToolbar,
} from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { PaginationParams } from '../../../app/common/models/paginationPrams';
import { observer } from 'mobx-react-lite';
import TypoLoading from '../../../app/layout/indicators/common/TypoLoading';
import { Divider } from '@mui/material';
import { viVN } from '@mui/x-data-grid/locales';

const ScoreTable = () => {
    const { classroomId } = useParams<{ classroomId: string }>();
    const { classroomStore } = useStore();
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [loading, setLoading] = useState(true);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'STT', width: 70 },
        { field: 'username', headerName: 'Mã SV', width: 120 },
        { field: 'lastName', headerName: 'Họ SV', width: 200 },
        { field: 'firstName', headerName: 'Tên SV', width: 100 },
        { field: 'class', headerName: 'Mã lớp', width: 120 },
        {
            field: '1',
            headerName: 'Điểm quá trình',
            width: 150,
            type: 'number',
            editable: true,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: '2',
            headerName: 'Điểm cuối kỳ',
            width: 100,
            type: 'number',
            editable: true,
            align: 'left',
            headerAlign: 'left',
        },
    ];

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            if (!classroomId) return;

            setLoading(true);
            try {
                await classroomStore.get(classroomId);
                const paginationParams = new PaginationParams(1, 100, '');
                await classroomStore.loadClassroomClassroomScores(
                    paginationParams
                );

                if (isMounted && classroomStore.classroomScores) {
                    const formattedRows = classroomStore.classroomScores.map(
                        (m, i) => {
                            return {
                                id: i + 1,
                                username: m.student?.userName ?? '',
                                lastName: m.student?.lastName ?? '',
                                firstName: m.student?.firstName ?? '',
                                class: m.classroom?.class ?? '',
                                ...m.scores.reduce(
                                    (
                                        dictionary: { [key: number]: number },
                                        element
                                    ) => {
                                        if (element.score !== -1) {
                                            dictionary[
                                                element.scoreType?.id ?? 0
                                            ] = element.score;
                                        }
                                        return dictionary;
                                    },
                                    {}
                                ),
                            };
                        }
                    );

                    setRows(formattedRows);
                }
            } catch (error) {
                console.error('Error loading classroom scores:', error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [classroomId, classroomStore]);

    if (classroomStore.isDetailsLoading || loading) return <TypoLoading />;

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                sx={{
                    boxShadow: 4,
                }}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                disableDensitySelector
                density='compact'
                pageSizeOptions={[5, 10]}
                slots={{
                    toolbar: (props) => (
                        <>
                            <GridToolbar {...props} />
                            <Divider />
                        </>
                    ),
                }}
                slotProps={{
                    toolbar: {
                        csvOptions: { disableToolbarButton: true },
                        printOptions: { disableToolbarButton: true },
                    },
                }}
            />
        </div>
    );
};

export default observer(ScoreTable);
