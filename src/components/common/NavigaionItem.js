import React, {useCallback} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from "react-redux";
import { filterEmployees } from "../../modules/app/action";
import {selectAppState} from "../../modules/app/selectors";

export function NavigationItem({ id, jobId, title}) {
    const dispatch = useDispatch()
    const appState = useSelector(selectAppState)

    const action = useCallback(() => {
        dispatch(filterEmployees(jobId))
    }, [jobId, dispatch])



    return (
        <ListItem button onClick={action} selected={jobId === appState.selectedJob} >
            <ListItemText primary={title} />
        </ListItem>
    );
}