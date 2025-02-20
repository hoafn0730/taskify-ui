import { toast } from 'react-toastify';
import { useConfirm } from 'material-ui-confirm';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { boardService } from '~/services/boardService';
import { memberService } from '~/services/memberService';
import { delay } from 'lodash';

function Invite() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const confirm = useConfirm();
    const user = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        confirm({
            title: 'Confirm join board?',
            description: 'Are you sure you want to join to board?',
        })
            .then(async () => {
                if (user) {
                    const board = await boardService
                        .getBoards()
                        .then((res) => res.data.find((board) => board.slug === slug));

                    memberService
                        .createNewMember({
                            userId: user?.id,
                            objectId: board.id,
                            objectType: 'board',
                            ...(board.type === 'public' ? { active: true } : {}),
                        })
                        .then(() => {
                            if (board.type === 'public') {
                                toast.info('You are allowed to join the board.');
                                delay(() => navigate('/board/' + slug, { replace: true }), 2000);
                            } else {
                                toast.success('You have submitted a request to join! Please wait to join.');
                                delay(() => navigate('/', { replace: true }), 2000);
                            }
                        });
                } else {
                    toast('You need to sign in! Please log in to access.');
                    delay(() => navigate('/home', { replace: true }), 2000);
                }
            })
            .catch(() => {
                navigate('/', { replace: true });
            });
    }, [confirm, navigate, slug, user]);

    return null;
}

export default Invite;
