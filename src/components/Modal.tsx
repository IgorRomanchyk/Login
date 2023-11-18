import { useState } from 'react';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { setComment, removeComment } from '../redux/imagesSlice';
import { useSelector, useDispatch } from "react-redux";
import postComment from '../api/requests/postComment';
import deleteComment from '../api/requests/deleteComment';

import './modal.css';


const style = {
  display: 'flex',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ICommentsArr {
  comment: string
  id: number
  imageId: number
}

interface IProps {
  open: boolean
  setOpen: () => void
  // item: 
  index: number
}

export default function BasicModal({open, setOpen, item, index}: any) {
  const commentsArr = useSelector((state: any) => state.images.comments)
  const user = useSelector((state: any) => state.user.user.name)
  const [value, setValue] = useState('')

  const dispatch = useDispatch()

  return (
    <>
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img 
          className='imageContainer'
            src={item.url} 
            alt={item.title}
            onClick={() => setOpen(true)}
          />
          <div className='commentsContainer'>
            <div className='commentContainer'>
              {commentsArr.map((item: ICommentsArr) => {
                if(item.imageId === index) {
                  return (
                    <div className='commentWrap' key={item.id}>
                      <div>
                        <Typography fontSize={16} component="h1" sx={{fontSize: '10px'}}>
                          {user}
                        </Typography> 
                        <Typography className='comment' fontSize={16} component="h2">
                          {item.comment}
                        </Typography> 
                      </div>
                      <DeleteIcon
                        style={{cursor: 'pointer'}}
                        onClick={() => {
                          deleteComment({ commentId: item.id})
                          dispatch(removeComment({ commentId: item.id }))
                        }}/>
                    </div>
                  )
                }
              })}
            </div>
            <div style={{display: 'flex', marginTop: '10px'}}>
              <TextField 
                className='input' 
                id="standard-basic" 
                variant="standard" 
                value={value} 
                onChange={(e) => setValue(e.target.value)}/>
              <SendIcon 
                onClick={() => {
                  postComment({imageId: item.id, comment: value})
                  dispatch(setComment({ id: new Date().getTime(), comment: value, imageId: item.id,  }))
                  setValue('')
                }} 
                style={{cursor: 'pointer', marginLeft: '10px'}}
              />
            </div>
          </div>
        </Box>

      </Modal>

    </div>

    </>
  );
}