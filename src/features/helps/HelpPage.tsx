import {
    Typography,
    Container,
    CardMedia,
    InputAdornment,
    TextField,
    Grid,
} from '@mui/material';
import HelpCard from './HelpCard';

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import LinkIcon from '@mui/icons-material/Link';

import { styled } from '@mui/material';

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.only('xs')]: {
        '& .MuiGrid-item': {
            width: '100%',
        },
    },
    [theme.breakpoints.only('sm')]: {
        '& .MuiGrid-item': {
            width: '50%',
        },
    },
    [theme.breakpoints.up('md')]: {
        '& .MuiGrid-item': {
            width: '33.33%',
        },
    },
}));

const helpCards = [
    {
        title: 'TRANG CHỦ',
        icon: <HomeIcon sx={{ fontSize: 70, color: '#101331' }} />,
        link: '/home',
    },
    {
        title: 'HỒ SƠ',
        icon: <PersonIcon sx={{ fontSize: 70, color: '#101331' }} />,
        link: '/profiles',
    },
    {
        title: 'LỚP HỌC',
        icon: <SchoolIcon sx={{ fontSize: 70, color: '#101331' }} />,
        link: '/classrooms',
    },
    {
        title: 'CÀI ĐẶT',
        icon: <SettingsIcon sx={{ fontSize: 70, color: '#101331' }} />,
        link: '/settings',
    },
    {
        title: 'LIÊN KẾT',
        icon: <LinkIcon sx={{ fontSize: 70, color: '#101331' }} />,
        link: '/links',
    },
];

const HelpPage = () => {
    return (
        <Container
            maxWidth='lg'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <CardMedia
                component='img'
                image='logoHutech.png'
                alt='Ảnh không tồn tại'
                sx={{
                    width: '120px',
                    height: 'auto',
                    margin: '20px',
                }}
            />
            <Typography
                variant='h4'
                component='div'
                sx={{ mb: 2, fontWeight: 600 }}
            >
                Chúng tôi có thể giúp gì cho bạn?
            </Typography>
            <TextField
                id='search-outlined-basic'
                variant='outlined'
                placeholder='Mô tả sự cố của bạn'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                fullWidth
                sx={{ marginBottom: '20px' }}
            />

            <ResponsiveGrid container spacing={2}>
                {helpCards.map((hc, index) => (
                    <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                        <HelpCard
                            key={index}
                            title={hc.title}
                            icon={hc.icon}
                            link={hc.link}
                        />
                    </Grid>
                ))}
            </ResponsiveGrid>
        </Container>
    );
};

export default HelpPage;
