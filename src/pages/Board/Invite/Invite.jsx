import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import Member from './Member';
import Modal from '~/components/Modal';
import { memberService } from '~/services/memberService';

const TextFieldComp = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: (theme) =>
                theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
        },
        '&:hover fieldset': {
            borderColor: (theme) =>
                theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: (theme) =>
                theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
        },
    },
});

function Invite({ members = [], open, onClose }) {
    const { t } = useTranslation('board');
    const user = useSelector((state) => state.user.userInfo);
    const board = useSelector((state) => state.board.activeBoard);
    const [tab, setTab] = useState('1');
    const [value] = useState(window.location.origin + '/invite/b/' + board?.slug);
    const [copied, setCopied] = useState(false);
    const [memberList, setMemberList] = useState(members);
    const [currentMember, setCurrentMember] = useState(null);
    const [, copyToClipboard] = useCopyToClipboard(value);

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
        memberService.updateMember(memberId, { active: true });

        setMemberList((prevMembers) =>
            prevMembers.map((member) => (member.id === memberId ? { ...member, active: true } : member)),
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
        <Modal size="small" title={t('boardBar.share')} open={open} onClose={onClose}>
            <Box>
                <Box sx={{ display: 'flex', gap: 1, pr: 4, mb: 2 }}>
                    <TextFieldComp
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
                        aria-readonly
                    />
                    <Button
                        variant="contained"
                        sx={{ whiteSpace: 'nowrap' }}
                        onClick={() => {
                            setCopied(true);
                            copyToClipboard(value);
                        }}
                    >
                        {copied ? t('boardBar.copied') : t('boardBar.copy')}
                    </Button>
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
                            {memberList?.filter((member) => member.active)?.length > 0 &&
                                memberList
                                    .filter((member) => member.active)
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
                                                    <MenuItem value={'member'}>{t('boardBar.member')}</MenuItem>
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
                            {memberList?.filter((member) => !member.active)?.length > 0 &&
                                memberList
                                    .filter((member) => !member.active)
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
                            {!memberList?.filter((member) => !member.active)?.length > 0 && (
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
