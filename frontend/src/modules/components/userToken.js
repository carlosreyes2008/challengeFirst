import React from 'react';
import { Box,
        Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    main: {
        width:'100%',
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    content:{
        paddingLeft: 4
    },
});

export default function UserToken(props){
    let styles = useStyles();
    return(
        <>
            <Box
                className={styles.main}
            >
                <Box
                    className={styles.container}
                >
                    <Typography
                        className={styles.content}
                    >
                        {props.user.name}
                    </Typography>
                </Box>
                <Box
                    className={styles.container}
                    style={{
                        borderRight: '1px solid #CCCCCC', 
                        borderLeft: '1px solid #CCCCCC', 
                    }}
                >
                    <Typography
                        className={styles.content}
                    >
                        {props.user.email}
                    </Typography>
                </Box>
                <Box
                    className={styles.container}
                    style={{
                        flex: 0.4,
                    }}
                >
                    <Typography
                        className={styles.content}
                    >
                        {props.user.role}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}