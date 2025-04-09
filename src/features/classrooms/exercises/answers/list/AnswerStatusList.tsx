import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStore } from '../../../../../app/stores/store';
import { PaginationParams } from '../../../../../app/common/models/paginationPrams';
import TypoLoading from '../../../../../app/layout/indicators/common/TypoLoading';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { viVN } from '@mui/x-data-grid/locales';

const columns: GridColDef[] = [
    { field: 'lastName', headerName: 'Họ', flex: 2 },
    { field: 'firstName', headerName: 'Tên', flex: 1 },
    { field: 'status', headerName: 'Trạng Thái', flex: 2 },
];

const AnswerStatusList = () => {
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const { exerciseStore } = useStore();
    const [rows, setRows] = useState<GridRowsProp>([]);

    useEffect(() => {
        if (exerciseId)
            exerciseStore.get(exerciseId).then(() => {
                exerciseStore
                    .loadExerciseUsers(new PaginationParams(1, 100, ''))
                    .then(() => {
                        if (exerciseStore.exerciseUsers)
                            setRows(
                                exerciseStore.exerciseUsers.map((m, i) => {
                                    return {
                                        id: i,
                                        firstName: m.firstName,
                                        lastName: m.lastName,
                                        status: m.isSubmitted
                                            ? `Đã nộp`
                                            : `Chưa nộp`,
                                    };
                                })
                            );
                    });
            });
    }, [exerciseId, exerciseStore]);

    if (exerciseStore.isDetailsLoading)
        return (
            <Box
                sx={{
                    bgcolor: '#f5f5f5',
                    p: 2,
                    border: '1px solid #e8e8e8',
                    borderRadius: '5px',
                    transition:
                        'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                        transform: 'translateY(-4px)',
                    },
                    mb: 2,
                    mt: 2,
                }}
            >
                <TypoLoading />
            </Box>
        );

    return (
        <Box sx={{ mb: 2, mt: 2 }}>
            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    localeText={
                        viVN.components.MuiDataGrid.defaultProps.localeText
                    }
                    sx={{
                        boxShadow: 4,
                        border: 'solid 2px #f5f5f5',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                            fontWeight: 'bold',
                        },
                    }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </Box>
    );
};

export default observer(AnswerStatusList);
