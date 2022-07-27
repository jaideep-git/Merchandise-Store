import React from 'react';
import office from "../../assets/theoffice_600x.png";

const OrderItem = ({item}) => {
  
  return (
    <div className='orderItem'>
      <div className='orderItem_info'>
        <div className='orderItem_img'>
          <img src={office} alt="" />
          <span className='circle'>{item.quantity}</span>
        </div>
        <div className='orderItemName'>
          <h4>{item.name}</h4>
        </div>
      </div>
      <div className='orderItemName' >
        <h4 className='orderItem_price'>${item.price}</h4>
      </div>
    </div>
  )
}

export default OrderItem