import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

// import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators';
// import { boardService } from '~/services/boardService';
// import { updateBoardData } from '~/store/slices/boardSlice';
// import changePathnameURL from '~/utils/changeURL';

function BoardInfo() {
    const dispatch = useDispatch();
    const board = useSelector((state) => state.kanban.activeBoard);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        values: {
            title: board.title,
            description: board.description,
            type: board.type,
        },
    });

    const submitUpdateBoard = (data) => {
        const { title, description, type } = data;
    };

    return (
        <Box sx={{ p: 1 }}>
            <form onSubmit={handleSubmit(submitUpdateBoard)}>
                {/* <FormControl sx={{ marginTop: '1em' }} fullWidth>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Board Title"
                        type="text"
                        variant="outlined"
                        error={!!errors['title']}
                        {...register('title', {
                            required: FIELD_REQUIRED_MESSAGE,
                        })}
                    />
                </FormControl>
                <FormControl sx={{ marginTop: '1em' }} fullWidth>
                    <TextField
                        fullWidth
                        label="Description"
                        type="text"
                        variant="outlined"
                        multiline
                        rows={5}
                        error={!!errors['description']}
                        {...register('description', {
                            required: FIELD_REQUIRED_MESSAGE,
                        })}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: '1em' }} error={!!errors['type']}>
                    <InputLabel id="select-label">Visibility</InputLabel>
                    <Select
                        labelId="select-label"
                        label="Visibility"
                        defaultValue={board.type}
                        {...register('type', {
                            required: FIELD_REQUIRED_MESSAGE,
                        })}
                    >
                        <MenuItem value={'public'}>Public</MenuItem>
                        <MenuItem value={'private'}>Private</MenuItem>
                    </Select>
                </FormControl> */}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ marginTop: '1em' }}
                >
                    Save changes
                </Button>
            </form>
        </Box>
    );
}

export default BoardInfo;
