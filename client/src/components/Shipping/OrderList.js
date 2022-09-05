import React from 'react'
import OrderListItem from './OrderListItem'
import OrderListItemMob from './OrderListItemMob'

const OrderList = ({orders}) => {
  const mobile = window.innerWidth <= 768;

  const renderOrders = orders && orders.map((order) => {
    return mobile ? <OrderListItemMob  key={order._id} order={order}/> : <OrderListItem key={order._id} order={order}/>
  })
  return (
    <>
      {renderOrders.reverse()}
    </>
  )
}

export default OrderList