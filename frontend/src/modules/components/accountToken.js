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

export default function AccountToken(props){
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
                        {props.account.name}
                    </Typography>
                </Box>
                <Box
                    className={styles.container}
                    style={{
                        borderLeft: '1px solid #CCCCCC', 
                    }}
                >
                    <Typography
                        className={styles.content}
                    >
                        {props.account.client}
                    </Typography>
                </Box>
                <Box
                    className={styles.container}
                    style={{
                        borderLeft: '1px solid #CCCCCC', 
                    }}
                >
                    <Typography
                        className={styles.content}
                    >
                        {props.account.manager}
                    </Typography>
                </Box>
                <Box
                    className={styles.container}
                    style={{
                        borderLeft: '1px solid #CCCCCC', 
                    }}
                >
                    <Typography
                        className={styles.content}
                    >
                        {props.account.status ? 'Active Account' : 'Inactive Account'}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}