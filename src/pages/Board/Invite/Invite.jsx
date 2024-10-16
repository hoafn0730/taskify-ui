import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useEffect, useMemo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Select } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { memberService } from '~/services/memberService';
import Modal from '~/components/Modal';
import Member from './Member';

function Invite({ members = [], open, onClose }) {
    const { t } = useTranslation('board');
    const [tab, setTab] = useState('1');
    const [value] = useState(window.location.origin + '/invite/b/board-1');
    const [copied, setCopied] = useState(false);
    const [memberList, setMemberList] = useState(members);
    const [currentMember, setCurrentMember] = useState(null);
    const user = useSelector((state) => state.user.userInfo);

    const ownerCount = useMemo(() => memberList.filter((member) => member.role === 'owner').length, [memberList]);

    useEffect(() => {
        let handler;
        if (copied) {
            handler = setTimeout(() => setCopied(false), 1500);
        }

        return () => clearTimeout(handler);
    }, [copied]);

    useEffect(() => {
        const member = members.find((member) => {
            return +member?.user?.uid === user?.id;
        });

        setCurrentMember(member);
    }, [members, user?.id]);

    useEffect(() => {
        let handler;
        if (copied) {
            handler = setTimeout(() => setCopied(false), 1500);
        }

        return () => clearTimeout(handler);
    }, [copied]);

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    const handleAccept = async (memberId) => {
        memberService.updateMember(memberId, { role: 'user' });

        setMemberList((prevMembers) =>
            prevMembers.map((member) => (member.id === memberId ? { ...member, role: 'user' } : member)),
        );
    };

    const handleUpdateRole = (memberId, currentRole, newRole) => {
        if (ownerCount - 1 < 1 && currentRole === 'owner') {
            toast.warning('There must be at least one owner.');
        } else {
            memberService.updateMember(memberId, { role: newRole });

            setMemberList((prevMembers) =>
                prevMembers.map((member) => (member.id === memberId ? { ...member, role: newRole } : member)),
            );
        }
    };

    return (
        <Modal size="small" open={open} onClose={onClose}>
            <Box
                sx={{
                    pt: 2,
                }}
            >
                <Typography variant="h3" sx={{ fontSize: '20px', mb: 2 }}>
                    {t('boardBar.share')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, pr: 4, mb: 2 }}>
                    <TextField
                        data-no-dnd={true}
                        type="text"
                        variant="outlined"
                        size="small"
                        defaultValue={value}
                        fullWidth
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? theme.palette.common.white
                                            : theme.palette.primary.main,
                                },
                                '&:hover fieldset': {
                                    borderColor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? theme.palette.common.white
                                            : theme.palette.primary.main,
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? theme.palette.common.white
                                            : theme.palette.primary.main,
                                },
                            },
                        }}
                        aria-readonly
                    />
                    <CopyToClipboard onCopy={() => setCopied(true)} text={value}>
                        <Button variant="contained" sx={{ whiteSpace: 'nowrap' }}>
                            {copied ? t('boardBar.copied') : t('boardBar.copy')}
                        </Button>
                    </CopyToClipboard>
                </Box>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab label={t('boardBar.boardMembers')} value="1" sx={{ textTransform: 'none' }} />
                            <Tab label={t('boardBar.joinRequests')} value="2" sx={{ textTransform: 'none' }} />
                        </TabList>
                    </Box>

                    <TabPanel value="1" sx={{ p: 0 }}>
                        <List>
                            {memberList?.filter((member) => member.role)?.length > 0 &&
                                memberList
                                    .filter((member) => member.role)
                                    .map((member) => (
                                        <Member
                                            member={member}
                                            key={member.id}
                                            actions={
                                                <Select
                                                    readOnly={!['admin', 'owner'].includes(currentMember?.role)}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    sx={{
                                                        minWidth: '100px',
                                                        height: '40px',
                                                        color: '#42526E',

                                                        '& .MuiMenuItem-root.Mui-selected': {
                                                            color: 'primary.main',
                                                        },
                                                    }}
                                                    IconComponent={KeyboardArrowDownRoundedIcon}
                                                    value={member?.role}
                                                    onChange={(e) =>
                                                        handleUpdateRole(member.id, member?.role, e.target.value)
                                                    }
                                                >
                                                    <MenuItem value={'user'}>{t('boardBar.member')}</MenuItem>
                                                    <MenuItem value={'admin'}>{t('boardBar.admin')}</MenuItem>
                                                    <MenuItem
                                                        value={'owner'}
                                                        disabled={currentMember?.role !== 'owner'}
                                                    >
                                                        {t('boardBar.owner')}
                                                    </MenuItem>
                                                </Select>
                                            }
                                        />
                                    ))}
                        </List>
                    </TabPanel>

                    <TabPanel value="2" sx={{ p: 0 }}>
                        <List>
                            {memberList?.filter((member) => !member.role)?.length > 0 &&
                                memberList
                                    .filter((member) => !member.role)
                                    ?.map((member) => (
                                        <Member
                                            member={member}
                                            key={member.id}
                                            actions={
                                                <Button
                                                    variant="contained"
                                                    disabled={!['admin', 'owner'].includes(currentMember?.role)}
                                                    onClick={() => handleAccept(member.id)}
                                                >
                                                    Accept
                                                </Button>
                                            }
                                        />
                                    ))}
                            {!memberList?.filter((member) => !member.role)?.length > 0 && (
                                <Typography variant="span" sx={{ p: 2, fontSize: '14px' }}>
                                    {t('boardBar.noJoinRequests')}
                                </Typography>
                            )}
                        </List>
                    </TabPanel>
                </TabContext>
            </Box>
        </Modal>
    );
}

Invite.propTypes = { members: PropTypes.array, open: PropTypes.bool, onClose: PropTypes.func };

export default Invite;
