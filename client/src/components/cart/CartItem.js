import React from 'react';

export default function CartItem({item, value}) {
    const { id, title, image, price, total, count } = item;
    const { increment, decrement, removeItem} = value;
    return (
        <div className="row my-4 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img
                    className="img-fluid"
                    style={{width: "5rem", height: "5rem"}}
                    src={image}
                    alt="product"
                />
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">produto:  </span>
                <p className="text-sub-title">{title}</p>
            </div>
            <div className="col-10 mx-auto col-lg-2 text-yellow">
                <h4><span className="d-lg-none">preço: </span>
                    R$ {price}</h4>
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <span className="btn btn-black mx-1" onClick={()=> decrement(id)}>
                    -
                    </span>
                    <span style={{cursor: "default"}} className="btn btn-black mx-1">
                    { count }
                    </span>
                    <span className="btn btn-black mx-1" onClick={()=> increment(id)}>
                    +
                    </span>
                </div>
            </div>
            {/* */}
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={()=> removeItem(id)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <h5>
                    <strong>total item: R$ {total}</strong>
                </h5>
            </div>
        </div>

    );
}