import { Box, LinearProgress } from "@mui/material";

const Loading = () => {
    return <Box sx={{width: '100%', position: 'fixed'}}>
        <LinearProgress />
    </Box>
}

export default Loading;