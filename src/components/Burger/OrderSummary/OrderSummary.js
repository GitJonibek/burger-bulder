import React from 'react'

import ReactAux from '../../../hoc/ReactAux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients)
  .map((key) => {
    return (<li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>)
  });

  return (
    <ReactAux>
      <h3>Your Order</h3>
      <p>A delicious burger with teh following ingredients: </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger'  clicked={props.purchaseCancel}>CANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
    </ReactAux>
  )
};

export default orderSummary;
