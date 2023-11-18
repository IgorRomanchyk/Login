import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import { useSelector } from "react-redux";
import BasicModal from './Modal';

import './images.css';

interface IImage {
  description: string
  id: number
  title: string
  url: string
  user: number
}

const Images = () => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<IImage | null>(null)
  const [index, setIndex] = useState<number | null>(null)

  const images = useSelector((state: any) => state.images.images)

    return (
      <div className='imagesContainer'>
        {images && images.map((item: IImage) => {
          return (
            <img
              className='image'
              key={item.id} 
              src={item.url} 
              alt={item.title}
              onClick={() => {
                setOpen(true)
                setItem(item)
                setIndex(item.id)
              }}
             />
          )
        })}
        <BasicModal open={open} setOpen={setOpen} item={item} index={index}/>
        <Outlet />
      </div>
    )
  // }
  
}

export default Images