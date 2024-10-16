import { useConfirm } from 'material-ui-confirm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { boardService } from '~/services/boardService';
import { memberService } from '~/services/memberService';

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
                        .then((res) => res.data.data.find((board) => board.slug === slug));

                    memberService
                        .createNewMember({ userId: user?.id, objectId: board.id, objectType: 'board' })
                        .then((res) => {
                            if (res?.message) {
                                toast.info('You are allowed to join the board.');
                                return navigate('/board/' + slug);
                            } else {
                                toast.success('You have submitted a request to join! Please wait to join.');
                            }
                        });

                    navigate('/');
                } else {
                    toast('You need to sign in! Please log in to access.');
                    navigate('/home');
                }
            })
            .catch(() => {
                navigate('/home');
            });
    }, [confirm, navigate, slug, user]);

    return null;
}

export default Invite;
