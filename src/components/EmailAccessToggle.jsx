import { FormControlLabel, FormGroup, Switch, Tooltip, createTheme, makeStyles } from "@mui/material"
import { getDocumentData, updateDocument } from "../firebase"
import { useContext, useEffect, useState } from "react"
import { ReadContext } from "../Context"
import styled from "@emotion/styled"

export const EmailAccessToggle = () => {
    let userData = JSON.parse(localStorage.getItem('userData'))
    const { isEmailAccess } = ReadContext()
    const { setEmailAccess } = ReadContext()


    const [toggle, setToggle] = useState(isEmailAccess)

    useEffect(() => {
        setToggle(isEmailAccess)
    }, [isEmailAccess])

    const emailAcccessToggle = async (e) => {
        setEmailAccess(e.target.checked)
        setToggle(e.target.checked)
        let userData = JSON.parse(localStorage.getItem('userData'))
        let userId = localStorage.getItem('userIdd')
        await updateDocument('users', userId, { ...userData, isEmailAccess: e.target.checked })
        localStorage.setItem("userData", JSON.stringify({ ...userData, isEmailAccess: e.target.checked }))
        let res2 = await getDocumentData('users', userId)
    }

    const Android12Switch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
            borderRadius: 22 / 2,
            '&:before, &:after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
                color: 'blue'
            },
            '&:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                left: 12,
            },
            '&:after': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M19,13H5V11H19V13Z" /></svg>')`,
                right: 12,
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },
        "&.MuiSwitch-root .Mui-checked": {
            color: "blue",
        },
        "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
            backgroundColor: 'blue'
        }
    }));
    return (
        <div>
            {/* <Tooltip title="Email Notifications" placement="left-end">

                <Switch
                    sx={{
                        "&.MuiSwitch-root .MuiSwitch-switchBase": {
                            color: "grey",

                        },
                        "&.MuiSwitch-root .Mui-checked": {
                            color: "blue",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
                            backgroundColor: 'blue'
                        }

                    }}
                    checked={toggle} onChange={emailAcccessToggle} />
            </Tooltip>
            {toggle ? 'ON' : 'OFF'} */}
            {/* <Tooltip title={`Email Notifications (${toggle ? 'ON' : 'OFF'})`} placement="left-end">

                <FormGroup>
                    <FormControlLabel
                        control={<Android12Switch checked={toggle} onChange={emailAcccessToggle} />}
                        label={toggle ? 'ON' : 'OFF'}
                    />
                </FormGroup>
            </Tooltip> */}



        </div >

    )
}

